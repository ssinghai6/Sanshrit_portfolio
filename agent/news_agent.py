"""
AI News Agent using LangGraph + Groq (Llama 3)

This agent:
1. Searches for AI/ML news using Serper API
2. Summarizes with Groq's Llama 3 model (free)
3. Creates a GitHub Issue for email-based approval
"""

import os
import json
import datetime
import requests
from typing import TypedDict, List, Optional

# Load .env file for local testing
try:
    from dotenv import load_dotenv
    script_dir = os.path.dirname(os.path.abspath(__file__))
    env_path = os.path.join(script_dir, ".env")
    load_dotenv(env_path)
except ImportError:
    pass  # dotenv not installed, use system env vars

from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

# Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = os.getenv("GITHUB_REPOSITORY", "ssinghai6/personal_website_portfolio")

# AI/ML keywords for filtering relevant news
AI_KEYWORDS = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 
    'gpt', 'gemini', 'claude', 'neural', 'deep learning', 'openai', 
    'anthropic', 'model', 'transformer', 'chatbot', 'nlp', 'computer vision',
    'generative', 'diffusion', 'robotics', 'automation', 'data science'
]

# Trusted tech news domains for AI/ML content
TRUSTED_DOMAINS = [
    'techcrunch.com', 'theverge.com', 'wired.com', 'venturebeat.com',
    'arstechnica.com', 'thenextweb.com', 'zdnet.com', 'engadget.com',
    'towardsdatascience.com', 'medium.com', 'arxiv.org', 'openai.com',
    'anthropic.com', 'deepmind.com', 'ai.meta.com', 'huggingface.co',
    'mit.edu', 'stanford.edu', 'reuters.com', 'bloomberg.com',
    'techxplore.com', 'blog.google', 'therundown.ai', 'artificialintelligence-news.com'
]

# Domains to exclude (sports, entertainment, aggregators)
EXCLUDED_PATTERNS = [
    '/sports/', '/nfl/', '/nba/', '/mlb/', '/entertainment/',
    '/celebrity/', '/gossip/', '/fashion/',
    'msn.com', 'yahoo.com', 'aol.com', 'marketwatch.com'
]


def is_ai_relevant(title: str, snippet: str, link: str) -> bool:
    """Check if a news item is AI/ML relevant based on keywords."""
    text = (title + " " + snippet).lower()
    link_lower = link.lower()
    
    # Check for excluded patterns in URL
    for pattern in EXCLUDED_PATTERNS:
        if pattern in link_lower:
            return False
    
    # Check for AI keywords in title or snippet
    for keyword in AI_KEYWORDS:
        if keyword in text:
            return True
    
    return False


def get_best_link(news_items: list) -> str:
    """Get the most relevant link from news items, preferring trusted domains."""
    # First try to find a link from a trusted domain
    for item in news_items:
        link = item.get('link', '')
        for domain in TRUSTED_DOMAINS:
            if domain in link:
                return link
    
    # Fallback to first item's link if available
    if news_items and news_items[0].get('link'):
        return news_items[0]['link']
    
    # Last resort fallback
    return "https://news.ycombinator.com/news"



# ============================================================================
# State Definition
# ============================================================================

class AgentState(TypedDict):
    """State that flows through the LangGraph workflow."""
    news_items: List[dict]
    generated_post: Optional[dict]
    issue_url: Optional[str]
    error: Optional[str]
    query: Optional[str]


# ============================================================================
# Node Functions
# ============================================================================


from duckduckgo_search import DDGS

def search_news_node(state: AgentState) -> AgentState:
    """
    Node 1: Search for AI/ML news using DuckDuckGo.
    Free and requires no API key.
    """
    print("🔍 Searching for AI/ML news...")
    
    # Use custom query if provided, otherwise use improved default
    custom_query = state.get("query")
    if custom_query:
        base_query = custom_query
    else:
        # Improved query targeting AI/ML content specifically
        base_query = '"artificial intelligence" OR "machine learning" OR "LLM" OR "GPT" news'
    
    try:
        print(f"👉 Querying DuckDuckGo: '{base_query}'")
        
        raw_results = []
        with DDGS() as ddgs:
            # Fetch more results initially to filter down to relevant ones
            ddg_gen = ddgs.news(base_query, max_results=25, timelimit='w')  # 'w' = past week
            
            for item in ddg_gen:
                raw_results.append({
                    "title": item.get("title", ""),
                    "snippet": item.get("body", ""),
                    "link": item.get("url", "")
                })
        
        print(f"📥 Retrieved {len(raw_results)} raw results, filtering for AI/ML relevance...")
        
        # Filter results for AI/ML relevance
        state["news_items"] = []
        for item in raw_results:
            if is_ai_relevant(item["title"], item["snippet"], item["link"]):
                state["news_items"].append(item)
                if len(state["news_items"]) >= 5:  # Keep top 5 relevant results
                    break
        
        print(f"✅ Found {len(state['news_items'])} AI/ML relevant news items")
        
    except Exception as e:
        print(f"❌ Error searching news: {e}")
        state["error"] = str(e)
        state["news_items"] = []
    
    # Fallback to mock data if no results
    if not state["news_items"]:
        print("⚠️  No relevant search results. Using mock data.")
        state["news_items"] = [
            {
                "title": "OpenAI Releases GPT-5 Preview",
                "snippet": "The latest model shows significant improvements in reasoning and multimodal capabilities.",
                "link": "https://openai.com/blog"
            },
            {
                "title": "Meta Open Sources Llama 3.2",
                "snippet": "Llama 3.2 brings multimodal capabilities to open source with vision and text understanding.",
                "link": "https://ai.meta.com/llama/"
            },
            {
                "title": "Google DeepMind's Gemini 2.0 Announced",
                "snippet": "Next generation AI model with improved reasoning and agentic capabilities.",
                "link": "https://deepmind.google/technologies/gemini/"
            }
        ]
    
    return state


def summarize_node(state: AgentState) -> AgentState:
    """
    Node 2: Use Groq (Llama 3) to summarize news into a detailed blog post.
    """
    print("🤖 Generating detailed summary with Groq Llama 3...")
    
    if not state["news_items"]:
        state["error"] = "No news items to summarize"
        return state
    
    if not GROQ_API_KEY:
        print("⚠️  GROQ_API_KEY not found. Using mock summary.")
        first_title = state["news_items"][0].get("title", "AI Developments")
        dynamic_title = f"AI Weekly: {first_title[:30]}... and more"
        
        state["generated_post"] = {
            "title": dynamic_title,
            "summary": "This week's AI digest covers major updates.",
            "content": "## Section 1\n\nContent...\n\n---\n\n## Section 2\n\nContent...",
            "tags": ["AI", "News"],
            "sources": [{"title": "Source", "url": "#"}],
            "link": "#"
        }
        return state

    # Initialize Groq LLM
    llm = ChatGroq(
        api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )
    
    # Format news items for the prompt
    news_text = "\\n".join([
        f"- {item['title']}: {item.get('snippet', '')} ({item.get('link', '')})"
        for item in state["news_items"]
    ])
    
    context_str = "past week"
    if state.get("query"):
        context_str = "specified period"
    
    prompt = f"""You are an expert AI/ML journalist. Here are the top news stories from the {context_str}:

{news_text}

Task: Create a SINGLE comprehensive "Weekly Digest" blog post covering the top 3-5 stories.

CRITICAL FORMATTING RULES:
1. Use DOUBLE NEWLINES (\\n\\n) between ALL sections, paragraphs, and elements.
2. Each story MUST follow this EXACT structure:

## [Story Title]

[Paragraph 1 - 2-3 sentences about the story]

[Paragraph 2 - 2-3 sentences with more detail]

[Paragraph 3 - Technical implications]

### Key Takeaways

- First key point
- Second key point  
- Third key point

### Why It Matters

[1-2 paragraphs explaining significance]

---

3. Start with "## Weekly Overview" section.
4. End with "## Looking Ahead" section.
5. Use `---` horizontal rules between story sections.

OUTPUT FORMAT:
Return a JSON object with these exact keys:
- "title": Engaging headline (no prefixes like "AI Weekly:")
- "summary": 2-3 sentence executive summary
- "content": Full markdown content with PROPER NEWLINES
- "tags": Array of relevant tags
- "sources": Array of {{"title": "...", "url": "..."}} objects
- "link": Primary source URL

Respond ONLY with the JSON object, no markdown code blocks."""

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        content = response.content.strip()
        
        # Parse JSON from response
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        
        content = content.strip()
        import re
        content = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', content)
        
        data = json.loads(content)
        state["generated_post"] = data
        print(f"✅ Generated detailed digest: {state['generated_post']['title']}")

    except Exception as e:
        print(f"❌ Error generating summary: {e}")
        state["error"] = str(e)
        state["generated_post"] = None
    
    return state


def create_issue_node(state: AgentState) -> AgentState:
    """
    Node 3: Create a GitHub Issue for review.
    User can reply 'APPROVE' via email to publish.
    """
    print("📝 Creating GitHub Issue for review...")
    
    if not state.get("generated_post"):
        state["error"] = "No generated post to create issue for"
        return state
    
    if not GITHUB_TOKEN:
        print("⚠️  GITHUB_TOKEN not found. Skipping issue creation.")
        print(f"📄 Generated post preview:\\n{json.dumps(state['generated_post'], indent=2)}")
        return state

    post = state["generated_post"]
    today = datetime.date.today()
    
    issue_title = f"🤖 AI Digest: {post['title']}"
    # Format sources list
    sources_list = "\n".join([f"- [{s.get('title', 'Link')}]({s.get('url', '#')})" for s in post.get('sources', [])])
    
    issue_body = f"""## 📰 AI News Agent - Weekly Digest
    
**Generated on:** {today}

---

# {post['title']}

{post.get('content', 'No content generated.')}

---

### Sources
{sources_list}

---

### 📧 How to Approve

**Reply to this email with `APPROVE` to publish this digest to your blog.**

Or comment `APPROVE` directly on this issue.

---

<details>
<summary>📋 Raw JSON Data</summary>

```json
{json.dumps(post, indent=2)}
```

</details>

---
*This issue was automatically created by the AI News Agent.*
"""

    # Create the issue via GitHub API
    url = f"https://api.github.com/repos/{GITHUB_REPO}/issues"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    data = {
        "title": issue_title,
        "body": issue_body,
        "labels": ["ai-news-pending", "automated"]
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        if response.status_code == 201:
            issue_data = response.json()
            state["issue_url"] = issue_data["html_url"]
            print(f"✅ Issue created: {state['issue_url']}")
        else:
            state["error"] = f"Failed to create issue: {response.status_code} - {response.text}"
            print(f"❌ {state['error']}")
    except Exception as e:
        state["error"] = str(e)
        print(f"❌ Error creating issue: {e}")
    
    return state


# ============================================================================
# Graph Construction
# ============================================================================

def build_graph() -> StateGraph:
    """Build the LangGraph workflow."""
    
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("search", search_news_node)
    workflow.add_node("summarize", summarize_node)
    workflow.add_node("create_issue", create_issue_node)
    
    # Define edges (linear flow)
    workflow.set_entry_point("search")
    workflow.add_edge("search", "summarize")
    workflow.add_edge("summarize", "create_issue")
    workflow.add_edge("create_issue", END)
    
    return workflow.compile()


# ============================================================================
# Main Entry Point
# ============================================================================

def main():
    """Run the AI News Agent."""
    import argparse
    
    parser = argparse.ArgumentParser(description="AI News Agent")
    parser.add_argument("--query", type=str, help="Custom search query (e.g. specific date range). Overrides default 'last week' search.")
    args = parser.parse_args()

    print("=" * 50)
    print("🚀 Starting AI News Agent (LangGraph + Groq)")
    if args.query:
        print(f"🔍 Custom Query: {args.query}")
    print("=" * 50)
    
    # Build and run the graph
    graph = build_graph()
    
    # Initialize state
    initial_state: AgentState = {
        "news_items": [],
        "generated_post": None,
        "issue_url": None,
        "error": None,
        "query": args.query # Add query to initial state
    }
    
    # Execute the workflow
    final_state = graph.invoke(initial_state)
    
    print("\\n" + "=" * 50)
    if final_state.get("error"):
        print(f"❌ Agent completed with error: {final_state['error']}")
    elif final_state.get("issue_url"):
        print(f"✅ Agent completed successfully!")
        print(f"📧 Check your email for the review request.")
        print(f"🔗 Issue URL: {final_state['issue_url']}")
        print(f"📄 Digest Title: {final_state.get('generated_post', {}).get('title', 'N/A')}")
    else:
        print("✅ Agent completed (dry run - no issue created)")
        print(f"📄 Digest: {final_state.get('generated_post', {}).get('title', 'N/A')}")
    print("=" * 50)


if __name__ == "__main__":
    main()

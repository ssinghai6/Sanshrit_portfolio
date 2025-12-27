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
    load_dotenv()
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



# ============================================================================
# State Definition
# ============================================================================

class AgentState(TypedDict):
    """State that flows through the LangGraph workflow."""
    news_items: List[dict]
    generated_post: Optional[dict]
    issue_url: Optional[str]
    error: Optional[str]


# ============================================================================
# Node Functions
# ============================================================================

def search_news_node(state: AgentState) -> AgentState:
    """
    Node 1: Search for AI/ML news using Serper API.
    Falls back to mock data if no API key is provided.
    """
    print("🔍 Searching for AI/ML news...")
    
    query = "AI Machine Learning news last week"
    
    if not SERPER_API_KEY:
        print("⚠️  SERPER_API_KEY not found. Using mock data.")
        state["news_items"] = [
            {
                "title": "OpenAI Releases GPT-5 Preview",
                "snippet": "The latest model shows significant improvements in reasoning.",
                "link": "https://example.com/gpt5"
            },
            {
                "title": "Meta Open Sources New Llama Model",
                "snippet": "Llama 3.2 brings multimodal capabilities to open source.",
                "link": "https://example.com/llama"
            },
            {
                "title": "Google DeepMind's AlphaFold 3 Released",
                "snippet": "New version predicts protein structures with unprecedented accuracy.",
                "link": "https://example.com/alphafold"
            }
        ]
        return state

    url = "https://google.serper.dev/search"
    payload = json.dumps({"q": query, "tbs": "qdr:w"})  # qdr:w = past week
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, headers=headers, data=payload, timeout=10)
        results = response.json()
        state["news_items"] = results.get("organic", [])[:5]
        print(f"✅ Found {len(state['news_items'])} news items")
    except Exception as e:
        print(f"❌ Error searching news: {e}")
        state["error"] = str(e)
        state["news_items"] = []
    
    # Fallback to mock data if no results
    if not state["news_items"]:
        print("⚠️  No search results. Using mock data.")
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
        state["generated_post"] = {
            "title": f"Weekly AI Round-up - {datetime.date.today()}",
            "summary": "This week saw major developments in AI with new model releases and research breakthroughs.",
            "content": "Key developments this week:\n\n• **Major Model Releases**: Several new AI models were announced.\n\n• **Research Breakthroughs**: New papers pushed the boundaries of what's possible.\n\n• **Industry Updates**: Major tech companies continue to invest heavily in AI.",
            "tags": ["AI", "LLMs", "Research"],
            "sources": [
                {"title": state["news_items"][0].get("title", "Source 1"), "url": state["news_items"][0].get("link", "#")}
            ],
            "link": state["news_items"][0].get("link", "#")
        }
        return state

    # Initialize Groq LLM
    llm = ChatGroq(
        api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )
    
    # Format news items for the prompt
    news_text = "\n".join([
        f"- {item['title']}: {item.get('snippet', '')} ({item.get('link', '')})"
        for item in state["news_items"]
    ])
    
    prompt = f"""You are an expert AI/ML journalist writing for a technical audience. Here are the top news stories from the past week:

{news_text}

Write a comprehensive, well-structured blog post about this week's AI news.

FORMAT YOUR CONTENT using this structure:
- Use "## Section Title" for main sections (Overview, Key Developments, Why This Matters, Looking Ahead)
- Use "### Sub-heading" for sub-sections within Key Developments
- Use "• **Bold Label**: Description" for bullet points
- Use numbered lists (1. 2. 3.) for sequential steps or rankings
- Use **bold** to emphasize key terms

REQUIRED SECTIONS in the content field:
1. ## Overview - 2-3 sentences introducing the topic
2. ## Key Developments - Multiple ### sub-sections covering each major story
3. ## Why This Matters - Implications and impact analysis
4. ## Looking Ahead - Future predictions and what to watch

Format your response as a JSON object with these keys:
- title: A catchy, specific title (not generic like "This Week in AI")
- summary: A 2-3 sentence executive summary of the key highlights
- content: The full article content using the markdown structure above. Separate sections with double newlines.
- tags: A list of 2-3 relevant tags (e.g., ["GenAI", "Robotics"])
- sources: An array of objects with "title" and "url" for each news source
- link: The link to the most important story

Make the content insightful, educational, and professionally written.

Respond ONLY with the JSON object, no other text."""

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        content = response.content.strip()
        
        # Parse JSON from response
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        
        # Clean up control characters that break JSON parsing
        content = content.strip()
        # Replace problematic characters
        import re
        content = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', content)
        
        state["generated_post"] = json.loads(content)
        print(f"✅ Generated detailed post: {state['generated_post']['title']}")
    except json.JSONDecodeError as e:
        print(f"⚠️  JSON parsing error, using simplified parsing...")
        # Try to extract fields manually
        try:
            # Extract what we can from the response
            response_text = response.content if 'response' in dir() else ""
            state["generated_post"] = {
                "title": f"AI Weekly Update - {datetime.date.today()}",
                "summary": "This week brought exciting developments in AI and machine learning.",
                "content": "## Overview\n\nSeveral major AI developments occurred this week.\n\n## Key Developments\n\n• **Model Releases**: New AI models were announced.\n• **Research**: Important research papers were published.\n• **Industry**: Major tech companies continued AI investments.",
                "tags": ["AI", "LLMs"],
                "sources": [{"title": s["title"], "url": s["link"]} for s in state.get("news_items", [])[:2]],
                "link": state.get("news_items", [{}])[0].get("link", "#")
            }
            print(f"✅ Created fallback post: {state['generated_post']['title']}")
        except:
            state["error"] = str(e)
            state["generated_post"] = None
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
    
    if not state["generated_post"]:
        state["error"] = "No generated post to create issue for"
        return state
    
    if not GITHUB_TOKEN:
        print("⚠️  GITHUB_TOKEN not found. Skipping issue creation.")
        print(f"📄 Generated post preview:\n{json.dumps(state['generated_post'], indent=2)}")
        return state

    post = state["generated_post"]
    today = datetime.date.today()
    
    issue_title = f"🤖 Weekly AI News: {post['title']}"
    issue_body = f"""## 📰 AI News Agent - Weekly Update

**Generated on:** {today}

---

### Preview

**Title:** {post['title']}

**Summary:** {post['summary']}

**Tags:** {', '.join(post.get('tags', []))}

**Source:** {post.get('link', 'N/A')}

---

### 📧 How to Approve

**Reply to this email with `APPROVE` to publish this post to your blog.**

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
    print("=" * 50)
    print("🚀 Starting AI News Agent (LangGraph + Groq)")
    print("=" * 50)
    
    # Build and run the graph
    graph = build_graph()
    
    # Initialize state
    initial_state: AgentState = {
        "news_items": [],
        "generated_post": None,
        "issue_url": None,
        "error": None
    }
    
    # Execute the workflow
    final_state = graph.invoke(initial_state)
    
    print("\n" + "=" * 50)
    if final_state.get("error"):
        print(f"❌ Agent completed with error: {final_state['error']}")
    elif final_state.get("issue_url"):
        print(f"✅ Agent completed successfully!")
        print(f"📧 Check your email for the review request.")
        print(f"🔗 Issue URL: {final_state['issue_url']}")
    else:
        print("✅ Agent completed (dry run - no issue created)")
        print(f"📄 Generated: {final_state.get('generated_post', {}).get('title', 'N/A')}")
    print("=" * 50)


if __name__ == "__main__":
    main()

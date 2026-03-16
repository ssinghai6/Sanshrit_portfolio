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

# ============================================================================
# SOURCE QUALITY RANKING SYSTEM
# ============================================================================
# Priority tiers for AI/ML news sources (lower number = higher priority)
# Tier 1: Primary AI Company Blogs (highest authority - direct from source)
# Tier 2: Top-Tier Tech News (established tech journalism)
# Tier 3: AI-Specific Reputable Outlets (focused on AI/tech)
# Tier 4: Major Business/Financial News (reputable general news)
# Tier 5: Academic/Research (technical depth but may be dense)
# EXCLUDED: Aggregators, regional news, low-authority sites

SOURCE_QUALITY_TIERS = {
    # TIER 1: Primary AI Company Blogs (Priority: 10)
    # These are the most authoritative - direct from the companies building AI
    "openai.com": {"tier": 1, "priority": 100, "name": "OpenAI Blog", "category": "company"},
    "anthropic.com": {"tier": 1, "priority": 99, "name": "Anthropic", "category": "company"},
    "blog.google": {"tier": 1, "priority": 98, "name": "Google AI Blog", "category": "company"},
    "blog.google.dev": {"tier": 1, "priority": 98, "name": "Google AI Blog", "category": "company"},
    "deepmind.com": {"tier": 1, "priority": 97, "name": "DeepMind Blog", "category": "company"},
    "ai.meta.com": {"tier": 1, "priority": 96, "name": "Meta AI Blog", "category": "company"},
    "research.google": {"tier": 1, "priority": 95, "name": "Google Research", "category": "company"},
    "developer.microsoft.com": {"tier": 1, "priority": 94, "name": "Microsoft Developer Blog", "category": "company"},
    "aws.amazon.com": {"tier": 1, "priority": 93, "name": "AWS AI Blog", "category": "company"},
    "huggingface.co": {"tier": 1, "priority": 92, "name": "Hugging Face", "category": "company"},
    "bard.google.com": {"tier": 1, "priority": 91, "name": "Google Bard/Gemini", "category": "company"},
    "mistral.ai": {"tier": 1, "priority": 90, "name": "Mistral AI", "category": "company"},
    "x.com/ai": {"tier": 1, "priority": 89, "name": "xAI", "category": "company"},
    "cohere.com": {"tier": 1, "priority": 88, "name": "Cohere", "category": "company"},
    "inflection.ai": {"tier": 1, "priority": 87, "name": "Inflection", "category": "company"},
    
    # TIER 1.5: Popular AI Newsletters (Priority: 15)
    # Trending newsletter sources
    "sequoiacap.com": {"tier": 1, "priority": 85, "name": "Sequoia Blog", "category": "newsletter"},
    "a16z.com": {"tier": 1, "priority": 84, "name": "a16z AI", "category": "newsletter"},
    "nytimes.com/ai": {"tier": 1, "priority": 83, "name": "NYT AI", "category": "newsletter"},
    "wsj.com/ai": {"tier": 1, "priority": 82, "name": "WSJ AI", "category": "newsletter"},
    
    # TIER 2: Top-Tier Tech News (Priority: 20)
    # Established technology journalism with high editorial standards
    "techcrunch.com": {"tier": 2, "priority": 80, "name": "TechCrunch", "category": "tech_news"},
    "theverge.com": {"tier": 2, "priority": 79, "name": "The Verge", "category": "tech_news"},
    "wired.com": {"tier": 2, "priority": 78, "name": "Wired", "category": "tech_news"},
    "arstechnica.com": {"tier": 2, "priority": 77, "name": "Ars Technica", "category": "tech_news"},
    "engadget.com": {"tier": 2, "priority": 76, "name": "Engadget", "category": "tech_news"},
    
    # TIER 3: AI-Specific Reputable Outlets (Priority: 30)
    # Publications focused specifically on AI/tech
    "venturebeat.com": {"tier": 3, "priority": 70, "name": "VentureBeat", "category": "ai_specific"},
    "venturebeat.com/ai": {"tier": 3, "priority": 70, "name": "VentureBeat AI", "category": "ai_specific"},
    "aitimews.com": {"tier": 3, "priority": 69, "name": "AI News", "category": "ai_specific"},
    "artificialintelligence-news.com": {"tier": 3, "priority": 68, "name": "AI News", "category": "ai_specific"},
    "marktechpost.com": {"tier": 3, "priority": 67, "name": "MarkTechpost", "category": "ai_specific"},
    "unite.ai": {"tier": 3, "priority": 66, "name": "Unite.AI", "category": "ai_specific"},
    "syncedreview.com": {"tier": 3, "priority": 65, "name": "Synced Review", "category": "ai_specific"},
    "therundown.ai": {"tier": 3, "priority": 64, "name": "The Rundown AI", "category": "ai_specific"},
    
    # TIER 4: Major Business/Financial News (Priority: 40)
    # Reputable business journalism with tech coverage
    "reuters.com": {"tier": 4, "priority": 60, "name": "Reuters", "category": "business"},
    "bloomberg.com": {"tier": 4, "priority": 59, "name": "Bloomberg", "category": "business"},
    "ft.com": {"tier": 4, "priority": 58, "name": "Financial Times", "category": "business"},
    "wsj.com": {"tier": 4, "priority": 57, "name": "Wall Street Journal", "category": "business"},
    "economist.com": {"tier": 4, "priority": 56, "name": "The Economist", "category": "business"},
    
    # TIER 5: Major Tech Portals & Science (Priority: 50)
    # Well-established tech and science publications
    "zdnet.com": {"tier": 5, "priority": 50, "name": "ZDNet", "category": "tech"},
    "cnet.com": {"tier": 5, "priority": 49, "name": "CNET", "category": "tech"},
    "techradar.com": {"tier": 5, "priority": 48, "name": "TechRadar", "category": "tech"},
    "theinformation.com": {"tier": 5, "priority": 47, "name": "The Information", "category": "tech"},
    "protocol.com": {"tier": 5, "priority": 46, "name": "Protocol", "category": "tech"},
    "semafor.com": {"tier": 5, "priority": 45, "name": "Semafor", "category": "tech"},
    "restofworld.org": {"tier": 5, "priority": 44, "name": "Rest of World", "category": "tech"},
    
    # TIER 6: Academic/Research (Priority: 60)
    # Technical depth but more academic
    "nature.com": {"tier": 6, "priority": 40, "name": "Nature", "category": "academic"},
    "science.org": {"tier": 6, "priority": 39, "name": "Science", "category": "academic"},
    "cacm.acm.org": {"tier": 6, "priority": 38, "name": "Communications of the ACM", "category": "academic"},
    "arxiv.org": {"tier": 6, "priority": 37, "name": "ArXiv Preprints", "category": "academic"},
    "mit.edu": {"tier": 6, "priority": 36, "name": "MIT", "category": "academic"},
    "stanford.edu": {"tier": 6, "priority": 35, "name": "Stanford", "category": "academic"},
    "harvard.edu": {"tier": 6, "priority": 34, "name": "Harvard", "category": "academic"},
    "berkeley.edu": {"tier": 6, "priority": 33, "name": "UC Berkeley", "category": "academic"},
    "phys.org": {"tier": 6, "priority": 32, "name": "Phys.org", "category": "science"},
    "techxplore.com": {"tier": 6, "priority": 31, "name": "TechXplore", "category": "science"},
}

# Domains to EXCLUDE completely (aggregators, regional, low-authority)
EXCLUDED_DOMAINS = [
    # Aggregators and content scrapers
    "msn.com", "yahoo.com", "aol.com", "outlook.com",
    "bing.com", "google.com/search", "duckduckgo.com",
    
    # Regional/Local news (not tech-focused)
    "local", "daily", "chronicle", "herald", "tribune",
    "scoop.co.nz",  # New Zealand aggregator
    "indianexpress.com",  # Regional Indian
    "hindustantimes.com",  # Regional Indian
    "timesofindia.com",  # Regional Indian
    
    # Low-quality/Clickbait
    "dailymail.co.uk",
    "mirror.co.uk", 
    "express.co.uk",
    "thesun.co.uk",
    "newyorkpost.com",
    "dailystar.co.uk",
    
    # Business/marketing sites with low editorial standards
    "businessinsider.com",  # Often opinion pieces
    "investopedia.com",  # Educational, not news
    "fool.com",  # Motley Fool - opinion/analysis
    "crunchbase.com",  # Business database, not news
    "livelaw.in",  # Regional law
    "kfvs12.com",  # Local US news
    "manilatimes.net",  # Regional
    "irishtimes.com",  # Regional Irish
    
    # Content mills/Affiliate sites
    "makeuseof.com",
    "lifewire.com",
    "howtogeek.com",
    "techjunkie.com",
    "tomsguide.com",
    "digitaltrends.com",  # Often reviews/affiliate
    
    # AI-specific but low quality
    "aitrends.com",
    "aiformankind.com",
    "aiportal.com",
    "ainews.io",
    "aibusiness.com",
    "aizone.com",
]

# Sports/entertainment exclusions
EXCLUDED_PATTERNS = [
    '/sports/', '/nfl/', '/nba/', '/mlb/', '/entertainment/',
    '/celebrity/', '/gossip/', '/fashion/', '/politics/',
    '/opinion/', '/analysis/', '/press-release/',
]


def get_source_quality_score(url: str) -> tuple[int, str, str]:
    """
    Get the quality score for a URL.
    Returns: (priority_score, tier_name, source_name)
    Lower score = better quality (priority 1 = best)
    """
    if not url:
        return (999, "Unknown", "Unknown")
    
    url_lower = url.lower()
    
    # Check exclusions first
    for excluded in EXCLUDED_DOMAINS:
        if excluded in url_lower:
            return (999, "Excluded", "Excluded - Low Quality")
    
    for pattern in EXCLUDED_PATTERNS:
        if pattern in url_lower:
            return (999, "Excluded", "Excluded - Pattern Match")
    
    # Find best matching source
    best_match = (999, "Unknown", "Unknown")
    
    for domain, info in SOURCE_QUALITY_TIERS.items():
        if domain in url_lower:
            # Calculate effective priority (lower is better)
            # tier * 100 + offset within tier
            effective_priority = (info["tier"] * 100) - info["priority"]
            if effective_priority < best_match[0]:
                best_match = (effective_priority, f"Tier {info['tier']}", info["name"])
    
    return best_match


def rank_news_items_by_source_quality(news_items: list) -> list:
    """
    Sort news items by source quality, prioritizing authoritative sources.
    """
    scored_items = []
    
    for item in news_items:
        url = item.get("link", "")
        priority, tier, source_name = get_source_quality_score(url)
        
        scored_items.append({
            **item,
            "_source_priority": priority,
            "_source_tier": tier,
            "_source_name": source_name,
            "_source_domain": extract_domain(url)
        })
    
    # Sort by priority (lower = better)
    scored_items.sort(key=lambda x: x.get("_source_priority", 999))
    
    return scored_items


def extract_domain(url: str) -> str:
    """Extract domain from URL for deduplication."""
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        return parsed.netloc.lower().replace("www.", "")
    except:
        return ""


def ensure_source_diversity(news_items: list, max_per_source: int = 1) -> list:
    """
    Ensure we have diverse sources - max 1 article per domain.
    Returns list with diversity, prioritizing quality within each source.
    """
    if not news_items:
        return news_items
    
    seen_domains = {}
    diverse_items = []
    
    for item in news_items:
        domain = item.get("_source_domain", extract_domain(item.get("link", "")))
        
        # Skip if we've already seen this domain (unless we allow multiple)
        if domain in seen_domains:
            if seen_domains[domain] >= max_per_source:
                continue
            seen_domains[domain] += 1
        else:
            seen_domains[domain] = 1
        
        diverse_items.append(item)
        
        # Stop once we have enough diverse items
        if len(diverse_items) >= 5:
            break
    
    return diverse_items


def get_best_source(news_items: list, preferred_tiers: list = None) -> dict:
    """
    Get the best source from news items.
    If preferred_tiers is specified (e.g., [1, 2]), only consider those tiers.
    Otherwise, return the highest quality source available.
    """
    if not news_items:
        return None
    
    # Score all items
    scored_items = rank_news_items_by_source_quality(news_items)
    
    # Filter by preferred tiers if specified
    if preferred_tiers:
        for item in scored_items:
            tier_num = int(item.get("_source_tier", "Tier 999").replace("Tier ", ""))
            if tier_num in preferred_tiers:
                return item
        # If no preferred tier found, fall back to best available
        return scored_items[0] if scored_items else None
    
    # Return best available
    return scored_items[0] if scored_items else None


def validate_sources(sources: list) -> list:
    """
    Validate and rank a list of sources, removing excluded ones.
    Returns sorted list of valid sources with quality metadata.
    """
    validated = []
    
    for source in sources:
        url = source.get("url", "")
        title = source.get("title", "")
        
        priority, tier, source_name = get_source_quality_score(url)
        
        # Skip completely excluded sources
        if priority >= 999:
            print(f"⚠️  Excluding low-quality source: {title} ({url})")
            continue
        
        validated.append({
            **source,
            "_quality_priority": priority,
            "_quality_tier": tier,
            "_quality_source_name": source_name,
            "_is_primary_source": tier in ["Tier 1", "Tier 2"]
        })
    
    # Sort by quality (best first)
    validated.sort(key=lambda x: x.get("_quality_priority", 999))
    
    return validated


def format_newsletter_content(content: str) -> str:
    """Post-process newsletter content to fix formatting issues."""
    if not content:
        return content
    
    # First, fix headings that have content on the same line (e.g., "## Heading  Some content")
    # Split on "## " to find headings followed by content
    import re
    
    # Pattern: "## " followed by heading text, then 2+ spaces, then content
    content = re.sub(r'(## [^\n]+?)( {2,})', r'\1\n\n', content)
    
    lines = content.split('\n')
    formatted_lines = []
    
    for line in lines:
        stripped = line.strip()
        
        # Fix: Remove leading spaces from headings (e.g., " ## Heading" -> "## Heading")
        if stripped.startswith('## '):
            line = '## ' + stripped[3:]
            # Add blank line before heading if previous line isn't empty
            if formatted_lines and formatted_lines[-1].strip() != '':
                formatted_lines.append('')
            formatted_lines.append(line)
        # Add blank line after bold labels
        elif stripped == '**Key Takeaways:**' or stripped == '**Why It Matters:**':
            formatted_lines.append(stripped)
            formatted_lines.append('')
        # Fix run-on bullet points - when bullet points are on same line after **Key Takeaways:**
        elif '**Key Takeaways:**' in line and ' - ' in line:
            parts = line.split(' - ')
            if len(parts) > 1:
                formatted_lines.append(parts[0].strip())
                formatted_lines.append('')
                for part in parts[1:]:
                    if part.strip():
                        formatted_lines.append('- ' + part.strip())
            else:
                formatted_lines.append(line)
        # Fix run-on bullet points in "Why It Matters:" section too
        elif '**Why It Matters:**' in line and ' - ' in line:
            parts = line.split(' - ')
            if len(parts) > 1:
                formatted_lines.append(parts[0].strip())
                formatted_lines.append('')
                for part in parts[1:]:
                    if part.strip():
                        formatted_lines.append('- ' + part.strip())
            else:
                formatted_lines.append(line)
        else:
            formatted_lines.append(line)
    
    return '\n'.join(formatted_lines)


def validate_and_enhance_sources(generated_post: dict, news_items: list) -> dict:
    """
    Validate and enhance sources in the generated post.
    If the LLM chose low-quality sources, replace with better ones from news_items.
    """
    if not generated_post:
        return generated_post
    
    sources = generated_post.get("sources", [])
    if not sources:
        return generated_post
    
    # Validate each source
    validated_sources = validate_sources(sources)
    
    # If we have better sources from news_items, potentially replace
    news_item_urls = {item.get("link", ""): item for item in news_items if item.get("link")}
    
    enhanced_sources = []
    for source in sources:
        url = source.get("url", "")
        
        # Check if this source is in our validated list
        for vs in validated_sources:
            if vs.get("url") == url:
                enhanced_sources.append(vs)
                break
        else:
            # Source not validated well - try to find a better one
            # Check if we have a better version in news_items
            if url in news_item_urls:
                item = news_item_urls[url]
                priority, tier, source_name = get_source_quality_score(url)
                if priority < 999:
                    enhanced_sources.append({
                        "title": source.get("title", item.get("title", "")),
                        "url": url,
                        "_quality_priority": priority,
                        "_quality_tier": tier,
                        "_quality_source_name": source_name
                    })
                else:
                    # This is a bad source, skip it
                    print(f"⚠️  Skipping low-quality source: {source.get('title', url)}")
                    continue
            else:
                # Not in news items, use as-is but add quality metadata
                priority, tier, source_name = get_source_quality_score(url)
                enhanced_sources.append({
                    **source,
                    "_quality_priority": priority,
                    "_quality_tier": tier,
                    "_quality_source_name": source_name
                })
    
    # Also add high-quality sources from news_items that might be missing
    if len(enhanced_sources) < 5:
        for item in news_items[:5]:
            url = item.get("link", "")
            # Check if we already have this URL
            if any(s.get("url") == url for s in enhanced_sources):
                continue
            
            priority, tier, source_name = get_source_quality_score(url)
            if priority < 500:  # Good quality
                enhanced_sources.append({
                    "title": item.get("title", ""),
                    "url": url,
                    "_quality_priority": priority,
                    "_quality_tier": tier,
                    "_quality_source_name": source_name
                })
                
                if len(enhanced_sources) >= 5:
                    break
    
    # Sort by quality
    enhanced_sources.sort(key=lambda x: x.get("_quality_priority", 999))
    
    # Clean up internal metadata before returning
    final_sources = []
    for s in enhanced_sources:
        clean = {k: v for k, v in s.items() if not k.startswith("_")}
        final_sources.append(clean)
    
    # Update the post
    generated_post["sources"] = final_sources
    
    # Also update the primary link if it's not high quality
    current_link = generated_post.get("link", "")
    if current_link:
        link_priority, _, _ = get_source_quality_score(current_link)
        if link_priority >= 500 and final_sources:
            # Primary link is low quality, use best source link instead
            generated_post["link"] = final_sources[0].get("url", current_link)
            print(f"🔄 Updated primary link to higher quality source")
    
    return generated_post


# Legacy compatibility - updated trusted domains list
TRUSTED_DOMAINS = list(SOURCE_QUALITY_TIERS.keys())


def is_ai_relevant(title: str, snippet: str, link: str) -> bool:
    """Check if a news item is AI/ML relevant based on keywords and source quality."""
    text = (title + " " + snippet).lower()
    link_lower = link.lower()
    
    # Check for excluded patterns in URL
    for pattern in EXCLUDED_PATTERNS:
        if pattern in link_lower:
            return False
    
    # Check if source is in excluded domains list (low quality)
    for excluded in EXCLUDED_DOMAINS:
        if excluded in link_lower:
            return False
    
    # Check for AI keywords in title or snippet
    for keyword in AI_KEYWORDS:
        if keyword in text:
            return True
    
    return False


def get_best_link(news_items: list, preferred_tiers: list = None) -> str:
    """
    Get the most relevant link from news items using source quality ranking.
    
    Args:
        news_items: List of news item dictionaries
        preferred_tiers: Optional list of preferred tiers (e.g., [1, 2] for company blogs and top tech news)
    
    Returns:
        URL string of the best quality source
    """
    if not news_items:
        return "https://news.ycombinator.com/news"
    
    # Use the new quality-based selection
    best_item = get_best_source(news_items, preferred_tiers)
    
    if best_item:
        link = best_item.get("link", "")
        if link:
            tier = best_item.get("_source_tier", "Unknown")
            source = best_item.get("_source_name", "Unknown")
            print(f"📌 Best source selected: {source} ({tier}) - {link[:50]}...")
            return link
    
    # Fallback: try to find any trusted domain
    for item in news_items:
        link = item.get('link', '')
        for domain in TRUSTED_DOMAINS:
            if domain in link.lower():
                return link
    
    # Last resort fallback
    if news_items and news_items[0].get('link'):
        return news_items[0]['link']
    
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


from ddgs import DDGS

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
        # Simplified query - DuckDuckGo handles these better
        base_query = 'artificial intelligence OR LLM OR GPT OR AI news this week'
    
    try:
        print(f"👉 Querying DuckDuckGo: '{base_query}'")
        
        raw_results = []
        try:
            with DDGS() as ddgs:
                # Fetch more results initially to filter down to relevant ones
                ddg_gen = ddgs.news(base_query, max_results=30, timelimit='w')  # 'w' = past week
                
                for item in ddg_gen:
                    raw_results.append({
                        "title": item.get("title", ""),
                        "snippet": item.get("body", ""),
                        "link": item.get("url", "")
                    })
        except Exception as e:
            print(f"⚠️ DuckDuckGo news search failed: {e}")
            print("🔄 Trying text search as fallback...")
            try:
                with DDGS() as ddgs:
                    ddg_gen = ddgs.text(base_query, max_results=30)
                    for item in ddg_gen:
                        raw_results.append({
                            "title": item.get("title", ""),
                            "snippet": item.get("body", ""),
                            "link": item.get("href", "")
                        })
            except Exception as e2:
                print(f"⚠️ DuckDuckGo text search also failed: {e2}")
                # Fall back to empty results - will show error message
                raw_results = []
        
        print(f"📥 Retrieved {len(raw_results)} raw results, filtering for AI/ML relevance...")
        
        # Filter results for AI/ML relevance
        state["news_items"] = []
        for item in raw_results:
            if is_ai_relevant(item["title"], item["snippet"], item["link"]):
                state["news_items"].append(item)
                if len(state["news_items"]) >= 10:  # Keep top 10 to allow for quality ranking
                    break
        
        # Sort by source quality (best sources first)
        if state["news_items"]:
            print(f"📊 Ranking {len(state['news_items'])} items by source quality...")
            state["news_items"] = rank_news_items_by_source_quality(state["news_items"])
            
            # Show top 5 with their quality scores
            print("🏆 Top sources by quality:")
            for i, item in enumerate(state["news_items"][:5]):
                tier = item.get("_source_tier", "Unknown")
                source = item.get("_source_name", "Unknown")
                print(f"   {i+1}. [{tier}] {source}: {item.get('title', '')[:50]}...")
            
            # Ensure source diversity - max 1 article per domain
            print("🔄 Ensuring source diversity (one article per source)...")
            state["news_items"] = ensure_source_diversity(state["news_items"], max_per_source=1)
            
            # Keep top 5 diverse items for the blog post
            state["news_items"] = state["news_items"][:5]
            
            # Show final selected items with their sources
            print("📰 Final selected articles (diverse sources):")
            for i, item in enumerate(state["news_items"]):
                domain = item.get("_source_domain", "Unknown")
                print(f"   {i+1}. [{domain}] {item.get('title', '')[:50]}...")
        
        print(f"✅ Found {len(state['news_items'])} AI/ML relevant news items (quality-ranked)")
        
    except Exception as e:
        print(f"❌ Error searching news: {e}")
        state["error"] = str(e)
        state["news_items"] = []
    
    # Fail clearly if no results — do NOT fall back to mock data
    if not state["news_items"]:
        error_msg = "No AI/ML relevant news found. DuckDuckGo may be rate-limiting. Try again in a few minutes."
        print(f"❌ {error_msg}")
        state["error"] = error_msg
    
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
        if os.getenv("GITHUB_ACTIONS") == "true":
            error_msg = "GROQ_API_KEY not found in GitHub Actions environment. Please check repository secrets."
            print(f"❌ {error_msg}")
            state["error"] = error_msg
            state["generated_post"] = None
            return state
            
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
    
    # Format news items for the prompt - include source quality info
    news_text = "\\n".join([
        f"- [{item.get('_source_tier', 'Unknown')} - {item.get('_source_name', 'Unknown')}] {item['title']}: {item.get('snippet', '')} ({item.get('link', '')})"
        for item in state["news_items"]
    ])
    
    context_str = "past week"
    if state.get("query"):
        context_str = "specified period"
    
    # Source quality guidance for the LLM
    source_guidance = """
SOURCE QUALITY PRIORITIES (use these for your sources list - must be from PREVIOUS WEEK):
✅ BEST SOURCES (Primary): OpenAI Blog, Anthropic, Google DeepMind, Meta AI, Microsoft Research, Hugging Face
✅ GOOD SOURCES (Tech News): TechCrunch, The Verge, Wired, Ars Technica, Engadget
✅ ACCEPTABLE (AI-Specific): VentureBeat AI, MarkTechpost, Unite.AI, The Rundown AI
⚠️  USE SPARINGLY (Business): Reuters, Bloomberg, Financial Times, Wall Street Journal
⚠️  USE SPARINGLY (Academic): Nature, Science, arXiv preprints

AVOID using: Regional news (local newspapers), aggregators (Yahoo, MSN), opinion/analysis sites, business opinion sites (Motley Fool, Business Insider), old articles (older than 2 weeks), or low-authority sites.

CRITICAL: ONLY include AI-related stories from the PREVIOUS WEEK. Do NOT include economic/political news unless directly related to AI.
"""
    
    prompt = f"""You are an expert AI/ML journalist. Here are the top news stories from the {context_str}, ranked by source quality and diversity:

{news_text}

{source_guidance}

Task: Create a SINGLE comprehensive "Weekly Digest" blog post covering EXACTLY 4 to 5 stories about ARTIFICIAL INTELLIGENCE. You MUST cover at least 4 distinct AI-focused stories.

CRITICAL CONTENT RULES:
1. ONLY write about AI/ML topics - exclude economic/political news unless directly tied to AI
2. Each story MUST have specific details: numbers, dates, product names, company names
3. Avoid generic phrases like "significant developments", "notable achievements" - be specific
4. Write like a professional journalist, not a template

CRITICAL SOURCE REQUIREMENT:
- You MUST include AT LEAST 4-5 DIFFERENT sources in the "sources" array - one for EACH story
- Each story should cite a different source URL from the ones provided above
- DO NOT use the same source for multiple stories
- The "sources" array MUST have at least 4 items with unique URLs

Task: Create a SINGLE comprehensive "Weekly Digest" blog post covering EXACTLY 4 to 5 AI stories.

CRITICAL FORMATTING RULES:
1. Use DOUBLE NEWLINES (\\n\\n) between ALL sections, paragraphs, and elements.
2. Start with "## Weekly Overview" — a 2-paragraph summary of the week's themes.
3. Each of the 4-5 stories MUST follow this EXACT structure:

## [Story Headline]

[Paragraph 1 — 3-4 sentences introducing the story and its significance]

[Paragraph 2 — 3-4 sentences with deeper detail, specifics, or technical context]

**Key Takeaways:**

- [Concrete takeaway 1 - with specific details]
- [Concrete takeaway 2 - with specific details]
- [Concrete takeaway 3 - with specific details]

**Why It Matters:** [1-2 paragraphs explaining broader significance and future implications]

4. End with "## Looking Ahead" — a 1-2 paragraph section on future trends.
5. Use NO horizontal rules (---) between sections. Use only ## headings to separate stories.
6. Do NOT use ### sub-headings. Use **Bold Text:** for Key Takeaways and Why It Matters labels.
7. Add a blank line BEFORE each ## heading and after each list.

OUTPUT FORMAT:
Return a JSON object with these exact keys:
- "title": Engaging, descriptive headline that names the key topics
- "summary": 3-4 sentence executive summary mentioning all covered stories
- "content": Full markdown content with PROPER NEWLINES - each section clearly separated
- "tags": Array of 3-5 relevant tags (MUST all be AI-related)
- "sources": Array of {{"title": "...", "url": "..."}} objects - MUST have at least 4 different sources from reputable AI sources
- "link": Primary source URL - MUST be from a high-quality source (prefer Tier 1-2: OpenAI, Anthropic, Google, Meta, TechCrunch, The Verge, Wired, Ars Technica)

IMPORTANT: 
1. The "sources" array MUST contain at least 4 unique URLs - one for each story
2. Do NOT repeat the same source URL multiple times
3. EVERY source must be from the PREVIOUS WEEK (current date is March 2026)
4. ALL stories must be about AI/ML - no economics, politics, or non-AI topics

Respond ONLY with the JSON object, no markdown code blocks."""

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        content = response.content.strip()
        
        # Log raw content for debugging
        print(f"📝 Raw LLM Response:\n{content}\n" + "-"*30)
        
        # Parse JSON from response
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        
        content = content.strip()
        import re
        content = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', content)
        # Fix common JSON errors from LLMs
        content = content.replace("\\'", "'")  # Replace \' with ' (invalid in JSON)
        
        try:
            data = json.loads(content)
        except json.JSONDecodeError as je:
            print(f"❌ JSON Decode Error: {je}")
            state["error"] = f"Failed to parse JSON: {je}. Raw content: {content[:100]}..."
            state["generated_post"] = None
            return state

        # Validate required fields
        required_fields = ["title", "summary", "content"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            error_msg = f"Generated JSON missing required fields or has null values: {missing_fields}"
            print(f"❌ {error_msg}")
            state["error"] = error_msg
            state["generated_post"] = None
            return state
        
        # Validate and enhance sources with quality metadata
        data = validate_and_enhance_sources(data, state["news_items"])
        
        # Post-process content formatting
        if data.get("content"):
            try:
                data["content"] = format_newsletter_content(data["content"])
            except Exception as fmt_err:
                print(f"⚠️  Content formatting warning: {fmt_err}")
        
        state["generated_post"] = data
        print(f"✅ Generated detailed digest: {state['generated_post']['title']}")
        
        # Log source quality summary
        sources = data.get('sources', [])
        if sources:
            print(f"📚 Source Quality Summary:")
            for i, s in enumerate(sources[:5]):
                tier = s.get('_quality_tier', 'Unknown')
                print(f"   {i+1}. [{tier}] {s.get('title', 'Unknown')[:40]}...")

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
        import sys
        print(f"❌ Agent completed with error: {final_state['error']}")
        sys.exit(1)
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

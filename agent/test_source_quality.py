"""
Standalone test for source quality system
Run this to verify the source quality ranking is working correctly
"""

# Source Quality Tiers - same as in news_agent.py
SOURCE_QUALITY_TIERS = {
    # TIER 1: Primary AI Company Blogs
    "openai.com": {"tier": 1, "priority": 100, "name": "OpenAI Blog", "category": "company"},
    "anthropic.com": {"tier": 1, "priority": 99, "name": "Anthropic", "category": "company"},
    "blog.google": {"tier": 1, "priority": 98, "name": "Google AI Blog", "category": "company"},
    "deepmind.com": {"tier": 1, "priority": 97, "name": "DeepMind Blog", "category": "company"},
    "ai.meta.com": {"tier": 1, "priority": 96, "name": "Meta AI Blog", "category": "company"},
    "research.google": {"tier": 1, "priority": 95, "name": "Google Research", "category": "company"},
    "developer.microsoft.com": {"tier": 1, "priority": 94, "name": "Microsoft Developer Blog", "category": "company"},
    "aws.amazon.com": {"tier": 1, "priority": 93, "name": "AWS AI Blog", "category": "company"},
    "huggingface.co": {"tier": 1, "priority": 92, "name": "Hugging Face", "category": "company"},
    
    # TIER 2: Top-Tier Tech News
    "techcrunch.com": {"tier": 2, "priority": 80, "name": "TechCrunch", "category": "tech_news"},
    "theverge.com": {"tier": 2, "priority": 79, "name": "The Verge", "category": "tech_news"},
    "wired.com": {"tier": 2, "priority": 78, "name": "Wired", "category": "tech_news"},
    "arstechnica.com": {"tier": 2, "priority": 77, "name": "Ars Technica", "category": "tech_news"},
    "engadget.com": {"tier": 2, "priority": 76, "name": "Engadget", "category": "tech_news"},
    
    # TIER 3: AI-Specific Reputable Outlets
    "venturebeat.com": {"tier": 3, "priority": 70, "name": "VentureBeat", "category": "ai_specific"},
    "marktechpost.com": {"tier": 3, "priority": 67, "name": "MarkTechpost", "category": "ai_specific"},
    "unite.ai": {"tier": 3, "priority": 66, "name": "Unite.AI", "category": "ai_specific"},
    "therundown.ai": {"tier": 3, "priority": 64, "name": "The Rundown AI", "category": "ai_specific"},
    
    # TIER 4: Major Business/Financial News
    "reuters.com": {"tier": 4, "priority": 60, "name": "Reuters", "category": "business"},
    "bloomberg.com": {"tier": 4, "priority": 59, "name": "Bloomberg", "category": "business"},
    "ft.com": {"tier": 4, "priority": 58, "name": "Financial Times", "category": "business"},
    "wsj.com": {"tier": 4, "priority": 57, "name": "Wall Street Journal", "category": "business"},
    
    # TIER 5: Major Tech Portals
    "zdnet.com": {"tier": 5, "priority": 50, "name": "ZDNet", "category": "tech"},
    "cnet.com": {"tier": 5, "priority": 49, "name": "CNET", "category": "tech"},
    "theinformation.com": {"tier": 5, "priority": 47, "name": "The Information", "category": "tech"},
    
    # TIER 6: Academic/Research
    "nature.com": {"tier": 6, "priority": 40, "name": "Nature", "category": "academic"},
    "science.org": {"tier": 6, "priority": 39, "name": "Science", "category": "academic"},
    "cacm.acm.org": {"tier": 6, "priority": 38, "name": "Communications of the ACM", "category": "academic"},
    "arxiv.org": {"tier": 6, "priority": 37, "name": "ArXiv Preprints", "category": "academic"},
    "mit.edu": {"tier": 6, "priority": 36, "name": "MIT", "category": "academic"},
    "phys.org": {"tier": 6, "priority": 32, "name": "Phys.org", "category": "science"},
}

# Excluded domains
EXCLUDED_DOMAINS = [
    "msn.com", "yahoo.com", "aol.com", "outlook.com",
    "scoop.co.nz", "indianexpress.com", "hindustantimes.com", "timesofindia.com",
    "dailymail.co.uk", "newyorkpost.com",
    "businessinsider.com", "investopedia.com", "fool.com", "crunchbase.com",
    "livelaw.in", "kfvs12.com", "manilatimes.net", "irishtimes.com",
]

EXCLUDED_PATTERNS = [
    '/sports/', '/nfl/', '/nba/', '/entertainment/',
    '/celebrity/', '/gossip/', '/fashion/', '/politics/',
]


def get_source_quality_score(url):
    """Get the quality score for a URL."""
    if not url:
        return (999, "Unknown", "Unknown")
    
    url_lower = url.lower()
    
    # Check exclusions
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
            effective_priority = (info["tier"] * 100) - info["priority"]
            if effective_priority < best_match[0]:
                best_match = (effective_priority, f"Tier {info['tier']}", info["name"])
    
    return best_match


def rank_news_items_by_source_quality(news_items):
    """Sort news items by source quality."""
    scored_items = []
    
    for item in news_items:
        url = item.get("link", "")
        priority, tier, source_name = get_source_quality_score(url)
        
        scored_items.append({
            **item,
            "_source_priority": priority,
            "_source_tier": tier,
            "_source_name": source_name
        })
    
    scored_items.sort(key=lambda x: x.get("_source_priority", 999))
    return scored_items


# Test
if __name__ == "__main__":
    test_urls = [
        'https://openai.com/blog/gpt-5',
        'https://techcrunch.com/2026/03/10/ai-startup',
        'https://www.theverge.com/ai-announcement',
        'https://www.reuters.com/tech/ai-news',
        'https://scoop.co.nz/stories/ai-news',
        'https://www.fool.com/investing/ai-stock',
        'https://nature.com/articles/ai-research',
        'https://arxiv.org/abs/2501.12345'
    ]

    print('=' * 60)
    print('SOURCE QUALITY TEST RESULTS')
    print('=' * 60)

    for url in test_urls:
        priority, tier, name = get_source_quality_score(url)
        status = '❌ EXCLUDED' if priority >= 999 else '✅'
        print(f'{status} [{tier}] {name:30} | Priority: {priority:3}')

    print()
    print('=' * 60)
    print('TEST: Ranking news items (before -> after)')
    print('=' * 60)

    news_items = [
        {'title': 'AI News from NZ', 'link': 'https://scoop.co.nz/news'},
        {'title': 'OpenAI Announcement', 'link': 'https://openai.com/blog'},
        {'title': 'TechCrunch Analysis', 'link': 'https://techcrunch.com/ai'},
        {'title': 'Motley Fool Stock', 'link': 'https://www.fool.com/stock'},
        {'title': 'Nature Research', 'link': 'https://nature.com/research'},
    ]

    print('BEFORE ranking:')
    for i, item in enumerate(news_items):
        print(f'  {i+1}. {item["title"]}')

    ranked = rank_news_items_by_source_quality(news_items)

    print()
    print('AFTER ranking (best first):')
    for i, item in enumerate(ranked):
        print(f'  {i+1}. [{item.get("_source_tier")}] {item.get("_source_name")}: {item.get("title")}')

    print()
    print('=' * 60)
    print('SYSTEM SUMMARY')
    print('=' * 60)
    print(f'Total sources in database: {len(SOURCE_QUALITY_TIERS)}')
    print(f'Total excluded domains: {len(EXCLUDED_DOMAINS)}')
    print()
    tiers_count = {}
    for d, v in SOURCE_QUALITY_TIERS.items():
        tiers_count[v['tier']] = tiers_count.get(v['tier'], 0) + 1
    for t in sorted(tiers_count.keys()):
        print(f'  Tier {t}: {tiers_count[t]} sources')

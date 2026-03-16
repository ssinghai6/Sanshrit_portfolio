# Source Quality Ranking System - Implementation Guide

## Overview
This document describes the source quality ranking system implemented in the AI News Agent to ensure that blog posts always reference the best available sources.

## Implementation Summary

### 1. Source Quality Tiers (lines 43-120)

The system classifies sources into 6 tiers with decreasing priority:

| Tier | Priority | Sources | Example |
|------|----------|---------|---------|
| **Tier 1** | Highest | Primary AI Company Blogs | OpenAI Blog, Anthropic, Google DeepMind, Meta AI, Microsoft Research, Hugging Face |
| **Tier 2** | High | Top-Tier Tech News | TechCrunch, The Verge, Wired, Ars Technica, Engadget |
| **Tier 3** | Medium-High | AI-Specific Outlets | VentureBeat AI, MarkTechpost, Unite.AI, The Rundown |
| **Tier 4** | Medium | Business/Financial | Reuters, Bloomberg, Financial Times, WSJ |
| **Tier 5** | Medium-Low | Tech Portals | ZDNet, CNET, The Information |
| **Tier 6** | Lower | Academic/Research | Nature, Science, arXiv, MIT, Stanford |

### 2. Excluded Domains (lines 122-171)

The system explicitly excludes:
- **Aggregators**: MSN, Yahoo, AOL, Bing
- **Regional News**: scoop.co.nz, IndianExpress, local newspapers
- **Low-Quality/Clickbait**: Daily Mail, New York Post
- **Business Opinion**: Motley Fool, Business Insider, Investopedia
- **Content Mills**: MakeUseOf, HowToGeek, DigitalTrends

### 3. Core Functions

#### `get_source_quality_score(url)` (lines 173-214)
- Returns a tuple: (priority_score, tier_name, source_name)
- Lower score = better quality
- Checks exclusions first

#### `rank_news_items_by_source_quality(news_items)` (lines 216-237)
- Sorts news items by source quality
- Adds quality metadata to each item

#### `validate_sources(sources)` (lines 254-288)
- Validates and filters sources
- Removes excluded domains
- Adds quality metadata

#### `validate_and_enhance_sources(generated_post, news_items)` (lines 290-388)
- Post-generation validation
- Replaces low-quality sources with better alternatives
- Updates primary link if needed

### 4. Integration Points

#### Search Phase (search_news_node)
- Filters results for AI relevance
- Ranks by source quality
- Shows top 5 sources with quality scores

#### Generation Phase (summarize_node)
- Includes source quality info in LLM prompt
- Provides explicit guidance on source selection
- Validates and enhances sources after generation

## How It Ensures Best Sources

1. **Pre-filtering**: Low-quality sources are filtered out before processing
2. **Quality ranking**: News items are sorted by source quality
3. **LLM guidance**: The prompt explicitly instructs the LLM to prioritize high-quality sources
4. **Post-validation**: After generation, sources are validated and enhanced
5. **Primary link update**: If the primary link is low quality, it's replaced with a better source

## Usage Examples

```python
# Get quality score for a URL
priority, tier, name = get_source_quality_score("https://openai.com/blog/gpt-4")
# Returns: (1, "Tier 1", "OpenAI Blog")

# Validate sources
sources = [{"title": "AI News", "url": "https://techcrunch.com/ai"}]
validated = validate_sources(sources)
# Returns validated sources with quality metadata

# Get best source from news items
best = get_best_source(news_items, preferred_tiers=[1, 2])
# Returns the best source from Tiers 1-2
```

## Testing the System

Run the news agent to see source quality in action:
```bash
python agent/news_agent.py
```

Expected output:
```
🔍 Searching for AI/ML news...
📊 Ranking 10 items by source quality...
🏆 Top sources by quality:
   1. [Tier 1] OpenAI Blog: GPT-4 Announcement...
   2. [Tier 2] TechCrunch: AI Startup Funding...
   3. [Tier 3] VentureBeat: AI Industry Analysis...
```

## Adding New Sources

To add new sources to the system:
1. Add to `SOURCE_QUALITY_TIERS` dictionary
2. Specify tier (1-6) and priority within tier
3. Use format: `"domain.com": {"tier": X, "priority": Y, "name": "Display Name", "category": "type"}`

## Future Enhancements

- Add domain authority scoring
- Implement source diversity checking
- Add user preferences for source types
- Track source performance over time

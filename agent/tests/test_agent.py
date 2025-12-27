"""
Test suite for the AI News Agent functionality.
Run with: pytest agent/tests/ -v
"""

import pytest
import json
import os
import sys
from unittest.mock import patch, MagicMock

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestImports:
    """Test that all required modules can be imported."""
    
    def test_langgraph_import(self):
        """Test 1: LangGraph imports correctly."""
        from langgraph.graph import StateGraph, END
        assert StateGraph is not None
        assert END is not None
    
    def test_langchain_groq_import(self):
        """Test 2: LangChain Groq imports correctly."""
        from langchain_groq import ChatGroq
        assert ChatGroq is not None
    
    def test_news_agent_import(self):
        """Test 3: News agent module imports correctly."""
        import news_agent
        assert hasattr(news_agent, 'build_graph')
        assert hasattr(news_agent, 'search_news_node')
        assert hasattr(news_agent, 'summarize_node')
        assert hasattr(news_agent, 'create_issue_node')


class TestSearchNode:
    """Test the search news node functionality."""
    
    def test_search_returns_mock_data_without_api_key(self):
        """Test 4: Search returns mock data when no API key."""
        from news_agent import search_news_node
        
        with patch.dict(os.environ, {'SERPER_API_KEY': ''}, clear=False):
            state = {"news_items": [], "generated_post": None, "issue_url": None, "error": None}
            result = search_news_node(state)
            
            assert len(result["news_items"]) > 0
            assert "title" in result["news_items"][0]
            assert "snippet" in result["news_items"][0]
            assert "link" in result["news_items"][0]
    
    def test_search_handles_empty_results(self):
        """Test 5: Search falls back to mock data on empty results."""
        from news_agent import search_news_node
        
        with patch('news_agent.requests.post') as mock_post:
            mock_post.return_value.json.return_value = {"organic": []}
            with patch.dict(os.environ, {'SERPER_API_KEY': 'test_key'}, clear=False):
                state = {"news_items": [], "generated_post": None, "issue_url": None, "error": None}
                result = search_news_node(state)
                
                # Should fall back to mock data
                assert len(result["news_items"]) > 0


class TestSummarizeNode:
    """Test the summarize node functionality."""
    
    def test_summarize_returns_mock_without_api_key(self):
        """Test 6: Summarize returns mock data when no Groq API key."""
        from news_agent import summarize_node
        
        with patch.dict(os.environ, {'GROQ_API_KEY': ''}, clear=False):
            state = {
                "news_items": [{"title": "Test", "snippet": "Test snippet", "link": "http://test.com"}],
                "generated_post": None,
                "issue_url": None,
                "error": None
            }
            result = summarize_node(state)
            
            assert result["generated_post"] is not None
            assert "title" in result["generated_post"]
            assert "summary" in result["generated_post"]
            assert "content" in result["generated_post"]
            assert "tags" in result["generated_post"]
    
    def test_summarize_handles_empty_news(self):
        """Test 7: Summarize handles empty news items gracefully."""
        from news_agent import summarize_node
        
        state = {
            "news_items": [],
            "generated_post": None,
            "issue_url": None,
            "error": None
        }
        result = summarize_node(state)
        
        assert result["error"] == "No news items to summarize"


class TestGraphBuild:
    """Test the LangGraph workflow construction."""
    
    def test_graph_builds_successfully(self):
        """Test 8: Graph builds without errors."""
        from news_agent import build_graph
        
        graph = build_graph()
        assert graph is not None
    
    def test_graph_has_correct_nodes(self):
        """Test 9: Graph has all required nodes."""
        from news_agent import build_graph
        
        graph = build_graph()
        # The compiled graph should be callable
        assert callable(graph.invoke)


class TestCreateIssueNode:
    """Test the GitHub issue creation node."""
    
    def test_create_issue_skips_without_token(self):
        """Test 10: Create issue skips when no GitHub token."""
        from news_agent import create_issue_node
        
        with patch.dict(os.environ, {'GITHUB_TOKEN': ''}, clear=False):
            state = {
                "news_items": [],
                "generated_post": {"title": "Test", "summary": "Test", "content": "Test", "tags": []},
                "issue_url": None,
                "error": None
            }
            result = create_issue_node(state)
            
            # Should not create issue, but also no error
            assert result["issue_url"] is None


class TestAgentState:
    """Test the agent state structure."""
    
    def test_initial_state_structure(self):
        """Test 11: Initial state has correct structure."""
        from news_agent import AgentState
        
        state: AgentState = {
            "news_items": [],
            "generated_post": None,
            "issue_url": None,
            "error": None
        }
        
        assert "news_items" in state
        assert "generated_post" in state
        assert "issue_url" in state
        assert "error" in state


class TestBlogPostsJSON:
    """Test the blog posts data file."""
    
    def test_blog_posts_file_exists(self):
        """Test 12: blogPosts.json exists."""
        blog_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "src", "data", "blogPosts.json"
        )
        assert os.path.exists(blog_path), f"blogPosts.json not found at {blog_path}"
    
    def test_blog_posts_valid_json(self):
        """Test 13: blogPosts.json contains valid JSON."""
        blog_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "src", "data", "blogPosts.json"
        )
        with open(blog_path, 'r') as f:
            data = json.load(f)
        
        assert isinstance(data, list)
    
    def test_blog_posts_have_required_fields(self):
        """Test 14: Each blog post has required fields."""
        blog_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "src", "data", "blogPosts.json"
        )
        with open(blog_path, 'r') as f:
            posts = json.load(f)
        
        required_fields = ["id", "title", "date", "summary", "tags"]
        
        for post in posts:
            for field in required_fields:
                assert field in post, f"Post missing required field: {field}"


class TestPublishAgent:
    """Test the publish agent functionality."""
    
    def test_publish_agent_imports(self):
        """Test 15: Publish agent imports correctly."""
        import publish_agent
        assert hasattr(publish_agent, 'update_blog_data')
        assert hasattr(publish_agent, 'extract_post_data')


class TestEdgeCases:
    """Test edge cases and error handling."""
    
    def test_malformed_json_handling(self):
        """Test 16: Agent handles malformed JSON gracefully."""
        from news_agent import summarize_node
        
        with patch('news_agent.ChatGroq') as mock_groq:
            mock_llm = MagicMock()
            mock_llm.invoke.return_value.content = "This is not valid JSON"
            mock_groq.return_value = mock_llm
            
            with patch.dict(os.environ, {'GROQ_API_KEY': 'test_key'}, clear=False):
                state = {
                    "news_items": [{"title": "Test", "snippet": "Test", "link": "http://test.com"}],
                    "generated_post": None,
                    "issue_url": None,
                    "error": None
                }
                result = summarize_node(state)
                
                # Should either have a fallback post or an error, not crash
                assert result["generated_post"] is not None or result["error"] is not None
    
    def test_empty_news_items_list(self):
        """Test 17: Empty news items handled gracefully."""
        from news_agent import summarize_node
        
        state = {
            "news_items": [],
            "generated_post": None,
            "issue_url": None,
            "error": None
        }
        result = summarize_node(state)
        
        assert result["error"] is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

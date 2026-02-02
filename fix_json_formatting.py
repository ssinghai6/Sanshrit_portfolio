import json
import re

file_path = 'src/data/blogPosts.json'

def format_lists(text):
    # Regex to find the Key Takeaways section
    # Matches "**Key Takeaways**:" followed by content until "**Why It Matters**"
    pattern = r'(\*\*Key Takeaways\*\*:?)(.*?)(\*\*Why It Matters\*\*)'
    
    def replace_chunk(match):
        header = match.group(1)
        body = match.group(2)
        footer = match.group(3)
        
        # Format the body:
        # 1. Ensure the first item starts on a new line
        # 2. Replace subsequent " - " with "\n- "
        
        # Fix start: " - Item" -> "\n- Item"
        body = re.sub(r'^\s*-\s+', '\n- ', body)
        
        # Fix middle items: "Item 1 - Item 2" -> "Item 1\n- Item 2"
        # Look for " - " followed by an uppercase letter (heuristic)
        body = re.sub(r'\s+-\s+([A-Z])', r'\n- \1', body)
        
        return f"{header}\n{body}\n\n{footer}"

    return re.sub(pattern, replace_chunk, text, flags=re.DOTALL)

with open(file_path, 'r') as f:
    posts = json.load(f)

for post in posts:
    content = post.get('content', '')
    
    # 1. Standardize formatting (previous logic)
    content = re.sub(r'\s*---\s*###', '\n\n##', content)
    content = re.sub(r'([^\n])\s*##\s+', r'\1\n\n## ', content)
    if content.strip().startswith("##"):
        content = content.strip()

    # 2. Fix Lists in Key Takeaways
    content = format_lists(content)
    
    post['content'] = content

with open(file_path, 'w') as f:
    json.dump(posts, f, indent=2)

print("✅ Fixed Lists in blogPosts.json")

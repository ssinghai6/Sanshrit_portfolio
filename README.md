# 📊 Sanshrit's Data Science & Machine Learning Portfolio

Welcome to my portfolio! I'm Sanshrit Singhai — a Data Scientist with experience building end-to-end ML and Generative AI solutions across logistics, finance, and research domains.

This repository showcases a curated collection of my projects spanning supervised learning, unsupervised learning, optimization, generative AI, and time series forecasting.

---

## 🔍 Projects Overview

| Project | Description | Key Technologies |
|--------|-------------|------------------|
| [📉 Credit Card Fraud Detection](https://github.com/ssinghai6/Fraud_transactions) | Built an ML pipeline to classify fraudulent transactions using XGBoost and Random Forest; handled imbalanced data using SMOTE and custom fraud pattern features. | XGBoost, Random Forest, SMOTE, pandas, matplotlib |
| [🧠 RAG-based Document Chatbot](https://github.com/ssinghai6/DocBot) | Built a Retrieval-Augmented Generation (RAG) chatbot using LangChain, LLaMA 3.2, and FAISS for intelligent document querying. | LangChain, LLaMA 3.2, FAISS, Streamlit |
| [🚛 Logistics Optimization Solver] | Developed integer programming models to optimize fleet-wide truck assignment based on profit, integrated with OR-Tools and Gurobi. | Python, OR-Tools, Gurobi, optimization |
| [📈 Chicago Crime Prediction](https://github.com/ssinghai6/CSE6242-DVA-Team007) | Analyzed 7M+ crime records and built predictive models to forecast crime likelihood across ZIP codes. | PySpark, AWS, Tableau, Flask, XGBoost |
| [🔬 ML Stress Field Predictor](https://github.com/ssinghai6/Intelligent-Tunneling-Machine-Learning-based-Prediction-) [🔗](https://ce.gatech.edu/news/researchers-receive-17-million-grant-build-robot-subsurface-soil-exploration) | Replaced FEM simulations with deep learning models (Autoencoders, ANN) to predict stress distribution in geotechnical domains; part of a $17M NSF-funded initiative. | TensorFlow, Autoencoders, ANN |

---

## 🧠 Skills Highlighted

- **Languages:** Python, SQL, Julia, C++, JavaScript  
- **ML/DL Tools:** Scikit-learn, TensorFlow, PyTorch, XGBoost, LangChain  
- **Cloud & Infra:** Azure, AWS, Docker, PySpark, Event Hubs  
- **Data Viz:** Tableau, Power BI, matplotlib  
- **Optimization:** OR-Tools, Gurobi, Integer Programming  

---

## 📫 Connect With Me

- [LinkedIn](https://www.linkedin.com/in/singhai-sanshrit/)  
- [Website](https://sanshrit-singhai.vercel.app/)  
- [Email](mailto:singhai.sanshrit@live.com)

---
## ✨ Key Features

- **Interactive Experience Timeline**: Collapsible role details with "at-a-glance" summaries and tech tags.
- **Dynamic Blog System**: Automated AI news curation with manual "view archive" controls.
- **Optimized Performance**: Glassmorphism UI with fast load times and clean, responsive layout.

---

## 🤖 AI News Agent

This portfolio includes an **automated AI News Agent** built with LangGraph that curates weekly AI/ML news for the blog section. It features email-based approval - just reply "APPROVE" to publish!

### ✨ Features

- 🔄 **Automated Weekly Updates**: Runs every Monday at 9 AM UTC
- 🧠 **LangGraph + Groq**: Uses Llama 3.3 (free) for intelligent summarization
- 📧 **Email Approval**: Reply to GitHub notification email with "APPROVE"
- 📝 **Rich Content**: Generates well-structured articles with sections, bullet points, and sources
- 🔗 **Source Attribution**: All articles include linked sources

### 📧 Email Approval Flow

```
1. Agent runs (Monday 9 AM) → Generates article
                ↓
2. Creates GitHub Issue → GitHub emails you
                ↓
3. You reply "APPROVE" to the email
                ↓
4. GitHub posts your reply as a comment
                ↓
5. Workflow detects "APPROVE" → Publishes to blog!
```

### 🏗️ Architecture

```
LangGraph State Machine:
┌─────────────┐    ┌──────────────┐    ┌────────────────┐
│ Search Node │ → │ Summarize    │ → │ Create Issue   │
│ (Serper)    │    │ Node (Groq)  │    │ Node (GitHub)  │
└─────────────┘    └──────────────┘    └────────────────┘
       ↓                   ↓                    ↓
   News API          Llama 3.3           GitHub API
   (optional)        (free tier)         (Issues)
```

### 🚀 Setup Instructions

#### 1. Get API Keys

| Service | URL | Required? |
|---------|-----|-----------|
| **Groq** | https://console.groq.com | ✅ Yes (free) |
| **Serper** | https://serper.dev | ❌ Optional |

#### 2. Add GitHub Secrets

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Add `GROQ_API_KEY` with your Groq key
3. (Optional) Add `SERPER_API_KEY` for real news search

#### 3. Test the Agent

**Locally:**
```bash
# Create .env file in agent/ folder
echo "GROQ_API_KEY=your_key_here" > agent/.env

# Run the agent
cd portfolio
pip install -r agent/requirements.txt
python3 agent/news_agent.py
```

**On GitHub:**
1. Go to **Actions** tab
2. Click **"Weekly AI News Agent"**
3. Click **"Run workflow"**

### 📁 File Structure

```
agent/
├── news_agent.py      # LangGraph agent (search → summarize → create issue)
├── publish_agent.py   # Publishes post when approved
├── requirements.txt   # Python dependencies
└── .env              # API keys (gitignored)

.github/workflows/
├── weekly_agent.yml   # Runs agent every Monday
└── approve_post.yml   # Triggered by "APPROVE" comment
```

### 🔧 Customization

- **Change schedule**: Edit cron in `weekly_agent.yml`
- **Change model**: Update `model_name` in `news_agent.py`
- **Add news sources**: Modify `search_news_node()` function

### 🧪 Test Cases

#### Agent Tests (Local)

| Test Case | Command | Expected Result |
|-----------|---------|-----------------|
| **1. Dry run (no API keys)** | `python3 agent/news_agent.py` | Uses mock data, generates sample post |
| **2. With Groq API** | Set `GROQ_API_KEY` in `.env`, run agent | Generates real AI-written content |
| **3. With Serper API** | Set `SERPER_API_KEY` in `.env`, run agent | Fetches real news articles |
| **4. Import check** | `python3 -c "from langgraph.graph import StateGraph"` | No errors |

#### Workflow Tests (GitHub)

| Test Case | How to Test | Expected Result |
|-----------|-------------|-----------------|
| **5. Manual trigger** | Actions → Weekly AI News Agent → Run workflow | Issue created with AI content |
| **6. Email notification** | After Issue creation | Email received at GitHub email |
| **7. Approve via comment** | Comment "APPROVE" on Issue | Post added to `blogPosts.json` |
| **8. Approve via email** | Reply "APPROVE" to GitHub email | Same as above |

#### UI Tests (Frontend)

| Test Case | How to Test | Expected Result |
|-----------|-------------|-----------------|
| **9. Blog section loads** | Navigate to `/#blog` | Shows 2 most recent posts |
| **10. View All modal** | Click "AI/ML Insights" | Modal shows all posts |
| **11. Read More modal** | Click "Read more" on a post | Detailed article with sections |
| **12. Source links** | Click source in Read More modal | Opens source URL in new tab |
| **13. Mobile responsive** | Resize browser to mobile | Cards stack vertically |

#### Edge Cases

| Test Case | Scenario | Expected Result |
|-----------|----------|-----------------|
| **14. No API keys** | Remove all API keys | Falls back to mock data |
| **15. Serper returns 0** | Invalid Serper key | Falls back to mock news |
| **16. JSON parse error** | LLM returns malformed JSON | Falls back to simplified post |
| **17. Empty blog posts** | Delete all from `blogPosts.json` | Shows empty state gracefully |

#### Running All Tests

```bash
# 1. Test Python imports
python3 -c "from langgraph.graph import StateGraph; from langchain_groq import ChatGroq; print('✅ All imports work')"

# 2. Test agent dry run
python3 agent/news_agent.py

# 3. Test React app
npm start
# Visit http://localhost:3000/#blog
```

---

> 💡 *This portfolio reflects both academic and industry work — combining research depth with production-ready data science.*  
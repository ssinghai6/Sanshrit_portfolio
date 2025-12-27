import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, X } from 'lucide-react';
import GraphBackground from './GraphBackground';
import { FaFileAlt, FaNewspaper } from 'react-icons/fa';
import blogPosts from './data/blogPosts.json';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300">
      {/* Background Component */}
      <GraphBackground />

      {/* Navigation */}
      <nav className="fixed w-full bg-zinc-900/90 backdrop-blur-sm z-50 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-zinc-100 font-mono hover:text-olive-500 transition-colors">
              SS
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">About</a>
              <a href="#skills" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">Skills</a>
              <a href="#experience" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">Experience</a>
              <a href="#projects" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">Projects</a>
              <a href="#publications" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">Publications</a>
              <a href="#blog" className="text-sm font-mono text-zinc-400 hover:text-olive-500 transition-colors">Blog</a>
            </div>

            <div className="flex space-x-4 pl-6 border-l border-zinc-700">
              <a
                href="https://github.com/ssinghai6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-olive-500 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/singhai-sanshrit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-olive-500 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:singhai.sanshrit@live.com"
                className="text-zinc-400 hover:text-olive-500 transition-colors"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://1drv.ms/b/c/a9a13d4ed9947e83/EXS8G8zoBs5CowVwcGx9Gm4BFTw8WEO0aCnzWgSyY5SuKw?e=Gowt1P"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-olive-500 transition-colors"
              >
                <FaFileAlt size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section id="about" className="mb-32 pt-16">
          <h1 className="text-5xl font-bold text-zinc-100 mb-6">
            Sanshrit Singhai
          </h1>
          <h2 className="text-2xl text-olive-500 font-mono mb-6">
            Data Scientist & ML Engineer
          </h2>
          <p className="max-w-xl text-lg leading-relaxed">
            Data Scientist (3+ years, Georgia Tech MS) delivering ML, statistical analysis, optimization, and GenAI systems at production scale.
            Strong in PyTorch, TensorFlow, OR-Tools, LangChain, BigQuery, and cloud-scale pipelines. Experienced in experimentation, scalable system design, and partnering with engineering/product teams to drive measurable business impact.
          </p>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-32 scroll-mt-24">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Skills & Tools</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-zinc-100 mb-4">ML & GenAI</h4>
              <p className="text-zinc-400 font-mono">
                Python • PyTorch • TensorFlow • Scikit-learn
                <br />
                LLMs • LangChain • LangGraph • OpenCV • FAISS
              </p>
            </div>
            <div>
              <h4 className="text-zinc-100 mb-4">Data, Cloud & Optimization</h4>
              <p className="text-zinc-400 font-mono">
                PySpark • Kafka • Azure • AWS • BigQuery • Redis
                <br />
                OR-Tools • Gurobi • TigerGraph • SQL • MATLAB
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32 scroll-mt-24">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Experience</h3>
          <div className="space-y-12">
            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">2023 — Present</div>
                <div>
                  <h4 className="text-zinc-100">Data Scientist <a
                    href="https://www.enru.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-400 transition-colors"
                  ><strong>@ ENRU</strong>

                  </a>
                  </h4>
                  <p className="text-zinc-400">Logistics Optimization & Analytics</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li><strong>ML & DL models - </strong>Developed models (TensorFlow/PyTorch, ensembles) for multi-label classification and accessorial cost prediction, improving cost estimation accuracy by 40% for new locations.</li>
                  <li><strong>RAG-based GenAI chatbot - </strong>Built a chatbot (LangChain & FAISS) to enable natural-language planning queries, reducing analyst lookup time by 60%.</li>
                  <li><strong>Integer-programming optimizer - </strong>Engineered a profit-maximizing optimizer (OR-Tools, Gurobi) that improved routing decisions and increased revenue per truck by 25%, while achieving a 10× speed improvement.</li>
                  <li><strong>Real-time Pipeline - </strong>Designed a pipeline on Azure EventHub that streams 3PL freight data and supports downstream ML systems.</li>
                  <li><strong>Graph Queries - </strong>Built and optimized GSQL graph queries for journey verification and truck assignment, enabling robust logistics decision-making.</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">2022 — 2023</div>
                <div>
                  <h4 className="text-zinc-100">Research Assistant <a
                    href="https://www.gatech.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-400 transition-colors"
                  ><strong>@ Georgia Tech</strong>

                  </a></h4>
                  <p className="text-zinc-400">NSF Funded Research</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li>Proposed and refined an LSTM-RNN framework for multivariate time series forecasting to predict mechanical properties in the excavating domain, achieving a 30% result improvement.</li>
                  <li>Developed an ANN surrogate for FEM simulations, reducing computation time 20x.</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">Summer 2022</div>
                <div>
                  <h4 className="text-zinc-100">Machine Learning Intern <a
                    href="https://www.itascacg.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-400 transition-colors"
                  ><strong>@ Itasca Consulting Group</strong>

                  </a></h4>
                  <p className="text-zinc-400">Deep Learning Model for Simulating Geomechanics Problem</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li>Developed a deep learning tool using neural networks to predict velocity fields, bearing capacity, and failure depths for 230K cases, achieving an R2 score of 0.91.</li>
                  <li>Built an advanced mesh generation tool for Rhino Griddle based on computational geometry for efficient meshing.</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">2019 - 2021</div>
                <div>
                  <h4 className="text-zinc-100">Research Associate <a
                    href="https://snu.edu.in/home/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive-500 hover:text-olive-400 transition-colors"
                  ><strong>@ Shiv Nadar University</strong>

                  </a></h4>
                  <p className="text-zinc-400">Stochastic Analysis and modeling random field</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li>Modeled spatial variability of soil elastic modulus using random field theory & stochastic simulations.</li>
                  <li>Ran Monte Carlo simulations and FEA workflows to analyze vertical stress and settlement behavior under varying conditions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="mb-32 scroll-mt-24">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Featured Projects</h3>
          <div className="grid gap-12">
            <div className="group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Document Chatbot
                  </h4>
                  <p className="text-zinc-400">RAG Implementation with Llama 3.2</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ssinghai6/DocBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://docbot-llm.streamlit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <ul className="list-disc space-y-2 text-zinc-400 pl-4">
                <li>Built a RAG based document QA chatbot using FAISS, LangChain and embeddings for semantic retrieval and context-awareness.</li>
                <li>Developed a Streamlit UI with PDF injection, caching, semantic search, & conversational memory for fast interactive Q&A.</li>
              </ul>
            </div>

            <div className="group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    ML Stress Field Predictor
                  </h4>
                  <p className="text-zinc-400">Neural Network Implementation</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ssinghai6/Intelligent-Tunneling-Machine-Learning-based-Prediction-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://ce.gatech.edu/news/researchers-receive-17-million-grant-build-robot-subsurface-soil-exploration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <p className="text-zinc-400">
                Deep Learning Frameworks for bypassing FEM Simulation and predicting the stress responses based on mechanical properties of soil domain
              </p>
            </div>

            <div className="group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Credit Card Fraud Detection (ML Pipeline)
                  </h4>
                  <p className="text-zinc-400">XGBoost and Random Forest Implementation</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ssinghai6/Fraud_transactions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://github.com/ssinghai6/Fraud_transactions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <ul className="list-disc space-y-2 text-zinc-400 pl-4">
                <li>Trained XGBoost and Random Forest models on imbalanced transaction data for fraud classification.</li>
                <li>Engineered fraud-specific features (e.g., reversal detection, multi-swipe patterns) and handled class imbalance with SMOTE.</li>
              </ul>
            </div>

            <div className="group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Unveiling Patterns and Insights in Chicago's Criminal Activity through Advanced Data Analysis
                  </h4>
                  <p className="text-zinc-400">XGBoost Implementation and Dataset mining by using PySpark</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ssinghai6/CSE6242-DVA-Team007"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://public.tableau.com/app/profile/sanshrit.singhai8506/viz/Final_cse_visualization/Dashboard1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-olive-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <ul className="list-disc space-y-2 text-zinc-400 pl-4">
                <li>Analyzed 7M+ crime records using PySpark on AWS Data Lake; performed large-scale ETL and feature engineering.</li>
                <li>Built and deployed an XGBoost model as a Flask API to predict crime risk by ZIP code.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-32 scroll-mt-24">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Publications</h3>
          <div className="space-y-8">
            <div className="group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Deep Learning models for subterranean navigation and soil characterization
                  </h4>
                  <p className="text-zinc-400">EMI 2023 at Georgia Tech | Atlanta, GA</p>
                </div>
                <a
                  href="https://www.emi-conference.org/sites/emi-conference.org/2023/files/inline-files/ASCE-EMI2023-Program-web.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-olive-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Insights on 2D versus 3D Modeling of Strip Loading on Spatially Varying Random Soil Domain
                  </h4>
                  <p className="text-zinc-400">Geo-Congress 2023 | Los Angeles, CA - USA</p>
                </div>
                <a
                  href="https://ascelibrary.org/doi/abs/10.1061/9780784484692.014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-olive-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Uncertainties in Vertical Stress Distribution in Spatially Varying Random Elastic Half Space
                  </h4>
                  <p className="text-zinc-400">International Journal of Geomechanics, ASCE</p>
                </div>
                <a
                  href="https://ascelibrary.org/doi/10.1061/%28ASCE%29GM.1943-5622.0002332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-olive-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Some Observations on Numerical Analysis of Lateral Response of Caisson Foundation
                  </h4>
                  <p className="text-zinc-400">ICGRE'22 - 7th International Conference on Geotechnical Research and Engineering (ICGRE'22)</p>
                </div>
                <a
                  href="https://www.researchgate.net/publication/360283011_Some_Observations_on_Numerical_Analysis_of_Lateral_Response_of_Caisson_Foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-olive-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-zinc-100 group-hover:text-olive-500 transition-colors">
                    Effect of Soil Spatial Variability on Lateral Response of Well Foundation Embedded in Linear Elastic Soil
                  </h4>
                  <p className="text-zinc-400">Conference: IACMAG Symposium2019 · Mar 1, 2019</p>
                </div>
                <a
                  href="https://link.springer.com/chapter/10.1007/978-981-15-0886-8_35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-olive-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-32 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAllPosts(true)}
                className="text-olive-500 font-mono text-lg hover:underline cursor-pointer bg-transparent border-none flex items-center gap-2"
              >
                AI/ML Insights
                {blogPosts.length > 2 && (
                  <span className="text-xs text-zinc-500">({blogPosts.length} posts)</span>
                )}
              </button>
              <span className="px-2 py-1 text-xs font-mono bg-olive-500/20 text-olive-500 rounded-full border border-olive-500/30">
                🤖 Auto-curated
              </span>
            </div>
            {blogPosts.length > 2 && (
              <button
                onClick={() => setShowAllPosts(true)}
                className="text-olive-500 text-sm font-mono hover:underline cursor-pointer bg-transparent border-none"
              >
                View All →
              </button>
            )}
          </div>
          <p className="text-zinc-400 mb-8">Weekly updates on what's happening in AI, Data Science, and Optimization.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-olive-500 hover:shadow-lg hover:shadow-olive-500/10 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center text-olive-500 mb-2">
                    <FaNewspaper className="mr-2" />
                    <span className="text-xs font-mono">{post.date}</span>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-olive-500 transition-colors">
                  {post.title}
                </h4>
                <p className="text-zinc-400 mb-4 line-clamp-3">
                  {post.summary}
                </p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-olive-500 text-sm font-mono hover:underline flex items-center cursor-pointer bg-transparent border-none"
                >
                  Read more <ExternalLink size={14} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* All Posts Modal */}
        {showAllPosts && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAllPosts(false)}
          >
            <div
              className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-zinc-100">AI/ML Insights</h2>
                  <span className="px-2 py-1 text-xs font-mono bg-olive-500/20 text-olive-500 rounded-full border border-olive-500/30">
                    {blogPosts.length} posts
                  </span>
                </div>
                <button
                  onClick={() => setShowAllPosts(false)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* All Posts Grid */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-zinc-800/50 p-5 rounded-lg border border-zinc-700 hover:border-olive-500 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center text-olive-500">
                          <FaNewspaper className="mr-2" size={12} />
                          <span className="text-xs font-mono">{post.date}</span>
                        </div>
                        <div className="flex gap-1">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-olive-500 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                        {post.summary}
                      </p>
                      <button
                        onClick={() => {
                          setShowAllPosts(false);
                          setSelectedPost(post);
                        }}
                        className="text-olive-500 text-sm font-mono hover:underline flex items-center cursor-pointer bg-transparent border-none"
                      >
                        Read more <ExternalLink size={12} className="ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaNewspaper className="text-olive-500" />
                    <span className="text-xs font-mono text-olive-500">{selectedPost.date}</span>
                    <div className="flex gap-2 ml-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">{selectedPost.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Summary */}
                <div className="bg-olive-500/10 border border-olive-500/30 rounded-lg p-4 mb-6">
                  <p className="text-zinc-300 italic">{selectedPost.summary}</p>
                </div>

                {/* Detailed Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  {selectedPost.content ? (
                    selectedPost.content.split('\n\n').map((block, idx) => {
                      // Handle ## Headers
                      if (block.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-xl font-bold text-olive-500 mt-6 mb-3 border-b border-zinc-800 pb-2">
                            {block.replace('## ', '')}
                          </h2>
                        );
                      }
                      // Handle ### Sub-headers
                      if (block.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-lg font-semibold text-zinc-100 mt-4 mb-2">
                            {block.replace('### ', '')}
                          </h3>
                        );
                      }
                      // Handle bullet points
                      if (block.includes('\n• ') || block.startsWith('• ')) {
                        const items = block.split('\n').filter(line => line.startsWith('• '));
                        return (
                          <ul key={idx} className="space-y-2 mb-4 ml-4">
                            {items.map((item, i) => (
                              <li key={i} className="text-zinc-300 flex items-start">
                                <span className="text-olive-500 mr-2">•</span>
                                <span dangerouslySetInnerHTML={{
                                  __html: item.replace('• ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100">$1</strong>')
                                }} />
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Handle numbered lists
                      if (/^\d+\.\s/.test(block)) {
                        const items = block.split('\n').filter(line => /^\d+\.\s/.test(line));
                        return (
                          <ol key={idx} className="space-y-2 mb-4 ml-4 list-decimal list-inside">
                            {items.map((item, i) => (
                              <li key={i} className="text-zinc-300">
                                <span dangerouslySetInnerHTML={{
                                  __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100">$1</strong>')
                                }} />
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      // Regular paragraphs with bold text support
                      return (
                        <p key={idx} className="text-zinc-300 mb-4 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100">$1</strong>')
                          }}
                        />
                      );
                    })
                  ) : (
                    <p className="text-zinc-400">Full content coming soon...</p>
                  )}
                </div>

                {/* Sources */}
                {selectedPost.sources && selectedPost.sources.length > 0 && (
                  <div className="border-t border-zinc-800 pt-6">
                    <h4 className="text-olive-500 font-mono text-sm mb-4">📚 Sources</h4>
                    <div className="space-y-3">
                      {selectedPost.sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-olive-500 transition-colors group"
                        >
                          <ExternalLink size={16} className="text-olive-500 flex-shrink-0" />
                          <span className="text-zinc-300 group-hover:text-olive-500 transition-colors text-sm">
                            {source.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Link */}
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-olive-500 text-zinc-900 font-mono text-sm rounded-lg hover:bg-olive-400 transition-colors"
                  >
                    Read Full Article <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-zinc-500 font-mono text-sm">
            © {new Date().getFullYear()} Sanshrit Singhai. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

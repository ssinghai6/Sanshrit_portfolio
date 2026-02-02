import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, X, ChevronRight, Menu, Download, Database } from 'lucide-react';
import GraphBackground from './GraphBackground';
import { FaFileAlt, FaNewspaper, FaGraduationCap } from 'react-icons/fa';
import blogPosts from './data/blogPosts.json';

const Portfolio = () => {

  const [selectedPost, setSelectedPost] = useState(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});



  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-sm font-mono text-zinc-400 hover:text-primary-400 transition-colors relative group"
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
    </a>
  );

  const SocialLink = ({ href, icon: Icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
    >
      <Icon size={18} />
    </a>
  );

  return (
    <div className="min-h-screen bg-background text-zinc-300 font-sans selection:bg-primary-500/30">
      {/* Background Component */}
      <div className="fixed inset-0 z-0 opacity-40">
        <GraphBackground />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full glass-nav z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#about" className="text-xl font-bold font-display tracking-tighter text-white">
              SS<span className="text-primary-500">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#publications">Publications</NavLink>
              <NavLink href="#education">Education</NavLink>
              <NavLink href="#blog">Blog</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-2 pl-6 border-l border-white/10">
              <SocialLink href="https://github.com/ssinghai6" icon={Github} />
              <SocialLink href="https://www.linkedin.com/in/singhai-sanshrit" icon={Linkedin} />
              <SocialLink href="mailto:singhai.sanshrit@live.com" icon={Mail} />
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <a
                href="https://1drv.ms/b/c/a9a13d4ed9947e83/IQCb0Lq-Ps0mTqblBJKtjRlQAdX_NuTn9t1I0b--yiFD4Fg?e=N9Zt95"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs font-mono text-zinc-300 transition-colors border border-white/5"
              >
                <Download size={12} />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-zinc-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-nav border-t border-white/5 p-4 space-y-4 flex flex-col items-center animate-slide-up">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#publications">Publications</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <div className="flex space-x-4 pt-4 border-t border-white/10 w-full justify-center">
              <SocialLink href="https://github.com/ssinghai6" icon={Github} />
              <SocialLink href="https://www.linkedin.com/in/singhai-sanshrit" icon={Linkedin} />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* Hero Section */}
        <section id="about" className="mb-32 pt-20 min-h-[60vh] flex flex-col justify-center animate-fade-in">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-block px-3 py-1 text-xs font-mono text-primary-400 bg-primary-500/10 border border-primary-500/20 rounded-full w-fit">
              Available for Opportunities
            </div>
            <div className="inline-block px-3 py-1 text-xs font-mono text-secondary-400 bg-secondary-500/10 border border-secondary-500/20 rounded-full w-fit">
              H1B (Transfer Eligible)
            </div>
            <div className="inline-block px-3 py-1 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 rounded-full w-fit">
              Atlanta, GA
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
            Sanshrit <br />
            <span className="text-gradient">Singhai</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-400 font-light mb-8 max-w-2xl">
            Data Scientist & ML Engineer specializing in <span className="text-secondary-400">GenAI</span>, <span className="text-accent-400">Optimization</span> & <span className="text-primary-400">Scalable Systems</span>.
          </h2>
          <p className="max-w-xl text-lg text-zinc-500 leading-relaxed mb-10">
            <p className="max-w-xl text-lg text-zinc-500 leading-relaxed mb-10">I’m a data scientist and ML engineer with ~3 years of industry experience building production-grade machine learning, optimization, and GenAI systems. I hold an MS in Computational Science & Engineering (Machine Learning) from Georgia Tech and have also worked on National Science Foundation–funded research, which shaped my approach to rigorous system design and experimentation.
              I enjoy turning ambiguous, real-world problems into scalable, high-impact ML systems—working at the intersection of data, engineering, and product with a strong focus on ownership, clarity, and measurable outcomes.</p>
          </p>

          <div className="flex gap-4">
            <a href="#projects" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
              View Work
            </a>
            <a href="mailto:singhai.sanshrit@live.com" className="px-6 py-3 glass-panel text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Contact Me
            </a>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-8">
            Technical Arsenal
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-primary-500/10 blur-[100px] rounded-full -mr-16 -mt-16 group-hover:bg-primary-500/20 transition-all duration-700"></div>
              <h4 className="text-2xl text-white mb-6 relative flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-500"></div> ML & GenAI
              </h4>
              <div className="flex flex-wrap gap-2 relative">
                {['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LLMs', 'LangChain', 'LangGraph', 'OpenCV', 'FAISS', 'Computer Vision'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 hover:border-primary-500/50 hover:text-primary-300 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-secondary-500/10 blur-[100px] rounded-full -mr-16 -mt-16 group-hover:bg-secondary-500/20 transition-all duration-700"></div>
              <h4 className="text-2xl text-white mb-6 relative flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary-500"></div> Data & Cloud
              </h4>
              <div className="flex flex-wrap gap-2 relative">
                {['PySpark', 'Kafka', 'Azure', 'AWS', 'BigQuery', 'Redis', 'Docker', 'Git', 'FastAPI'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 hover:border-secondary-500/50 hover:text-secondary-300 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group md:col-span-2">
              <div className="absolute top-0 right-0 p-32 bg-accent-500/10 blur-[100px] rounded-full -mr-16 -mt-16 group-hover:bg-accent-500/20 transition-all duration-700"></div>
              <h4 className="text-2xl text-white mb-6 relative flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent-500"></div> Optimization & Analytics
              </h4>
              <div className="flex flex-wrap gap-2 relative">
                {['OR-Tools', 'Gurobi', 'TigerGraph', 'GSQL', 'SQL', 'Tableau', 'Power BI', 'MATLAB'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 hover:border-accent-500/50 hover:text-accent-300 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-12">
            Professional Experience
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>

          <div className="space-y-12 border-l border-zinc-800 ml-4 md:ml-0 md:border-none">
            {/* ENRU */}
            <div className="relative pl-8 md:pl-0 group">
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="mb-4 md:mb-0">
                  <span className="font-mono text-sm text-zinc-500 block mb-1">Jun 2023 — Present</span>
                  <span className="text-xs text-zinc-600 font-mono">Atlanta, GA</span>
                  <div className="mt-1 md:hidden h-2 w-2 rounded-full bg-primary-500 absolute -left-[5px] top-1.5 ring-4 ring-background"></div>
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl text-white font-medium flex items-center gap-2 mb-2">
                    Data Scientist <a href="https://www.enru.io/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">@ ENRU</a>
                  </h4>
                  <p className="text-sm text-zinc-400 mb-2">ML/AI & Optimization – Developed models improving cost estimation by 40% and routing revenue by 25%.</p>
                  <button onClick={() => setExpandedExp(prev => ({ ...prev, enru: !prev.enru }))} className="text-primary-400 hover:underline mb-2">
                    {expandedExp.enru ? 'Hide' : 'Show'} details
                  </button>
                  {expandedExp.enru && (
                    <ul className="list-disc leading-relaxed space-y-3 text-zinc-400 pl-4 marker:text-primary-500">
                      <li>Developed ML & DL models (TensorFlow/PyTorch, ensembles) for multi-label classification and accessorial cost prediction, improving cost estimation accuracy by 40% for new locations.</li>
                      <li>Built a RAG-based GenAI chatbot (LangChain & FAISS) to enable natural-language planning queries, reducing analyst lookup time by 60%.</li>
                      <li>Engineered a profit-maximizing integer-programming optimizer (OR-Tools, Gurobi) that improved routing decisions and increased revenue per truck by 25%, while achieving a 10× speed improvement over legacy heuristics.</li>
                      <li>Designed a real-time Azure EventHub pipeline that streams 3PL freight data and supports downstream ML systems.</li>
                      <li>Built and optimized GSQL graph queries for journey verification and truck assignment, enabling robust logistics decision-making.</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Georgia Tech */}
            <div className="relative pl-8 md:pl-0 group">
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="mb-4 md:mb-0">
                  <span className="font-mono text-sm text-zinc-500 block mb-1">Aug 2022 — May 2023</span>
                  <span className="text-xs text-zinc-600 font-mono">Atlanta, GA</span>
                  <div className="mt-1 md:hidden h-2 w-2 rounded-full bg-secondary-500 absolute -left-[5px] top-1.5 ring-4 ring-background"></div>
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl text-white font-medium flex items-center gap-2 mb-2">
                    Graduate Research Assistant <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-secondary-300 transition-colors">@ Georgia Tech</a>
                  </h4>
                  <p className="text-zinc-500 mb-6 font-mono text-sm">NSF Funded Research</p>
                  <ul className="list-disc leading-relaxed space-y-3 text-zinc-400 pl-4 marker:text-secondary-500">
                    <li>Proposed and refined an LSTM-RNN framework for multivariate time series forecasting to predict mechanical properties in the excavating domain, achieving a 30% result improvement.</li>
                    <li>Developed an ANN surrogate for FEM simulations, reducing computation time 20x.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Itasca */}
            <div className="relative pl-8 md:pl-0 group">
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="mb-4 md:mb-0">
                  <span className="font-mono text-sm text-zinc-500 block mb-1">May 2022 — Aug 2022</span>
                  <span className="text-xs text-zinc-600 font-mono">Minneapolis, MN</span>
                  <div className="mt-1 md:hidden h-2 w-2 rounded-full bg-zinc-600 absolute -left-[5px] top-1.5 ring-4 ring-background"></div>
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl text-white font-medium flex items-center gap-2 mb-2">
                    Machine Learning Intern <a href="https://www.itascainternational.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">@ Itasca Consulting</a>
                  </h4>
                  <ul className="list-disc leading-relaxed space-y-3 text-zinc-400 pl-4 marker:text-zinc-500">
                    <li>Developed a deep learning tool using neural networks to predict velocity fields, bearing capacity, and failure depths for 230K cases, achieving an R2 score of 0.91.</li>
                    <li>Built an advanced mesh generation tool for Rhino Griddle based on computational geometry for efficient meshing.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Shiv Nadar */}
            <div className="relative pl-8 md:pl-0 group">
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="mb-4 md:mb-0">
                  <span className="font-mono text-sm text-zinc-500 block mb-1">Jan 2020 — May 2021</span>
                  <span className="text-xs text-zinc-600 font-mono">India</span>
                  <div className="mt-1 md:hidden h-2 w-2 rounded-full bg-zinc-600 absolute -left-[5px] top-1.5 ring-4 ring-background"></div>
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl text-white font-medium flex items-center gap-2 mb-2">
                    Research Associate <a href="https://snu.edu.in/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">@ Shiv Nadar University</a>
                  </h4>
                  <ul className="list-disc leading-relaxed space-y-3 text-zinc-400 pl-4 marker:text-zinc-500">
                    <li>Modeled spatial variability of soil elastic modulus using random field theory & stochastic simulations.</li>
                    <li>Ran Monte Carlo simulations and FEA workflows to analyze vertical stress and settlement behavior under varying conditions.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-12">
            Select Projects
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PROJ 1 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-primary-500/30 transition-all duration-300 group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                  <FaFileAlt size={24} />
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/ssinghai6/DocBot" className="text-zinc-400 hover:text-primary-400 transition-colors"><Github size={20} /></a>
                  <a href="https://docbot-llm.streamlit.app" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">DocBot 2.0: AI PDF Assistant</h4>
              <ul className="list-disc space-y-2 text-zinc-400 flex-grow pl-4 text-sm mb-6 marker:text-primary-500">
                <li>Engineered a multimodal RAG assistant (Llama 3.3 70B via Groq) that utilizes Vision AI to analyze charts/graphs within PDFs.</li>
                <li>Implemented 'Smart Expert Personas' and 'Deep Research Mode' for domain-specific context and deep reasoning.</li>
                <li>Supports full local privacy with Ollama (Llama 3.2) and cloud speed with Groq LPU.</li>
              </ul>
              <div className="flex gap-3 text-xs font-mono text-primary-300/80">
                <span>Llama 3.3</span>
                <span>Groq</span>
                <span>Ollama</span>
                <span>LangChain</span>
                <span>Streamlit</span>
              </div>
            </div>

            {/* PROJ 2 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-secondary-500/30 transition-all duration-300 group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-secondary-500/10 rounded-lg text-secondary-400">
                  <GraphBackground className="w-6 h-6" />
                  <span className="font-bold">Fraud</span>
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/ssinghai6/Fraud_transactions" className="text-zinc-400 hover:text-secondary-400 transition-colors"><Github size={20} /></a>
                  <a href="https://github.com/ssinghai6/Fraud_transactions" className="text-zinc-400 hover:text-secondary-400 transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">Credit Card Fraud Pipeline</h4>
              <ul className="list-disc space-y-2 text-zinc-400 flex-grow pl-4 text-sm mb-6 marker:text-secondary-500">
                <li>Trained XGBoost and Random Forest models on imbalanced transaction data for fraud classification.</li>
                <li>Engineered fraud-specific features (e.g., reversal detection, multi-swipe patterns) and handled class imbalance with SMOTE.</li>
              </ul>
              <div className="flex gap-3 text-xs font-mono text-secondary-300/80">
                <span>XGBoost</span>
                <span>Random Forest</span>
                <span>SMOTE</span>
              </div>
            </div>

            {/* PROJ 3 - ML Stress Field */}
            <div className="glass-panel p-8 rounded-2xl hover:border-accent-500/30 transition-all duration-300 group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-accent-500/10 rounded-lg text-accent-400">
                  <GraphBackground className="w-6 h-6" />
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/ssinghai6/Intelligent-Tunneling-Machine-Learning-based-Prediction-" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-accent-400 transition-colors"><Github size={20} /></a>
                  <a href="https://ce.gatech.edu/news/researchers-receive-17-million-grant-build-robot-subsurface-soil-exploration" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-accent-400 transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">ML Stress Field Predictor</h4>
              <ul className="list-disc space-y-2 text-zinc-400 flex-grow pl-4 text-sm mb-6 marker:text-accent-500">
                <li>Replaced FEM simulations with deep learning models (Autoencoders, ANN) to predict stress distribution in geotechnical domains.</li>
                <li>Achieved significant computational speedup while maintaining high prediction accuracy.</li>
              </ul>
              <div className="flex gap-3 text-xs font-mono text-accent-300/80">
                <span>TensorFlow</span>
                <span>Autoencoders</span>
                <span>ANN</span>
              </div>
            </div>

            {/* PROJ 4 - DVA */}
            <div className="glass-panel p-8 rounded-2xl hover:border-primary-500/30 transition-all duration-300 group flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                  <Database size={24} />
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/ssinghai6/CSE6242-DVA-Team007" className="text-zinc-400 hover:text-primary-400 transition-colors"><Github size={20} /></a>
                  <a href="https://public.tableau.com/app/profile/sanshrit.singhai8506/viz/Final_cse_visualization/Dashboard1" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">Chicago Crime Analytics</h4>
              <ul className="list-disc space-y-2 text-zinc-400 flex-grow pl-4 text-sm mb-6 marker:text-primary-500">
                <li>Analyzed 7M+ crime records using PySpark on AWS Data Lake; performed large-scale ETL and feature engineering.</li>
                <li>Built and deployed an XGBoost model as a Flask API to predict crime risk by ZIP code.</li>
              </ul>
              <div className="flex gap-3 text-xs font-mono text-primary-300/80">
                <span>PySpark</span>
                <span>AWS EMR</span>
                <span>Tableau</span>
                <span>Flask API</span>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-12">
            Publications
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                    Deep Learning Models for Subterranean Navigation and Soil Characterization
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">EMI 2023 at Georgia Tech | Atlanta, GA</p>
                </div>
                <a href="https://www.emi-conference.org/sites/emi-conference.org/2023/files/inline-files/ASCE-EMI2023-Program-web.pdf" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                    Insights on 2D versus 3D Modeling of Strip Loading on Spatially Varying Random Soil Domain
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">Geo-Congress 2023 | Los Angeles, CA</p>
                </div>
                <a href="https://ascelibrary.org/doi/abs/10.1061/9780784484692.014" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                    Uncertainties in Vertical Stress Distribution in Spatially Varying Random Elastic Half Space
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">International Journal of Geomechanics, ASCE</p>
                </div>
                <a href="https://ascelibrary.org/doi/10.1061/%28ASCE%29GM.1943-5622.0002332" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                    Some Observations on Numerical Analysis of Lateral Response of Caisson Foundation
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">ICGRE'22 - 7th International Conference on Geotechnical Research</p>
                </div>
                <a href="https://www.researchgate.net/publication/360283011_Some_Observations_on_Numerical_Analysis_of_Lateral_Response_of_Caisson_Foundation" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg text-white font-medium group-hover:text-primary-400 transition-colors">
                    Effect of Soil Spatial Variability on Lateral Response of Well Foundation
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">IACMAG Symposium 2019</p>
                </div>
                <a href="https://link.springer.com/chapter/10.1007/978-981-15-0886-8_35" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary-400 transition-colors"><ExternalLink size={18} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section (New) */}
        <section id="education" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-12">
            Education
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white"><a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Georgia Institute of Technology</a></h4>
                <FaGraduationCap className="text-secondary-400" size={24} />
              </div>
              <p className="text-white font-medium mb-1">MS, Computational Science & Engineering</p>
              <p className="text-zinc-500 mb-4 font-mono text-sm">May 2023 | Atlanta, GA</p>

              <div className="mb-4">
                <span className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2 py-1 rounded">GPA: 3.9/4.0</span>
              </div>

              <p className="text-sm text-zinc-400">
                <strong>Focus:</strong> Machine Learning, Computer Vision, AI, Data Analytics
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white"><a href="https://snu.edu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">Shiv Nadar University</a></h4>
                <FaGraduationCap className="text-zinc-600" size={24} />
              </div>
              <p className="text-white font-medium mb-1">B.Tech, Civil Engineering</p>
              <p className="text-zinc-500 mb-4 font-mono text-sm">Jun 2020 | India</p>

              <div className="mb-4">
                <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">GPA: 8.6/10</span>
              </div>

              <p className="text-sm text-zinc-400">
                <strong>Focus:</strong> Computational Mechanics
              </p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-32 scroll-mt-24">
          <h3 className="flex items-center text-primary-400 font-mono text-lg mb-12">
            Latest Insights
            <span className="h-px bg-zinc-800 flex-grow ml-4"></span>
          </h3>

          <div className="flex items-center justify-between mb-8">
            <p className="text-zinc-400">Weekly updates on AI, Data Science, and Optimization.</p>
            <button
              onClick={() => setShowAllPosts(true)}
              className="text-primary-400 text-sm font-mono hover:text-primary-300 transition-colors flex items-center gap-2 group"
            >
              View Archive <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, idx) => (
              <div key={post.id} className="glass-panel p-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                <div className={`h-2 w-full ${idx % 2 === 0 ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-gradient-to-r from-secondary-500 to-accent-500'}`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                      <FaNewspaper className="text-zinc-600" />
                      {post.date}
                    </span>
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/5 text-zinc-400 px-2 py-1 rounded border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-zinc-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.summary}
                  </p>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-white text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read Article <ChevronRight size={14} className="text-primary-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pb-8 border-t border-white/5 pt-8">
          <p className="text-zinc-600 font-mono text-xs">
            © {new Date().getFullYear()} Sanshrit Singhai.
          </p>
        </footer>
      </main>

      {/* Modals */}
      {showAllPosts && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAllPosts(false)}></div>
          <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col relative z-10 animate-blob">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-2xl font-bold text-white">Archive</h2>
              <button onClick={() => setShowAllPosts(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} className="text-zinc-400" />
              </button>
            </div>
            <div className="overflow-y-auto p-6 grid md:grid-cols-2 gap-4">
              {blogPosts.map((post) => (
                <div key={post.id}
                  onClick={() => { setShowAllPosts(false); setSelectedPost(post); }}
                  className="p-5 rounded-xl border border-white/5 bg-white/5 hover:border-primary-500/50 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-mono text-zinc-500 mb-2 block">{post.date}</span>
                  <h4 className="font-bold text-zinc-200 group-hover:text-primary-400 transition-colors mb-2">{post.title}</h4>
                  <p className="text-sm text-zinc-500 line-clamp-2">{post.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedPost(null)}></div>
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col relative z-10 animate-slide-up bg-[#0f0f0f]">
            <div className="sticky top-0 p-6 border-b border-white/10 flex justify-between items-start bg-[#0f0f0f]/95 backdrop-blur z-20">
              <div>
                <div className="flex gap-2 mb-3">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selectedPost.title}</h2>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0">
                <X size={24} className="text-zinc-400" />
              </button>
            </div>

            <div className="overflow-y-auto p-8 md:p-12">
              {/* Content Rendering with ReactMarkdown */}
              {/* Content Rendering with ReactMarkdown */}
              {selectedPost.content ? (
                <div className="space-y-8">
                  {(() => {
                    // Split content by ## headers (sections start with \n## or at beginning)
                    const sections = selectedPost.content.split(/\n(?=## )/).filter(s => s.trim());

                    return sections.map((section, idx) => {
                      // Extract title
                      const titleMatch = section.match(/^## (.+?)(?:\s{2,}|\n|$)/);
                      let title = titleMatch ? titleMatch[1].trim() : (idx === 0 ? "Overview" : `Section ${idx + 1}`);

                      // Clean up title (remove trailing # or other artifacts)
                      title = title.replace(/\s*#\s*$/, '').trim();

                      // Get everything after the title
                      let fullContent = titleMatch ? section.replace(titleMatch[0], '').trim() : section.trim();

                      // Extract Key Takeaways section
                      // Format: **Key Takeaways**:\n\n- item1\n- item2\n\n**Why It Matters**
                      // OR: ### Key Takeaways\n\n- item1\n- item2\n\n### Why It Matters
                      let takeaways = [];
                      let bodyContent = fullContent;
                      let whyItMatters = '';

                      // Try to match Key Takeaways block (handles both **Key Takeaways**: and ### Key Takeaways)
                      const takeawaysPattern = /(\*\*Key Takeaways\*\*:?|### Key Takeaways)\s*([\s\S]*?)(\*\*Why It Matters\*\*|### Why It Matters)/i;
                      const takeawaysMatch = fullContent.match(takeawaysPattern);

                      if (takeawaysMatch) {
                        // Extract takeaways list
                        const takeawaysBlock = takeawaysMatch[2];
                        takeaways = takeawaysBlock
                          .split('\n')
                          .map(line => line.replace(/^[-*•]\s*/, '').trim())
                          .filter(line => line.length > 0);

                        // Get body content (before Key Takeaways)
                        const beforeTakeaways = fullContent.split(takeawaysMatch[1])[0].trim();

                        // Get Why It Matters content (after the marker)
                        const afterWhy = fullContent.split(takeawaysMatch[3])[1];
                        if (afterWhy) {
                          whyItMatters = afterWhy.replace(/^:?\s*/, '').trim();
                        }

                        bodyContent = beforeTakeaways;
                      }

                      // Clean up stray artifacts (like trailing # from LLM output)
                      bodyContent = bodyContent.replace(/\s*#\s*$/, '').trim();

                      // Find matching source by fuzzy title match
                      const matchedSource = selectedPost.sources?.find(s => {
                        if (!s.title || !title) return false;
                        const sourceTitleLower = s.title.toLowerCase();
                        const sectionTitleLower = title.toLowerCase();
                        // Check if titles share significant words
                        const sourceWords = sourceTitleLower.split(/\s+/).filter(w => w.length > 3);
                        const sectionWords = sectionTitleLower.split(/\s+/).filter(w => w.length > 3);
                        return sourceWords.some(w => sectionTitleLower.includes(w)) ||
                          sectionWords.some(w => sourceTitleLower.includes(w));
                      });

                      // Skip sections that are just separators or empty
                      if (title === '---' || (!bodyContent && takeaways.length === 0)) {
                        return null;
                      }

                      return (
                        <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
                          {/* Story Title */}
                          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                            {title}
                          </h2>

                          {/* Story Content */}
                          {bodyContent && (
                            <div className="text-gray-300 leading-relaxed text-lg mb-6 space-y-4">
                              {bodyContent.split(/\s{2,}/).map((paragraph, pIdx) => (
                                paragraph.trim() && (
                                  <p key={pIdx} className="text-gray-300">
                                    {paragraph.trim()}
                                  </p>
                                )
                              ))}
                            </div>
                          )}

                          {/* Key Takeaways Box */}
                          {takeaways.length > 0 && (
                            <div className="bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
                              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Key Takeaways
                              </h4>
                              <ul className="space-y-2">
                                {takeaways.map((t, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-300">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Why It Matters */}
                          {whyItMatters && (
                            <div className="bg-purple-500/10 border-l-4 border-purple-500 rounded-r-xl p-5 mb-6">
                              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Why It Matters
                              </h4>
                              <p className="text-gray-300">{whyItMatters}</p>
                            </div>
                          )}

                          {/* Source Link for this story */}
                          {matchedSource && (
                            <div className="pt-4 border-t border-zinc-800 flex justify-end">
                              <a
                                href={matchedSource.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20"
                              >
                                Read Source <ExternalLink size={14} />
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    }).filter(Boolean);
                  })()}
                </div>
              ) : <p>Loading...</p>}

              {/* All Sources Reference Section */}
              {selectedPost.sources && selectedPost.sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaNewspaper className="text-primary-400" /> All Sources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPost.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0">
                          <ExternalLink size={18} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white line-clamp-2">
                          {source.title || source.url}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;


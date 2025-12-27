import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import GraphBackground from './GraphBackground';
import { FaFileAlt } from 'react-icons/fa';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

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
        <section id="publications" className="scroll-mt-24">
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

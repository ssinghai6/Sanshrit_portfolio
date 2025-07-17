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
      <nav className="fixed w-full bg-zinc-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-olive-500 font-mono"></span>
            <div className="flex space-x-6">
              <a
                href="https://github.com/ssinghai6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/singhai-sanshrit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:singhai.sanshrit@live.com" 
                className="hover:text-olive-500 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://1drv.ms/b/c/a9a13d4ed9947e83/EXS8G8zoBs5CowVwcGx9Gm4BFTw8WEO0aCnzWgSyY5SuKw?e=Gowt1P" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive-500 transition-colors"
              >
                <FaFileAlt size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-32">
          <h1 className="text-5xl font-bold text-zinc-100 mb-6">
            Sanshrit Singhai
          </h1>
          <h2 className="text-2xl text-olive-500 font-mono mb-6">
            Data Scientist & ML Engineer
          </h2>
          <p className="max-w-xl text-lg leading-relaxed">
            I build data-driven solutions and ML systems at ENRU. Currently focused on optimizing logistics and freight operations using graph algorithms and Machine Learning.
            I graduated from{' '}
            <a 
              href="https://www.gatech.edu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-olive-500 hover:text-olive-400 transition-colors"
            ><strong>Georgia Tech</strong>
              
            </a>{' '}
            with a Master's in Computational Science and Engineering <strong>(MS CSE)</strong>
          </p>
        </section>

        {/* Skills */}
        <section className="mb-32">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Skills & Tools</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-zinc-100 mb-4">Languages</h4>
              <p className="text-zinc-400 font-mono">
                Python • Julia • JavaScript • C++ • Linux
              </p>
            </div>
            <div>
              <h4 className="text-zinc-100 mb-4">Frameworks & Libraries</h4>
              <p className="text-zinc-400 font-mono">
                TensorFlow • PyTorch • Scikit-learn • OpenCV • LangChain
                <br />
                OR-Tools • TigerGraph GSQL • Kafka • Azure Event Hubs 
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-32">
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
                  <li><strong>LLM - </strong> Built a RAG-based GenAI chatbot using LangChain + FAISS for efficient planning</li>
                  <li><strong>Machine Learning - </strong> Unsupervised learning models and Data Science for understanding and planning logistics operations</li>
                  <li><strong>Graph Algorithms - </strong>Developed TigerGraph GSQL for logistic network</li>
                  <li><strong>Optimization - </strong>Built optimizer using OR-Tools for network optimization</li>
                  <li><strong>Real Time Data Ingestion - </strong> Designed and implemented a scalable data pipeline on Azure Event Hubs</li>
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
                  <li>Bypassing FEM Simulation and using Machine Learning to predict stress contours</li>
                  <li>Developed LSTM-RNN models for multivariate time series analysis for mechanical properties prediction</li>
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
                  <li>Deep learning tool using neural networks for predicting mechanical properties of the geodomain</li>
                  <li>Developed an advanced mesh generation tool for Rhino Griddle, leveraging computational geometry techniques</li>
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
                  <li>Simulated spatial variability of elastic modulus using random field theory.</li>
                  <li>Monte Carlo Simulation & FEA: Analyzed effects on vertical stress distribution and settlement.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-32">
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
              <p className="text-zinc-400">
                DocBot was a Streamlit application using Langchain and Ollama to answer questions from uploaded PDFs, enabling efficient information extraction and allowing for local use with Ollama, Llama 3.2, and Ollama embeddings for confidential documents
              </p>
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
                </div>
              </div>
              <p className="text-zinc-400">
                Developed an end-to-end fraud detection pipeline using XGBoost and Random Forest on imbalanced transaction data. Engineered fraud-specific features such as reversal detection and multi-swipe patterns, and addressed class imbalance using SMOTE.
              </p>
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
                    href="#" 
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
              <p className="text-zinc-400">
                Evaluated insights from 7M+ crime dataset mining by using PySpark on AWS and visualized on Tableau dashboard and
                created a Flask app with an XGBoost model predicting crime rate and occurrence time by zip code, contributing to community safety by providing actionable insights for law enforcement interventions in high-risk areas
              </p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section>
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
      <footer className="container mx-auto px-6 py-6 text-center text-zinc-500 font-mono">
        <p></p>
      </footer>
    </div>
  );
};

export default Portfolio;

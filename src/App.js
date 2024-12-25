import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300">
      {/* Navigation */}
      <nav className="fixed w-full bg-zinc-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-olive-500 font-mono">SS.</span>
            <div className="flex space-x-6">
              <a href="https://github.com/ssinghai6" className="hover:text-olive-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/singhai-sanshrit" className="hover:text-olive-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:singhai.sanshrit@live.com" className="hover:text-olive-500 transition-colors">
                <Mail size={20} />
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
            I build data-driven solutions and ML systems at ENRU. Currently focused on optimizing logistics 
            and freight operations using graph algorithms and reinforcement learning.
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-32">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Experience</h3>
          <div className="space-y-12">
            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">2023 — Present</div>
                <div>
                  <h4 className="text-zinc-100">Data Scientist @ ENRU</h4>
                  <p className="text-zinc-400">Logistics Optimization & Analytics</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li>Developed TigerGraph algorithms for freight optimization</li>
                  <li>Achieved 10x performance boost using OR-Tools</li>
                  <li>Implemented network clustering for lane optimization</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-24 text-zinc-500 font-mono">2022 — 2023</div>
                <div>
                  <h4 className="text-zinc-100">Research Assistant @ Georgia Tech</h4>
                  <p className="text-zinc-400">NSF Funded Research</p>
                </div>
              </div>
              <div className="pl-24">
                <ul className="list-disc space-y-2 text-zinc-400">
                  <li>Developed RL models for robotics optimization</li>
                  <li>Enhanced prediction accuracy by 30% using LSTM-RNN</li>
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
                  <a href="https://github.com/ssinghai6/DocBot" className="text-zinc-400 hover:text-olive-500 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://docbot-llm.streamlit.app" className="text-zinc-400 hover:text-olive-500 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <p className="text-zinc-400">
                An intelligent document processing system using RAG architecture and 
                LangChain for context-aware responses.
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
                  <a href="#" className="text-zinc-400 hover:text-olive-500 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-olive-500 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <p className="text-zinc-400">
                Advanced prediction system achieving 92% accuracy in stress response 
                contours using neural networks and autoencoders.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-32">
          <h3 className="text-olive-500 font-mono text-lg mb-8">Skills & Tools</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-zinc-100 mb-4">Languages</h4>
              <p className="text-zinc-400 font-mono">
                Python • Julia • JavaScript
                C++ • Linux
              </p>
            </div>
            <div>
              <h4 className="text-zinc-100 mb-4">Frameworks & Libraries</h4>
              <p className="text-zinc-400 font-mono">
                TensorFlow • PyTorch • Scikit-learn
                LangChain • OpenCV • OR-Tools
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
        <a href="https://www.emi-conference.org/sites/emi-conference.org/2023/files/inline-files/ASCE-EMI2023-Program-web.pdf" className="text-zinc-400 hover:text-olive-500 transition-colors">
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
          <p className="text-zinc-400">Geo-Congress 2023 | Los Angeles,CA - USA</p>
        </div>
        <a href="https://ascelibrary.org/doi/abs/10.1061/9780784484692.014" className="text-zinc-400 hover:text-olive-500 transition-colors">
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
        <a href="https://ascelibrary.org/doi/10.1061/%28ASCE%29GM.1943-5622.0002332" className="text-zinc-400 hover:text-olive-500 transition-colors">
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
        <a href="https://www.researchgate.net/publication/360283011_Some_Observations_on_Numerical_Analysis_of_Lateral_Response_of_Caisson_Foundation" className="text-zinc-400 hover:text-olive-500 transition-colors">
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
          <p className="text-zinc-400">Conference: IACMAG_Symposium2019 · Mar 1, 2019</p>
        </div>
        <a href="https://link.springer.com/chapter/10.1007/978-981-15-0886-8_35" className="text-zinc-400 hover:text-olive-500 transition-colors">
          <ExternalLink size={20} />
        </a>
      </div>
    </div>


    
          
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-6 text-center text-zinc-500 font-mono">
        <p>Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Portfolio;
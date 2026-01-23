import { useState } from 'react';
import Hero from './components/Hero';
import ResumeInput from './components/ResumeInput';
import AnalysisResult from './components/AnalysisResult';
import { Sparkles } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (text) => {
    setIsAnalyzing(true);
    // Mock analysis for now
    setTimeout(() => {
      setAnalysis({
        summary: "Detailed, results-oriented professional with strong technical skills.",
        strengths: ["React.js", "Modern UI/UX", "Project Management"],
        weaknesses: ["Cloud Architecture (AWS/Azure)", "CI/CD Pipelines"],
        improvements: ["Add more quantitative metrics", "Highlight leadership experience"],
        formatting: "Clean, but verify margins on PDF export. Use consistent bullet points.",
        score: 8.5,
        tips: ["Quantify your achievements (e.g., 'Improved performance by 20%')", "Tailor summary to specific job description"]
      });
      setIsAnalyzing(false);
      // smooth scroll to results...
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <nav className="glass-card fixed top-4 left-4 right-4 z-50 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="text-blue-400" />
          <span>ResumeAI</span>
        </div>
        <div>
          <a href="#" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Github</a>
        </div>
      </nav>

      <main className="pt-32 pb-20 container">
        <Hero />
        <ResumeInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        {analysis && <AnalysisResult data={analysis} />}
      </main>
      
      <footer className="text-center text-gray-600 py-8">
        <p>&copy; 2026 ResumeAI. Built with React & Vite.</p>
      </footer>
    </div>
  );
}

export default App;

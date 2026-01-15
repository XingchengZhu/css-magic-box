import { useState } from 'react';
import Glassmorphism from './generators/Glassmorphism';
import Neumorphism from './generators/Neumorphism';
import { Layers, Box, Github } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('glass');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      
      {/* 顶部导航 */}
      <header className="max-w-7xl mx-auto mb-10 flex items-center justify-between py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Box className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CSS Magic Box
            </h1>
            <p className="text-xs text-slate-500 font-mono tracking-wider">GENERATOR_COLLECTION_V1</p>
          </div>
        </div>
        <a 
          href="https://github.com/yourusername/css-magic-box" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all border border-slate-700 hover:border-slate-600 group"
        >
          <Github size={18} className="text-slate-400 group-hover:text-white transition-colors"/>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white">Star on GitHub</span>
        </a>
      </header>
      
      <main className="max-w-7xl mx-auto">
        {/* Tab 切换栏 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('glass')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
              activeTab === 'glass' 
                ? 'bg-slate-800 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-900/10' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <Layers size={18} />
            Glassmorphism
          </button>
          
          <button
            onClick={() => setActiveTab('neumorphism')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
              activeTab === 'neumorphism' 
                ? 'bg-slate-800 border-purple-500/50 text-purple-400 shadow-lg shadow-purple-900/10' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <Box size={18} />
            Neumorphism
          </button>
        </div>

        {/* 内容区域 (添加简单的淡入动画效果) */}
        <div className="animate-in fade-in zoom-in-95 duration-300">
          {activeTab === 'glass' ? <Glassmorphism /> : <Neumorphism />}
        </div>
      </main>

      {/* 简单的页脚 */}
      <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
        <p>Designed for Developers · Open Source under MIT License</p>
      </footer>
    </div>
  );
}

export default App;
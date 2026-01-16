import { useState } from 'react';
import Glassmorphism from './generators/Glassmorphism';
import Neumorphism from './generators/Neumorphism';
import FancyBorder from './generators/FancyBorder';
import ShadowStack from './generators/ShadowStack';
import { Layers, Box, Github, Wand2, Fingerprint, Component } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('glass');

  // 定义 Tab 配置，方便扩展
  const tabs = [
    { id: 'glass', label: 'Glassmorphism', icon: Layers, color: 'cyan' },
    { id: 'neumorphism', label: 'Neumorphism', icon: Box, color: 'blue' },
    { id: 'fancy-border', label: 'Fancy Border', icon: Fingerprint, color: 'pink' },
    { id: 'shadows', label: 'Smooth Shadows', icon: Component, color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* 顶部导航 */}
      <header className="border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Wand2 className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-none">
                CSS Magic Box
              </h1>
            </div>
          </div>
          <a 
            href="https://github.com/xingchengzhu/css-magic-box" 
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all border border-slate-700 hover:border-slate-600 group"
          >
            <Github size={16} className="text-slate-400 group-hover:text-white transition-colors"/>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white hidden sm:block">Star on GitHub</span>
          </a>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col">
        
        {/* Tab 切换器 (响应式优化：小屏可横向滚动) */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            // 动态生成颜色类名 (注意：Tailwind v4 支持动态值，但稳妥起见这里用模板字符串配合 safelist 或这种简单逻辑)
            // 这里为了简单，我们硬编码几种颜色的逻辑
            let activeClass = '';
            if (tab.color === 'cyan') activeClass = 'bg-slate-800 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-900/20';
            if (tab.color === 'blue') activeClass = 'bg-slate-800 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-900/20';
            if (tab.color === 'pink') activeClass = 'bg-slate-800 border-pink-500/50 text-pink-400 shadow-lg shadow-pink-900/20';
            if (tab.color === 'indigo') activeClass = 'bg-slate-800 border-indigo-500/50 text-indigo-400 shadow-lg shadow-indigo-900/20';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border whitespace-nowrap ${
                  isActive 
                    ? activeClass 
                    : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 内容区域 */}
        <div className="flex-1">
          {activeTab === 'glass' && <Glassmorphism />}
          {activeTab === 'neumorphism' && <Neumorphism />}
          {activeTab === 'fancy-border' && <FancyBorder />}
          {activeTab === 'shadows' && <ShadowStack />}
        </div>

      </main>

      <footer className="py-6 border-t border-slate-800/50 text-center text-slate-600 text-sm">
        <p>Designed for Developers · Open Source under MIT License</p>
      </footer>
    </div>
  );
}

export default App;
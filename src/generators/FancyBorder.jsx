import { useState } from 'react';
import Slider from '../components/Slider';
import { Copy, Check, Fingerprint, Shuffle } from 'lucide-react';

export default function FancyBorder() {
  // 8个控制点：上、右、下、左 的 X轴和Y轴偏移
  const [tl, setTl] = useState(30); // Top-Left
  const [tr, setTr] = useState(70); // Top-Right
  const [br, setBr] = useState(70); // Bottom-Right
  const [bl, setBl] = useState(30); // Bottom-Left
  
  const [tl2, setTl2] = useState(30); 
  const [tr2, setTr2] = useState(30); 
  const [br2, setBr2] = useState(70); 
  const [bl2, setBl2] = useState(70);

  const [copied, setCopied] = useState(false);

  // CSS 语法: horizontal / vertical
  // border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%
  const borderRadius = `${tl}% ${tr}% ${br}% ${bl}% / ${tl2}% ${tr2}% ${br2}% ${bl2}%`;
  
  const cssCode = `border-radius: ${borderRadius};
background: #3b82f6; /* Example Color */`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadius};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomize = () => {
    const r = () => Math.floor(Math.random() * 60) + 20; // 20-80
    setTl(r()); setTr(100-tl); setBr(r()); setBl(100-br); // 简单随机
    setTl2(r()); setTr2(r()); setBr2(r()); setBl2(r());
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 🟢 左侧控制面板 */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-3xl shadow-xl h-fit border border-slate-100 overflow-y-auto max-h-[600px]">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Fingerprint size={20} className="text-pink-500"/>
            Fancy Border
            </h2>
            <button onClick={randomize} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title="Randomize">
                <Shuffle size={16} />
            </button>
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Horizontal Axis</h3>
                <Slider label="Top Left" value={tl} min={0} max={100} onChange={setTl} />
                <Slider label="Top Right" value={tr} min={0} max={100} onChange={setTr} />
                <Slider label="Bottom Right" value={br} min={0} max={100} onChange={setBr} />
                <Slider label="Bottom Left" value={bl} min={0} max={100} onChange={setBl} />
            </div>
            <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vertical Axis</h3>
                <Slider label="Left Top" value={tl2} min={0} max={100} onChange={setTl2} />
                <Slider label="Right Top" value={tr2} min={0} max={100} onChange={setTr2} />
                <Slider label="Right Bottom" value={br2} min={0} max={100} onChange={setBr2} />
                <Slider label="Left Bottom" value={bl2} min={0} max={100} onChange={setBl2} />
            </div>
        </div>
      </div>

      {/* 🔵 右侧预览区域 */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 rounded-3xl bg-slate-900 flex items-center justify-center min-h-[400px] relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(45deg, #1e293b 25%, transparent 25%, transparent 75%, #1e293b 75%, #1e293b), linear-gradient(45deg, #1e293b 25%, transparent 25%, transparent 75%, #1e293b 75%, #1e293b)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>
          
          {/* Blob */}
          <div 
            className="w-64 h-64 bg-gradient-to-br from-pink-500 to-orange-400 shadow-[0_20px_50px_-12px_rgba(236,72,153,0.5)] transition-all duration-300 flex items-center justify-center text-white font-bold text-xl"
            style={{ borderRadius: borderRadius }}
          >
            Blob
          </div>
        </div>

        {/* 代码展示 */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative group shadow-xl">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
          >
            {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
          </button>
          <pre className="text-sm font-mono text-pink-300 overflow-x-auto leading-relaxed p-2">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
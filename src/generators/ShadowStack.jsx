import { useState } from 'react';
import Slider from '../components/Slider';
import { Copy, Check, Layers } from 'lucide-react';

export default function ShadowStack() {
  const [layers, setLayers] = useState(6);
  const [alpha, setAlpha] = useState(0.07);
  const [offsetY, setOffsetY] = useState(100);
  const [blur, setBlur] = useState(80);
  const [spread, setSpread] = useState(0);
  const [copied, setCopied] = useState(false);

  // 核心算法：生成分层阴影
  const generateShadows = () => {
    const shadowArray = [];
    for (let i = 1; i <= layers; i++) {
      // 每一层的参数呈指数级或线性变化，以模拟真实光照衰减
      const currentY = (offsetY * (i / layers)).toFixed(1);
      const currentBlur = (blur * (i / layers)).toFixed(1);
      const currentAlpha = (alpha / i).toFixed(3); // 越外层越淡
      
      shadowArray.push(`0px ${currentY}px ${currentBlur}px ${spread}px rgba(0, 0, 0, ${currentAlpha})`);
    }
    return shadowArray.join(',\n  ');
  };

  const shadowCss = generateShadows();
  const cssCode = `box-shadow: \n  ${shadowCss};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`box-shadow: ${generateShadows()};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="w-full lg:w-80 bg-white p-6 rounded-3xl shadow-xl h-fit border border-slate-100">
        <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <Layers size={20} className="text-indigo-500"/>
          Smooth Shadows
        </h2>
        
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Automatically generates stacked shadows for a hyper-realistic depth effect (like Vercel/Stripe style).
        </p>

        <Slider label="Layers (层数)" value={layers} min={3} max={10} step={1} onChange={setLayers} />
        <Slider label="Final Alpha (浓度)" value={alpha} min={0.01} max={0.5} step={0.01} onChange={setAlpha} />
        <Slider label="Final Offset Y (距离)" value={offsetY} min={0} max={200} onChange={setOffsetY} />
        <Slider label="Final Blur (模糊)" value={blur} min={0} max={300} onChange={setBlur} />
        <Slider label="Spread (扩展)" value={spread} min={-50} max={50} onChange={setSpread} />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 rounded-3xl bg-slate-100 flex items-center justify-center min-h-[400px]">
          
          <div 
            className="w-40 h-40 bg-white rounded-2xl transition-all duration-300 flex items-center justify-center text-slate-400 font-medium"
            style={{ boxShadow: generateShadows() }}
          >
            Item
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative group shadow-xl">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
          >
            {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
          </button>
          <pre className="text-sm font-mono text-indigo-300 overflow-x-auto leading-relaxed p-2 whitespace-pre">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
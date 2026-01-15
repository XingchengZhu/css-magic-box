import { useState } from 'react';
import Slider from '../components/Slider';
import { Copy, Check } from 'lucide-react';

export default function Glassmorphism() {
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(0.25);
  const [saturation, setSaturation] = useState(180);
  const [copied, setCopied] = useState(false);

  // 生成 CSS 代码
  const cssCode = `background: rgba(255, 255, 255, ${transparency});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, 0.18);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* 控制面板 */}
      <div className="w-full md:w-80 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl h-fit">
        <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Glassmorphism
        </h2>
        <Slider label="Blur (模糊度)" value={blur} min={0} max={40} onChange={setBlur} />
        <Slider label="Transparency (透明度)" value={transparency} min={0} max={1} step={0.01} onChange={setTransparency} />
        <Slider label="Saturation (背景饱和度)" value={saturation} min={100} max={200} onChange={setSaturation} />
      </div>

      {/* 预览区域 */}
      <div className="flex-1 flex flex-col gap-6">
        {/* 视觉预览 */}
        <div 
          className="flex-1 rounded-2xl flex items-center justify-center relative overflow-hidden min-h-[300px]"
          style={{
            // 使用随机 Unsplash 图片作为背景
            backgroundImage: `url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2400&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `saturate(${saturation}%)` // 允许用户调整背景饱和度来测试效果
          }}
        >
          {/* 生成的卡片 */}
          <div 
            className="w-64 h-40 rounded-xl text-white flex items-center justify-center font-bold text-lg shadow-2xl"
            style={{
              background: `rgba(255, 255, 255, ${transparency})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}
          >
            <span>✨ Magic Glass</span>
          </div>
        </div>

        {/* 代码展示 */}
        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 relative group">
          <button 
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16} className="text-gray-400"/>}
          </button>
          <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
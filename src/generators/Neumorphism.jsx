import { useState } from 'react';
import Slider from '../components/Slider';
import { Copy, Check } from 'lucide-react';

export default function Neumorphism() {
  const [size, setSize] = useState(200);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [blur, setBlur] = useState(60);
  const [intensity, setIntensity] = useState(0.15);
  const [color, setColor] = useState('#e0e5ec'); // 经典的新拟态灰白底色
  const [shape, setShape] = useState('flat'); // flat, pressed
  const [copied, setCopied] = useState(false);

  // 辅助函数：计算颜色的亮暗变体 (简单版)
  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  const darkColor = adjustColor(color, -Math.floor(intensity * 255));
  const lightColor = adjustColor(color, Math.floor(intensity * 255));

  // 生成 CSS
  const background = color;
  const boxShadow = shape === 'pressed'
    ? `inset ${distance}px ${distance}px ${blur}px ${darkColor}, inset -${distance}px -${distance}px ${blur}px ${lightColor}`
    : `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`;

  const cssCode = `background: ${background};
border-radius: ${radius}px;
box-shadow: ${boxShadow};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full text-slate-700">
      {/* 控制面板 */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-3xl shadow-xl h-fit border border-slate-100">
        <h2 className="text-xl font-bold mb-6 text-slate-800">🔮 Neumorphism</h2>
        
        <div className="mb-6">
           <label className="text-sm text-slate-500 block mb-2">Base Color</label>
           <div className="flex items-center gap-3">
             <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded border-0" />
             <span className="font-mono text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">{color}</span>
           </div>
        </div>

        <div className="mb-6 flex gap-2 bg-slate-100 p-1 rounded-lg">
           <button 
             onClick={() => setShape('flat')}
             className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${shape === 'flat' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Flat
           </button>
           <button 
             onClick={() => setShape('pressed')}
             className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${shape === 'pressed' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Pressed
           </button>
        </div>

        <Slider label="Size" value={size} min={50} max={400} onChange={setSize} />
        <Slider label="Radius" value={radius} min={0} max={150} onChange={setRadius} />
        <Slider label="Distance" value={distance} min={5} max={50} onChange={setDistance} />
        <Slider label="Blur" value={blur} min={0} max={100} onChange={setBlur} />
      </div>

      {/* 预览区域 */}
      <div className="flex-1 flex flex-col gap-6">
        {/* 视觉预览 - 背景色必须跟随用户选择的颜色 */}
        <div 
          className="flex-1 rounded-3xl flex items-center justify-center min-h-[400px] transition-colors duration-300 relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          
          <div 
            className="transition-all duration-300 flex items-center justify-center text-slate-400 font-medium"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: background,
              borderRadius: `${radius}px`,
              boxShadow: boxShadow
            }}
          >
            {shape === 'pressed' ? 'Pressed' : 'Flat'}
          </div>
        </div>

        {/* 代码展示 */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative group shadow-2xl">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            {copied ? <Check size={18} className="text-green-400"/> : <Copy size={18}/>}
          </button>
          <pre className="text-sm font-mono text-blue-300 overflow-x-auto leading-relaxed">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
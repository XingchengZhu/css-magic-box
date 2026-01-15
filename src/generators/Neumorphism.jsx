import { useState } from 'react';
import Slider from '../components/Slider';
import { Copy, Check, MousePointer2 } from 'lucide-react';

export default function Neumorphism() {
  const [size, setSize] = useState(240);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [blur, setBlur] = useState(60);
  const [intensity, setIntensity] = useState(0.15);
  const [color, setColor] = useState('#e0e5ec'); // 经典的新拟态灰白底色
  const [shape, setShape] = useState('flat'); // flat, pressed, concave, convex
  const [copied, setCopied] = useState(false);

  // 辅助函数：计算颜色的亮暗变体
  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  const darkColor = adjustColor(color, -Math.floor(intensity * 255));
  const lightColor = adjustColor(color, Math.floor(intensity * 255));

  // 生成 box-shadow
  let boxShadow = '';
  switch (shape) {
    case 'pressed':
      boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkColor}, inset -${distance}px -${distance}px ${blur}px ${lightColor}`;
      break;
    case 'concave':
      boxShadow = `linear-gradient(145deg, ${darkColor}, ${lightColor})`;
      break; // 简化处理，凹面通常配合 gradient
    case 'convex':
      boxShadow = `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`;
      // Convex 实际上和 Flat 类似但加渐变，这里我们让 Flat 纯色，Convex 加渐变
      break;
    case 'flat':
    default:
      boxShadow = `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`;
      break;
  }
  
  // 如果是 convex/concave，还需要 background gradient
  let background = color;
  if (shape === 'concave') {
      background = `linear-gradient(145deg, ${darkColor}, ${lightColor})`;
      // 凹面实际上需要外部阴影 + 内部渐变或者是反过来的，为了简单展示：
      boxShadow =  `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`;
      background = `linear-gradient(145deg, ${adjustColor(color, -20)}, ${adjustColor(color, 20)})`;
  } else if (shape === 'convex') {
      background = `linear-gradient(145deg, ${adjustColor(color, 20)}, ${adjustColor(color, -20)})`;
  }

  const cssCode = `border-radius: ${radius}px;
background: ${background};
box-shadow: ${boxShadow};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full text-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🟢 左侧控制面板 */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-3xl shadow-2xl shadow-black/5 h-fit border border-slate-100">
        <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <MousePointer2 size={20} className="text-blue-500"/>
          Neumorphism
        </h2>
        
        {/* 颜色选择器 */}
        <div className="mb-6">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Base Color</label>
           <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
             <input 
               type="color" 
               value={color} 
               onChange={(e) => setColor(e.target.value)} 
               className="h-8 w-8 cursor-pointer rounded-lg border-0 p-0 bg-transparent" 
             />
             <span className="font-mono text-sm text-slate-600 uppercase">{color}</span>
           </div>
        </div>

        {/* 形状切换 */}
        <div className="mb-8 grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
           {['flat', 'pressed', 'convex', 'concave'].map((s) => (
             <button 
               key={s}
               onClick={() => setShape(s)}
               className={`py-2 text-xs font-bold uppercase rounded-lg transition-all ${shape === s ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {s}
             </button>
           ))}
        </div>

        <Slider label="Size" value={size} min={100} max={400} onChange={setSize} />
        <Slider label="Radius" value={radius} min={0} max={150} onChange={setRadius} />
        <Slider label="Distance" value={distance} min={5} max={50} onChange={setDistance} />
        <Slider label="Intensity" value={intensity} min={0.01} max={0.6} step={0.01} onChange={setIntensity} />
        <Slider label="Blur" value={blur} min={0} max={100} onChange={setBlur} />
      </div>

      {/* 🔵 右侧预览区域 */}
      <div className="flex-1 flex flex-col gap-6">
        {/* 视觉预览 - 背景色必须跟随用户选择的颜色 */}
        <div 
          className="flex-1 rounded-3xl flex items-center justify-center min-h-[400px] transition-colors duration-300 relative border border-slate-200/50"
          style={{ backgroundColor: color }}
        >
          {/* 网格背景装饰 */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '24px 24px'}}>
          </div>
          
          <div 
            className="transition-all duration-300 flex items-center justify-center text-slate-400/50 font-bold text-2xl"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: background,
              borderRadius: `${radius}px`,
              boxShadow: boxShadow
            }}
          >
            Soft UI
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative group shadow-xl">
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="text-xs text-slate-500 py-2">CSS</span>
            <button 
              onClick={handleCopy}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            >
              {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
            </button>
          </div>
          <pre className="text-sm font-mono text-blue-300 overflow-x-auto leading-relaxed p-2">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
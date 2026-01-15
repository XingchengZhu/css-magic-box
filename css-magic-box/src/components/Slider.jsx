export default function Slider({ label, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-sm font-mono text-cyan-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
      />
    </div>
  );
}
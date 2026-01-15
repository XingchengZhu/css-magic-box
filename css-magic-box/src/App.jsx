import Glassmorphism from './generators/Glassmorphism';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🎨 <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">CSS Magic Box</span>
        </h1>
        <a 
          href="https://github.com/xingchengzhu/css-magic-box" 
          target="_blank" 
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          GitHub
        </a>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <Glassmorphism />
      </main>
    </div>
  );
}

export default App;
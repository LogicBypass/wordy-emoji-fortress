
import PasswordGenerator from "@/components/password-generator/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-slate-800 to-slate-950 p-4 md:p-8">
      <header className="container mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">MemoPass</h1>
        <p className="text-slate-300 max-w-md mx-auto">
          Generate strong, memorable passwords using a 4-step algorithmic pipeline
        </p>
        <div className="flex justify-center mt-3 space-x-1">
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded">Entropy Engine</span>
          <span className="text-slate-500">→</span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Story Builder</span>
          <span className="text-slate-500">→</span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">Leet Transformer</span>
          <span className="text-slate-500">→</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">Strength Evaluator</span>
        </div>
      </header>
      
      <main className="container mx-auto flex-1">
        <PasswordGenerator />
      </main>
      
      <footer className="container mx-auto mt-12 text-center text-sm text-slate-500">
        <p>All password generation is done locally in your browser using a sequential 4-algorithm approach. No data is sent to any server.</p>
      </footer>
    </div>
  );
};

export default Index;

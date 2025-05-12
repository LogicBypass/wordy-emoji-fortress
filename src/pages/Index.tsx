
import PasswordGenerator from "@/components/password-generator/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-slate-800 to-slate-950 p-4 md:p-8">
      <header className="container mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">MemoPass</h1>
        <p className="text-slate-300 max-w-md mx-auto">
          Generate strong, memorable passwords using narrative mnemonics
        </p>
      </header>
      
      <main className="container mx-auto flex-1">
        <PasswordGenerator />
      </main>
      
      <footer className="container mx-auto mt-12 text-center text-sm text-slate-500">
        <p>All password generation is done locally in your browser. No data is sent to any server.</p>
      </footer>
    </div>
  );
};

export default Index;

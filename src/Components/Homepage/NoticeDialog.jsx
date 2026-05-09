export default function NoticeDialog() {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-950 border-2 border-cyan-400 rounded-lg p-6 max-w-md shadow-2xl shadow-cyan-500/25 mx-auto md:mx-0 relative overflow-hidden">
      <div className="text-center mb-4">
        <div className="text-cyan-400 text-sm">
          ◊═══════════════════════════════════◊
        </div>
        <h2 className="text-white text-2xl font-bold">Notice</h2>

        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-1"></div>
      </div>
      <div className="text-center mb-6">
        <p className="text-white text-lg mb-2">
          Do you dare to become a Player ?
        </p>
        <p className="text-orange-500 text-xl font-bold">2 seconds.</p>
        <p className="text-white text-lg mt-3">Would you like to Play ?</p>
      </div>
      <div className="flex gap-4 justify-center">
        <button className="relative min-w-[140px] bg-transparent text-cyan-400 px-8 py-3 text-lg font-semibold hover:text-yellow-400 transition-colors hover:cursor-pointer group text-center">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <span className="relative z-10 w-full block text-center">
            Android
          </span>
        </button>

        <button className="relative min-w-[140px] bg-transparent text-cyan-400 px-8 py-3 text-lg font-semibold hover:text-yellow-400 transition-colors hover:cursor-pointer group text-center">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 group-hover:border-yellow-400"></div>
          <span className="relative z-10 w-full block text-center">IOS</span>
        </button>
      </div>
      <div className="text-center mt-6">
        <div className="text-cyan-400 text-sm">
          ◊═══════════════════════════════════◊
        </div>
      </div>
    </div>
  );
}

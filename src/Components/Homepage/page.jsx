import { Cinzel_Decorative } from "next/font/google";
import NoticeDialog from "./NoticeDialog";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Homepage() {
  return (
    <main className="px-6 min-h-screen overflow-x-hidden flex items-center">
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="flex flex-col space-y-10 max-w-lg md:max-w-none">
          <h1
            className={`text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] ${cinzel.className}`}
          >
            Solo Leveling: Arise
          </h1>
          <NoticeDialog />
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src="https://resources.vortexgaming.io/upload/post/2026/05/10/4a641924d08d47e7b531623c40ff1ad0.webp"
            alt="Sung Jinwoo"
            className="object-contain w-auto max-w-full scale-90"
          />
        </div>
      </section>
    </main>
  );
}

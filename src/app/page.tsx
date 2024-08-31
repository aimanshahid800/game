import Image from "next/image";
import Board from "@/components/Board";

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video src="/V3.mp4" autoPlay loop muted className="absolute top-0 left-0 h-full w-full object-cover"></video>
      <div className="flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-md bg-opacity-5 bg-black p-4 rounded-lg">
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-cyan-300">
            <h1 className="font-mono font-bold text-4xl text-center p-10 ">Tic Tac Toe</h1>
            <Board />
          </div>
        </div>
      </div>
    </div>
  );
}

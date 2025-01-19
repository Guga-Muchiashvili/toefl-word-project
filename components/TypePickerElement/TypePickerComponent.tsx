"use client";
import { useRouter } from "next/navigation";

const TypePickerComponent = () => {
  const router = useRouter();
  return (
    <div className="w-full flex-col h-screen gap-2 flex items-center justify-center px-6 p-2 font-bebas text-6xl text-purple-600">
      <h1>Choose Type</h1>
      <div className="w-1/2 h-fit p-3 flex flex-wrap gap-4">
        <div
          className="w-72 h-fit py-2 text-center cursor-pointer hover:scale-105 duration-500 shadow-lg bg-purple-600 text-white rounded-xl"
          onClick={() => router.push("/Words")}
        >
          Words
        </div>
        <div
          className="w-72 h-fit py-2 text-center cursor-pointer hover:scale-105 duration-500 shadow-lg bg-purple-600 text-white rounded-xl"
          onClick={() => router.push("/Matching")}
        >
          Matching
        </div>
        <div
          className="w-72 h-fit py-2 text-center cursor-pointer hover:scale-105 duration-500 shadow-lg bg-purple-600 text-white rounded-xl"
          onClick={() => router.push("/Quiz")}
        >
          Test
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          className="text-purple-600 shadow-xl border-[1px] border-purple-600 bg-white rounded-2xl text-3xl px-12 py-2"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TypePickerComponent;

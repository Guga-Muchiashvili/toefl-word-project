"use client";
import { data } from "@/data";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const LessonPickerComponent = () => {
  const [Lessons, setLessons] = useState<string[]>([]);
  const route = useRouter();

  useEffect(() => {
    const savedLessons = sessionStorage.getItem("checkedLessons");
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons));
    }
  }, []);

  const saveLessonsToStorage = (lessons: string[]) => {
    sessionStorage.setItem("checkedLessons", JSON.stringify(lessons));
  };

  const handleLessonClick = (lessonName: string) => {
    setLessons((prev) => {
      const updatedLessons = prev.includes(lessonName)
        ? prev.filter((lesson) => lesson !== lessonName)
        : [...prev, lessonName];

      saveLessonsToStorage(updatedLessons);
      return updatedLessons;
    });
  };

  const handleToggleAll = (isChecked: boolean) => {
    const updatedLessons = isChecked ? data.map((item) => item.lessonName) : [];
    setLessons(updatedLessons);
    saveLessonsToStorage(updatedLessons);
  };

  const handleContinue = () => {
    if (Lessons.length < 1) return false;
    saveLessonsToStorage(Lessons);
    route.push("/StartQuiz");
  };

  return (
    <div className="flex">
      <div className="w-[20vw] h-screen bg-purple-600 flex flex-col font-bebas text-6xl items-center justify-center gap-10 text-white">
        <h1 className="cursor-pointer hover:text-purple-300 drop-shadow-3xl hover:scale-105 duration-500 text-shadow-lg">
          Words
        </h1>
        <h1 className="cursor-pointer hover:text-purple-300 hover:scale-105 duration-500">
          Grammer
        </h1>
        <h1 className="cursor-pointer hover:text-purple-300 hover:scale-105 duration-500">
          Listening
        </h1>
        <h1 className="cursor-pointer hover:text-purple-300 hover:scale-105 duration-500">
          Reading
        </h1>
      </div>
      <div className="w-[80vw] flex-col gap-2 flex items-end justify-center px-16 p-2 font-bebas text-6xl text-purple-600">
        <h1 className="text-right w-full">Choose Word Lessons</h1>
        <div className="flex items-center mt-5 gap-3 w-full justify-end">
          <label htmlFor="selectAll" className="text-2xl text-purple-600">
            Select All
          </label>
          <div
            className={`w-8 h-8 cursor-pointer rounded-full text-2xl flex items-center justify-center transition-all ${
              Lessons.length === data.length
                ? "bg-purple-600"
                : "bg-white border-black border-[1px]"
            }`}
            onClick={() => handleToggleAll(Lessons.length !== data.length)}
            role="checkbox"
            aria-checked={Lessons.length === data.length}
            tabIndex={0}
            aria-labelledby="selectAll"
          >
            {Lessons.length === data.length ? (
              <span className="text-white">✔</span>
            ) : null}
          </div>
        </div>
        <div className="w-3/4 h-fit p-3 justify-end flex flex-wrap gap-4">
          {data.map((item) => (
            <div
              className={`text-xl hover:scale-105 duration-300 w-28 h-16 ease-out px-3 py-1 flex items-center justify-center text-center cursor-pointer bg-purple-600 rounded-xl ${
                Lessons.includes(item.lessonName)
                  ? "text-purple-600 border-purple-600 border-[1px] shadow-md shadow-purple-600 bg-white"
                  : "text-white"
              }`}
              key={item.lessonName}
              onClick={() => handleLessonClick(item.lessonName)}
            >
              {item.lessonName}
            </div>
          ))}
        </div>
        <button
          className="text-purple-600 shadow-xl border-[1px] border-purple-600 bg-white rounded-2xl text-3xl mt-8 px-12 py-2"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LessonPickerComponent;

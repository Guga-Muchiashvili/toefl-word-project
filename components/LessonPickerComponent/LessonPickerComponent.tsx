"use client";
import { data } from "@/data";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const LessonPickerComponent = () => {
  const [Lessons, setLessons] = useState<string[]>([]);
  const route = useRouter();

  console.log(Lessons);

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
    <div className="w-full flex-col gap-2 flex items-center justify-center px-6 p-2 font-bebas text-6xl text-purple-600">
      <h1>Choose Lessons</h1>
      <div className="flex items-center px-8 mt-5 gap-3 w-1/2 justify-end">
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
      <div className="w-1/2 h-fit p-3 flex flex-wrap gap-4">
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
        className="text-purple-600 shadow-xl border-[1px] border-purple-600 bg-white rounded-2xl text-3xl px-12 py-2"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default LessonPickerComponent;

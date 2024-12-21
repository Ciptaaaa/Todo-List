import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todoitems = ({
  text,
  id,
  isComplete,
  deleteTodo,
  toggle,
  timestamp,
  category,
}) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-7" />
        <span
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </span>
        <div className="text-sm text-gray-500 mt-1 ml-2">
          Priority:{" "}
          <span className={`font-bold ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
        <div className="text-sm text-gray-500 ml-4">
          Created at: {timestamp}
        </div>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt=""
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

// Fungsi untuk mendapatkan warna kategori
const getCategoryColor = (category) => {
  switch (category) {
    case "High":
      return "text-red-500"; // Kelas Tailwind untuk warna merah
    case "Medium":
      return "text-yellow-500"; // Kelas Tailwind untuk warna kuning
    case "Low":
      return "text-green-500"; // Kelas Tailwind untuk warna hijau
    default:
      return "text-gray-500"; // Default jika tidak ada kategori
  }
};

export default Todoitems;

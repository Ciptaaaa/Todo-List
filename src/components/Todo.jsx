import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";

const Todo = () => {
  const user = {
    name: "John Doe",
    position: "FE Hari Senin.com",
  };
  //untuk menyimpan todo list agar tidak menghilang saat website di refresh maupun di close
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();
  const categoryRef = useRef();

  //menambahkan data todo list
  const add = () => {
    const inputText = inputRef.current.value.trim();
    const selectedCategory = categoryRef.current.value;
    if (inputText === "" || selectedCategory === "") {
      return null;
    }

    //membuat daftar baru todo list
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      category: selectedCategory,
      timestamp: new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Gunakan format 24 jam
      }),
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
    categoryRef.current.value = "";
  };

  //menghapus todolist
  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  //untuk checklist/unchecklist todo
  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    //menyimpan data di local storage
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 max-w-full flex flex-col p-4 sm:p-6 md:p-8 min-h-screen rounded-xl">
      {/* Title */}
      <div className="flex items-center mt-4 sm:mt-6 gap-2 justify-between ">
        <div className="flex items-center gap-2 flex-grow">
          <img className="w-8" src={todo_icon} alt="" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold items-start ">
            To-Do-List
          </h1>
        </div>

        <div className="mt-3 text-sm text-gray-700 ">
          <p className="flex justify-between items-center">
            <span className="mr-4">
              <strong>Owner:</strong> {user.name}
            </span>
            <span className="ml-auto">
              <strong>Position:</strong> {user.position}
            </span>
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="flex relative flex-col sm:flex-row items-center gap-2 my-6 sm:my-8 bg-gray-200 rounded-xl ">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 sm:h-14 px-4 sm:pl-6 pr-2 placeholder:text-slate-600 mb-2 sm:mb-0 w-full sm:w-auto "
          type="text"
          placeholder="Add your task"
        />
        <select
          ref={categoryRef}
          className="bg-gray-200 border-0  h-12 sm:h-14 px-4 outline-none text-slate-600 mb-2 sm:mb-0 w-full sm:w-auto"
          defaultValue=""
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={add}
          className="border-none  bg-orange-600 w-full sm:w-32 h-12 sm:h-14 text-white text-sm sm:text-lg font-medium cursor-pointer sm:mt-0 flex justify-center items-center rounded-xl"
        >
          Add task!
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todoList.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              timestamp={item.timestamp}
              category={item.category}
              name={user.name}
              position={user.position}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;

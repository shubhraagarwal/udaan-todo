"use client";

import Image from "next/image";
import { useState } from "react";
import Check from "../../public/checkmark.png";
import Delete from "../../public/delete.png";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [inputTodo, setInputTodo] = useState("");
  const [todo, setTodo] = useState<[]>([]);
  const [completedTask, setCompletedTask] = useState([]);

  function ondrop(task) {
    setCompletedTask([...completedTask, task]);
    setTodo(todo.filter((item) => item !== task));
  }
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#0D0714]">
      <div className="flex bg-[#1D1825] flex-col  min-h-[80vh] w-1/2 h-full rounded-lg p-8 gap-10">
        <div className="flex gap-4 items-center w-full">
          <input
            name="Add"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            className="text-black bg-transparent border-2 border-[#9e78cf] px-2 py-1 rounded-lg focus-visible::outline-[#9e78cf] w-full"
            placeholder="Add a new task"
          />
          <button
            className="px-3 py-1 rounded-lg bg-[#9E78CF]"
            onClick={() => {
              setTodo([...todo, inputTodo]);
              setInputTodo("");
            }}
          >
            <p className="text-lg">+</p>
          </button>
        </div>
        <DragDropContext>
          <div className="flex w-full flex-col  gap-5">
            <p>Tasks to do - {todo.length}</p>
            <ul className="flex flex-col gap-4">
              {todo.map((task, index) => {
                return (
                  <Draggable
                    key={index}
                    type="todo"
                    data={task}
                  >
                    <li className="flex items-center p-2 justify-between px-4 py-4 bg-[#15101C] w-full rounded-lg text-[#9e78cf]">
                      {" "}
                      {task}{" "}
                      <div className="flex items-center gap-4">
                        <Image
                          src={Check}
                          alt="checkmark"
                          width={12}
                          height={12}
                          className="hover:cursor-pointer"
                          onClick={() => {
                            setCompletedTask([...completedTask, task]);
                            setTodo(todo.filter((item) => item !== task));
                          }}
                        />
                        <Image
                          src={Delete}
                          alt="delete"
                          width={12}
                          className="hover:cursor-pointer"
                          height={12}
                          onClick={() => {
                            setTodo(todo.filter((item) => item !== task));
                          }}
                        />
                      </div>
                    </li>
                  </Draggable>
                );
              })}
            </ul>
          </div>
          <div className="flex w-full flex-col gap-5">
            <p>Done - {completedTask.length}</p>
            <Droppable
              types={["todo"]}
              onDrop={ondrop}
            >
              <ul className="flex flex-col gap-4">
                {completedTask.map((task, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center p-2 justify-between px-4 py-4 bg-[#15101C] w-full rounded-lg text-[#78cfb0] line-through"
                    >
                      {" "}
                      {task}
                    </li>
                  );
                })}
              </ul>
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

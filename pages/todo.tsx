import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
}

const Todo = () => {
  const [input, setInput] = useState<any | null>("");
  const [task, setTask] = useState<Task[]>([]);
  const [counter, setCounter] = useState(1); // Counter for generating unique IDs
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [display, setDisplay] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value); // taking input from the input bar
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // preventing the window from reloading
    if (editTaskId !== null) {
      // update existing tasks
      const updatedTasks = task.map((tasks) =>
        tasks.id === editTaskId ? { ...task, text: input } : tasks
      );
      setTask(updatedTasks as Task[]);
      setEditTaskId(null);
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now(),
        text: input,
      };
      setTask((prevTasks) => [...prevTasks, newTask]); // updating the tasks in the task array along the previous values
    }
    setInput(""); // refreshing the input bar
  };

  const handleEdit = (task: Task) => {
    setInput(task.text);
    setEditTaskId(task.id);
  };

  const handleDelete = (taskId: number) => {
    const updatedTasks = task.filter((t) => t.id !== taskId); // making a new array which does not contain the id selected to delete
    setTask(updatedTasks as Task[]);
  };

  const Output = () => {
    return task.map((newTask) => {
      return (
        <div
          key={newTask.id}
          className="relative rounded-lg border-b bg-gray-50 hover:bg-gray-100 border-gray-200"
        >
          <div className="rounded-lg cursor-pointer ">
            <li className="w-full block justify-start  rounded-lg dark:border-gray-600">
              <div className="flex overflow-auto  align-middle items-center pl-3">
                <label className="w-full flex py-3 ml-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-500 dark:text-gray-300">
                  {newTask.text}violet
                </label>
              </div>
            </li>
          </div>
          {/* Edit Button */}
          <div className="flex justify-center absolute right-14 sm:right-16 bottom-1.5 md:bottom-2 lg:bottom-2.5 ">
            <button
              type="button"
              className="border rounded-lg transition-transform ease-in-out duration-200 hover:scale-105 bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 w-full flex justify-center align-middle p-3 sm:p-3.5 text-sm font-medium"
              onClick={() => handleEdit(newTask)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </button>
          </div>
          {/* Delete Button */}
          <div className="flex justify-center absolute right-2.5 bottom-1.5 md:bottom-2 lg:bottom-2.5 ">
            <button
              type="button"
              className="border rounded-lg transition-transform ease-in-out duration-200 hover:scale-105 bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 w-full flex justify-center align-middle p-3 sm:p-3.5 text-sm font-medium"
              onClick={() => handleDelete(newTask.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="">
      <div className="m-5">
        <div className="font-black text-gray-700 font-sans text-4xl sm:text-5xl md:text-6xl justify-center flex my-5 mx-10 uppercase mb-10">
          To-Do List
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="my-5 mx-5 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-80 2xl:mx-[400px] 3xl:mx-[550px]"
          >
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Add tasks to do
            </label>
            <div className="relative">
              <input
                type="text"
                className="block w-full p-4 text-sm hover:bg-gray-100 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add tasks to do"
                onChange={handleChange}
                value={input}
                required
              />
              <button
                type="submit"
                className="text-white absolute transition-transform ease-in-out duration-200 hover:scale-105 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {editTaskId !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div
          key="task-list"
          className="my-5 mx-5 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-80 2xl:mx-[400px] text-center flex justify-center"
        >
          <ul className="w-[700px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <div
              className={display ? "hidden" : " text-gray-600  justify-left"}
            >
              {Output()}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;

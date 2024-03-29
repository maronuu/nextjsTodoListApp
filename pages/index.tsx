import { useEffect, useState } from "react"

import NextNProgress from 'nextjs-progressbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


type TaskStatus = "wip" | "done";

interface Task {
  uuid: string,
  name: string,
  description: string,
  status: TaskStatus,
}


const TodoListPage = () => {

  const [inputText, setInputText] = useState("")
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("taskList")
    if (saved) {
      const parsed = JSON.parse(saved)
      setTaskList(parsed)
    }
  }, []);

  function registerNewTask(name: string) {
    if (inputText.length == 0) {
      toast.error("Please input your task!",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      return
    }
    const now = new Date()
    const newTask: Task = {
      uuid: name + "_" + now.toISOString(),
      name: name,
      description: "foo",
      status: "wip",
    }

    localStorage.setItem("taskList", JSON.stringify([...taskList, newTask]))
    setTaskList([...taskList, newTask])
    setInputText("")
    toast.success('New Task Registered!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  function changeTaskStatus(taskIndex: number) {
    const updatedTaskList = taskList.slice()
    updatedTaskList[taskIndex].status = (updatedTaskList[taskIndex].status == "wip" ? "done" : "wip")
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList))
    setTaskList(updatedTaskList);
  }

  function sweepDoneTasks() {
    let newTaskList = taskList.filter(task => task.status == "wip")
    localStorage.setItem("taskList", JSON.stringify(newTaskList))
    setTaskList(newTaskList)

    toast.info('Done!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <NextNProgress />
      <div className="container mx-auto p-4">
        <div className="relative">
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">ToDo List</h1>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            id="task-input-form"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label htmlFor="Task To Do" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Task to do</label>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              registerNewTask(inputText);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Register New Task
          </button>
          <button
            onClick={sweepDoneTasks}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Remove Completed Tasks
          </button>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, index) => (
                <tr
                  key={task.uuid}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">
                        <input
                          id="task-status-checkbox"
                          type="checkbox"
                          value=""
                          onClick={() => { changeTaskStatus(index) }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                        </input>
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <Link href={`/${task.uuid}`}>
                        <span className="font-medium">{task.name}</span>
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">{task.description}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default TodoListPage

import { useEffect, useState } from "react"

interface Task {
  id: number,
  name: string,
  description: string,
}

const TodoListPage = () => {
  const exampleObj: Task = {
    id: 1234,
    name: "Example",
    description: "Example",
  }

  const [inputText, setInputText] = useState("")
  const [taskList, setTaskList] = useState<Task[]>([])
  const [nextTaskId, setNextTaskId] = useState(0);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  });

  function registerNewTask(name: string) {
    const newTask = {
      id: nextTaskId,
      name: name,
      description: "foo",
    }
    setTaskList([...taskList, newTask])
    setNextTaskId(nextTaskId + 1);
  }

  return (
    <>
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
              setInputText("");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Register Task
          </button>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
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
              {taskList.map((task) => (
                <tr
                  key={task.name}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">{task.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">{task.name}</span>
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
    </>
  )
}

export default TodoListPage

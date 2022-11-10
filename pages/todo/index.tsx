import { useState } from "react"

interface Task {
    id: number,
    name: string,
    description: string,
}

const TodoListPage = () => {
  const obj1:Task = {
    id: 0,
    name: "やることの名前",
    description: "やることの説明",
  }

  const [inputText, setInputText] = useState("")

  const [taskList, setTaskList] = useState<Task[]>([obj1])

  const [nextTaskId, setnextTaskId] = useState(0);
  
  function registerNewTask(name: string) {
    const newTask = {
      id: nextTaskId,
      name: name,
      description: "適当",
    }
    setTaskList([...taskList, newTask])
    setnextTaskId(nextTaskId + 1);
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Todo List
        </label>
        <input
          type="email"
          id="helper-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Todo List"
        />
        <div >
          <button
            onClick={() => {
              registerNewTask(inputText);
              setInputText("");
            }}
            className="bg-gradient-to-r from-indigo-500 ..."
          >
            タスクを登録
          </button>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-28">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  やること
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
                        <span className="font-medium">ID:{task.id}</span>
                    </div>
                </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">タイトル:{task.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <span className="font-medium">
                        詳細:{task.description}
                      </span>
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

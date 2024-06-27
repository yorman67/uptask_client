import { statusTranslations } from "../../locales/es"
import { TaskProject } from "../../types"
import TaskCard from "./TaskCard"

type TaskListProps = {
  tasks: TaskProject[]
  canEdit?: boolean
}

type GroupedTask = {
  [key: string]: TaskProject[]
}

const initialStatusGroups: GroupedTask = {
  PENDING: [],
  ON_HOOLD: [],
  IN_PROGRESS: [],
  UNDER_REVIEW: [],
  COMPLETED: [],
}


const statusStyles :{[key: string]: string} = {
  PENDING: "border-t-slate-300",
  ON_HOOLD: "border-t-red-300",
  IN_PROGRESS: "border-t-blue-300",
  UNDER_REVIEW: "border-t-amber-300",
  COMPLETED: "border-t-emerald-300",
}
export default function TaskList({ tasks , canEdit}: TaskListProps) {

  const groupedTasks = tasks.reduce((acc, task) => {

    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);


  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 flex-col md:flex-row'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <h3 className={`capitalizate text-xl font-light boder border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

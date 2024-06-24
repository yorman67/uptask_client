import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../../api/ProjectApi"
import AddTaskModal from "../../components/tasks/AddTaskModal"
import TaskList from "../../components/tasks/TaskList"
import EditTaskData from "../../components/tasks/EditTaskData"
import TaskModalDetails from "../../components/tasks/TaskModalDetails"

export default function ProjectDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['editProject', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
    })
  
    if (isLoading) return <div>Cargando...</div>
    if (isError) return <Navigate to="/404" />
    if (data) return (
     <>
        <h1 className="text-5xl font-black ">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

        <nav className="my-5 flex gap-3">
            <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors rounded"
            onClick={() => navigate("?newTask=true")}
            >
                Agregar Tarea
            </button>
        </nav>
        <TaskList
            tasks={data.tasks}
        />
        <AddTaskModal/> 
        <EditTaskData/>
        <TaskModalDetails/>
     </>
    )
}

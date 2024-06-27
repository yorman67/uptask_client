import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../../api/ProjectApi"
import AddTaskModal from "../../components/tasks/AddTaskModal"
import TaskList from "../../components/tasks/TaskList"
import EditTaskData from "../../components/tasks/EditTaskData"
import TaskModalDetails from "../../components/tasks/TaskModalDetails"
import { useAuth } from "../../hooks/useAuth"
import { isManager } from "../../utils/policies"
import { useMemo } from "react"

export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    const canEdit = useMemo(() => {
        return data?.manager === user?._id
    }, [data, user])

    if (isLoading && authLoading) return <div>Cargando...</div>
    if (isError) return <Navigate to="/404" />
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black ">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors rounded"
                        onClick={() => navigate("?newTask=true")}
                    >
                        Agregar Tarea
                    </button>

                    <Link
                        to={`/projects/${projectId}/team`}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors rounded"
                    >
                        Colaboradores
                    </Link>
                </nav>
            )}

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

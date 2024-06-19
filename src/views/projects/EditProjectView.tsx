import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getProjectById } from "../../api/ProjectApi"
import EditProjectForm from "../../components/projects/EditProjectForm"

export default function EditProjectView() {

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
    <EditProjectForm
      project={data}
      idProject={projectId}
    />
  )
}

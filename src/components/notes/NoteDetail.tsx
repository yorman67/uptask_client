import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { formatDate } from "../../utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"


type NoteDetailProps = {
    note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {

    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => 
       data?._id === note.createdBy._id ? true : false 
    , [data])


    if (isLoading) {
        return <div>Cargando...</div>
    }

    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const queryClient = useQueryClient()


    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey: ['task', taskId],
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleDelete = () => {
        const data = {
            projectId,
            taskId,
            noteId: note._id
        }

        mutate(data)
    }

    return (
        <div className="p-3">
            <div className="flex justify-between ">
                <p className="text-slate-400 text-xs">
                    {note.content}
                </p>
                <div>
                    <p className="text-slate-400 text-xs">
                        <span>{note.createdBy.name}</span>
                    </p>
                    <p className="text-slate-400 text-xs">
                        {formatDate(note.createdAt)}
                    </p>
                </div>

                {canDelete && (
                    <button
                        className="text-red-500"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                )}

            </div>
        </div>
    )
}

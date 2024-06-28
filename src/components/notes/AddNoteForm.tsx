import { useForm } from "react-hook-form"
import { NoteFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors } ,reset } = useForm({ defaultValues: initialValues })


    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const queryClient = useQueryClient()
 
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey: ['task', taskId],
            })
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleNoteForm = (formData: NoteFormData) => {
        const data = {
            formData,
            projectId,
            taskId
        }
        mutate(data)
    }

    return (
        <form
            onSubmit={handleSubmit(handleNoteForm)}
            className="space-y-3"
            noValidate
        >

            <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Cuerpo de la nota"
                    className="w-full p-3  border-gray-300 border"
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio"
                    })}
                />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value="Crear Nota"
                className="w-full p-3 bg-fuchsia-600 hover:bg-fuchsia-800 text-white uppercase font-black cursor-pointer"
            />

        </form>
    )
}

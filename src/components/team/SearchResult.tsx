import { useMutation } from "@tanstack/react-query"
import { TeamMember } from "../../types"
import { addTeamMember } from "../../api/TeamApi"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}
export default function SearchResult({ user,reset }: SearchResultProps) {


    const params = useParams()

    const projectId = params.projectId!

    
    const {mutate} = useMutation({
        mutationFn: addTeamMember,
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
        },
        onError: (error) => {
           toast.error(error.message)
        }
    })
    const handleAddMember = () => {
        const data = {
            projectId,
            id : user._id
        }
        mutate(data)
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button 
                className=" text-purple-600 hover:bg-purple-100 font-bold py-3 px-10  cursor-pointer "
                onClick={handleAddMember}>
                    Agregar al proyecto
                </button>
            </div>
        </>
    )
}

import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/AuthApi"

export const useAuth = () => {

    const {data,isError,isLoading} = useQuery({
        queryKey: ['auth'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false // para no refrescar la pagina
    })

    return {data,isError,isLoading}
}
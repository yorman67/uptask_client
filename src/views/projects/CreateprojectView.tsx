import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateprojectView() {

    const navigate = useNavigate();
    const initialValues: ProjectFormData= {
        projectName: '',
        clientName: '',
        description: ''
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data.message)
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleForm = (formData: ProjectFormData) => {
        mutation.mutate(formData)
    }
    

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black ">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5"> Ingresa los siguientes datos para crear un proyecto</p>

                <nav className="mt-10">
                    <Link to="/"
                        className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors rounded">
                        Volver a mis proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg rounded-lg p-10"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm 
                    register={register} 
                    errors={errors} 
                    />
                    <input
                        type="submit"
                        value={'Crear Proyecto'}
                        className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors rounded"
                    />

                </form>
            </div>

        </>
    )
}

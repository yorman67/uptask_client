import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1 className="font-black text-center text-6xl text-white">Pagina no encontrada</h1>
        <p className="mt-10 text-center text-white">
            Tal vez quieras volver {' '}
            <Link 
            to='/'
            className=" text-fuchsia-600 mt-5"
            > proyectos
            </Link>
        </p>
    </>
  )
}

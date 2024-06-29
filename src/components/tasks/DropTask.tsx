import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}
export default function DropTask({status}: DropTaskProps) {

    const {isOver, setNodeRef} = useDroppable({
        id: status
    })

    const style = {
        opacity : isOver ? 0.5 : undefined
    }

  return (
    <div 
    style={style}
    ref={setNodeRef}
    className="w-full h-10 border-2 border-dashed border-slate-300 flex items-center justify-center mt-5 text-slate-400">
        soltar tarea aqui
    </div>
  )
}

import { z } from 'zod'


/**tasks*/

export const TaskStatusSchmema = z.enum(["PENDING","ON_HOOLD","IN_PROGRESS","UNDER_REVIEW","COMPLETED"])
export type TaskStatus = z.infer<typeof TaskStatusSchmema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    status: TaskStatusSchmema,
    project: z.string(),
    createdAt : z.string(),
    updatedAt : z.string()
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
    project: true

})


export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskProjectSchema>


/**projects*/
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskProjectSchema)
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

import { create } from 'domain'
import { z } from 'zod'

/**auth*/

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

/**User */
export const userSchema = authSchema.pick ({
    name: true,
    email: true
}).extend({
    _id: z.string(),
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>
/**Notes */

export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task : z.string(),
    createdAt : z.string(),
    updatedAt : z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/**tasks*/

export const TaskStatusSchmema = z.enum(["PENDING","ON_HOOLD","IN_PROGRESS","UNDER_REVIEW","COMPLETED"])
export type TaskStatus = z.infer<typeof TaskStatusSchmema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchmema,
    completedBy:  z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: TaskStatusSchmema
    })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
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
    tasks: z.array(taskProjectSchema),
    manager: z.string(userSchema.pick({
        _id: true
    })),
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

/** Teams */
const teamMEntSchema = userSchema.pick({
    _id: true,
    name: true,
    email: true
})

export const TeamMembersSchema = z.array(teamMEntSchema)
export type TeamMember = z.infer<typeof teamMEntSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
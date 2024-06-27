import { Project, TeamMember } from "../types";

export const isManager = (magerId:Project['manager'],userId:TeamMember['_id']) => {
    return magerId === userId
}

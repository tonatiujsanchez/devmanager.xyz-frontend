import { ITask } from "./ITask"
import { IUser } from "./IUser"


export interface IProject {
    _id?         : string

    name         : string
    description  : string
    deliveryDate : Date
    client       : string
    creator      : IUser | string
    collaborators: IUser[] 
    
    tasks        : ITaskState

    status       : boolean

    createdAt?: string
    updatedAt?: string
}

export interface IProjectActive extends IProject {
    type: ITypeProjectActive
}

type ITypeProjectActive = 'admin' | 'collaborative'


export interface IProjectsState {
    page : number
    count: number
    total: number
    totalPages: number
    projects  : IProject[]
}

export interface ITaskState {
    page: 0
    count: 0
    total: 0
    totalPages: 0
    tasks: ITask[]
    completedTasks: 0
}
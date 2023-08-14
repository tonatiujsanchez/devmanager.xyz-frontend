import { IUser } from "./IUser"


export interface IProject {
    _id?         : string

    name         : string
    description  : string
    deliveryDate : Date
    client       : string
    creator      : IUser | string
    collaborators: IUser[] | string[]

    status       : boolean

    createdAt?: string
    updatedAt?: string
}


export interface IProjectsState {
    page : number
    count: number
    total: number
    totalPages: number
    projects  : IProject[]
}
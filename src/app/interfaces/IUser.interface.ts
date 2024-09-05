import { IPerson } from "./IPerson.interface"

export interface IUser {

    name: string | null
    email: string | null
    password?: string | null
    person?: IPerson | null
    
}
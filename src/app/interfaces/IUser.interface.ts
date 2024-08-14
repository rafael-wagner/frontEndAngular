import { IPerson } from "./IPerson.interface"

export interface IUser {

    name: string
    email: string 
    password?: string | null

    person?: IPerson | null
    
}
import { IAddress } from "./IAddress.interface";
import { IUser } from "./IUser.interface";

export interface IPerson {

    name: string | null;
    phone: string | null;
    cpf: string | null;

    address?: IAddress | null;
    user?: IUser | null;

}
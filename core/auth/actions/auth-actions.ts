/* eslint-disable @typescript-eslint/no-unused-vars */
import { productsApi } from "../../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

// Esta interfaz debe coincidir con la respuesta de Postman
interface RegisterResponse extends User {
  token: string;
}


const returnUserToken = (data: AuthResponse) => {
    const {id, email, fullName, isActive, roles, token} = data;


    const user: User = {
        id,
        email,
        fullName,
        isActive,
        roles
    };

    return {
        user,
        token,
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLocaleLowerCase();


    try {
        const {data} = await productsApi.post<AuthResponse>('/auth/login', {email, password});

        return returnUserToken(data);
    }catch (error) {
        return null;
    }
};



export const authCheckstatus = async () => {
    try {
        const {data} = await productsApi.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data);
    }catch (error) {
        console.log(error);
        return null;
    }
}


// TODO: Tarea: Hacer el register


export const authRegister = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    // 1. Llama a la API como en Postman
    const { data } = await productsApi.post<RegisterResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    // 2. Separa el token y el usuario de la respuesta
    const { token, ...user } = data;

    // 3. Devuelve el token y el usuario
    return { token, user: user as User };
    
  } catch (error) {
    console.log(error);
    return null; // Devuelve null si hay un error
  }
};
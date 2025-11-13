import { authCheckstatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";


export type AuthStatus = 'autenticated' | 'unautenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;


    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;

    changeStatus: (token?:string, user?:User) => boolean;
}


export const useAuthStore = create<AuthState>()( (set, get) => ({
    
    //propiedades
    status: 'checking',
    token: undefined,
    user: undefined,
    
    //acciones
    checkStatus: async () => {
    
        if(get().user) {
            return;
        }

        const resp = await authCheckstatus();
        
        get().changeStatus(resp?.token, resp?.user);
    },


    login: async (email: string, password: string) => {
        
        const resp = await authLogin(email, password);

        console.log('RESPUESTA DIRECTA DE AUTH-LOGIN:', JSON.stringify(resp, null, 2))
        return get().changeStatus(resp?.token, resp?.user);
    },
    
    changeStatus: (token?:string, user?:User) => {
        if(!token || !user) {
            set({status: 'unautenticated', user: undefined, token: undefined});
            // TODO: llamar al logaut
            return false;
        }
        
        set ({status: 'autenticated',
            token: token,
            user: user,
        });
        
        return true;
    },
    
    
    
    logout: async () => {
        // TODO: clear token del secure storage
        
        set({status: 'unautenticated', user: undefined, token: undefined})
    } 
}))
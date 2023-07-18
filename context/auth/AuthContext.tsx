import {createContext} from 'react'

export interface IAuthUser{
  name:string,
  email:string,
  role: 'admin'|'client',
  token:string
}

interface ContextProps{
  isLoggedIn:boolean,
  user:IAuthUser|null,
  loginUser:(email:string, password:string)=>Promise<boolean>,
  registerUser:(email:string, password:string, name:string)=>Promise<{error:boolean, message?:string}>,
  logout:()=>void
}

export const AuthContext = createContext({} as ContextProps)
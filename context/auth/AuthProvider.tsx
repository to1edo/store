import { FC, ReactNode,useEffect,useReducer } from 'react';
import { AuthContext, AuthReducer, IAuthUser } from './';
import { shopApi } from '@/api';
import cookie from 'js-cookie'

export interface Authstate{
  isLoggedIn:boolean,
  user:IAuthUser|null
}
const INITIAL_STATE = {
  isLoggedIn:false,
  user: null
}

interface Props{
  children: ReactNode
}
export const Authprovider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  const loginUser = async(email:string, password:string):Promise<boolean> => {
    try {

      const { data } = await shopApi.post('/user/login', { email, password });
      dispatch({ type: '[Auth] - Authenticate user', payload: data });
      cookie.set('token', data.token)
      return true;

    } catch (error) {
      return false;
    }
  }

  const registerUser = async(email:string, password:string, name:string):Promise<{
    error:boolean,
    message?:string
  }> => {
    try {

      const { data } = await shopApi.post('/user/register', { email, password, name });
      dispatch({ type: '[Auth] - Authenticate user', payload: data });
      cookie.set('token', data.token)
      return {
        error:false
      }

    } catch (error:any) {
      return {
        error:true,
        message: error.response?.data?.message || "Um erro ocorreu"
      }
    }
  }

  const checkToken = async()=>{
    try{
      const { data } = await shopApi('/user/validate-token')
      dispatch({ type: '[Auth] - Authenticate user', payload: data });
      cookie.set('token', data.token)
    }catch(error){
      cookie.remove('token')
    }
  }

  useEffect(() => {
    if(cookie.get('token')){
      checkToken()
    }
  }, [])
  

  return (
    <AuthContext.Provider value={{
      ...state,

      //methods
      loginUser,
      registerUser
    }}>
      {children}
    </AuthContext.Provider>
  )}
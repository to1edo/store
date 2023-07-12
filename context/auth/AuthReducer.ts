import { Authstate, IAuthUser } from "./"

type AuthActionType =
{ type:'[Auth] - Authenticate user', 
  payload:IAuthUser 
}|
{type:'[Auth] - Logout'}

export const AuthReducer = (state: Authstate, action: AuthActionType)=>{

  switch (action.type) {
    case '[Auth] - Authenticate user':
      return{
        ...state,
        user: action.payload,
        isLoggedIn: true
      }

    case '[Auth] - Logout':
    return{
      ...state,
      user: null,
      isLoggedIn: false
    }

    default:
      return state
  }
}
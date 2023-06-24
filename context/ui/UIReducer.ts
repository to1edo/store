import { UIstate } from "./"

type UIActionType =
{ type:'[UI] - toggleMenu'}

export const UIReducer = (state: UIstate, action: UIActionType)=>{

  switch (action.type) {
    
    case '[UI] - toggleMenu':
      return{
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default:
      return state
  }
}
import { FC, ReactNode,useReducer } from 'react';
import { UIContext, UIReducer } from './';


export interface UIstate{
  isMenuOpen: boolean
}
const INITIAL_STATE = {
  isMenuOpen: false
}


interface Props{
  children: ReactNode
}
export const UIProvider:FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(UIReducer, INITIAL_STATE)

  const toggleMenu = () => {
    dispatch({type:'[UI] - toggleMenu'})
  }

  return (
    <UIContext.Provider value={{
      ...state,

      //methods
      toggleMenu
    }}>
      {children}
    </UIContext.Provider>
  )}



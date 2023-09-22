import React, { createContext, useState } from 'react'


export const stateContext = createContext();
const getFreshContext =() => {
    return{
        participantId:0,
        timetaken:0,
        selectedOption:[]
    }
}

export function ContextProvider({children}) {
  const [context, SetContext] = useState(getFreshContext())    
  return (
    <stateContext.Provider value={{context, SetContext}}>
        {children}
    </stateContext.Provider>
  )
}

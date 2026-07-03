import { create } from "zustand";

import  { persist , devtools } from "zustand/middleware" ;

const useAuth = create(
    devtools(
    persist(
    (set) => ({
  token: null,
  schoolId: null,
  userType: null,  

  login:( {token ,schoolId, userType }) =>  set({ token , schoolId , userType}),
    logout: () =>
    set({
      token: null,
      schoolId: null,
      userType: null,
    }),
 

}),
   {
      name :"userAuth"      
    }
    )
    )
)

export {useAuth}
import React, { createContext, useContext, useState } from 'react'

interface IUser {
  user?: {
    name: string,
    email: string,
    _id: string,
    avatar: string
  },
  token?: {
    accessToken: string
    expriresIn: number
  }
}

interface IUserUpdate {
  setUserData: (userData: IUser) => void
}

const UserContext = createContext<IUser>({})
const UserUpdateContext = createContext<IUserUpdate>({
  setUserData: () => { }
})

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>({})

  function setUserData(userData: IUser) {
    setUser(userData)
  }
  return <UserContext.Provider value={user}>
    <UserUpdateContext.Provider value={{ setUserData }}>

      {children}
    </UserUpdateContext.Provider>
  </UserContext.Provider>
}

function useUser() {
  return useContext(UserContext)
}

function useUserUpdate() {
  return useContext(UserUpdateContext)
}

export { UserProvider, useUser, useUserUpdate }

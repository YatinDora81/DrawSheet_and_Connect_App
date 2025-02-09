// "use client"
// import { Get_User_Details_URL } from "@repo/config/URL";
// import axios from "axios";
// import { createContext, ReactNode, useContext, useEffect, useState } from "react"

// const AuthConext = createContext();

// const AuthProvider = ({ children }: { children: ReactNode }) => {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(null);

//     useEffect(() => {

//         const fetchUSer = async () => {
//             const res = await axios.get(Get_User_Details_URL)
//             console.log(res);
//         }

//     }, [])

//     return <AuthConext.Provider value={{user, loading}}>{children}</AuthConext.Provider>
// }

// export const useAuth = () => useContext(AuthConext);
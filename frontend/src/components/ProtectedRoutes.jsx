import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
//import api from "../api(logica_fake)" //Esto habrá que descomentarlo
import { REFRESH_TOKEN, ACCES_TOKEN } from "../constants"
import { useState } from "react"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    /*1:03:08*/
    const refreshToken = async() => {

    }

    const auth = async() => {
        
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute
import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api" //Esto habrá que descomentarlo
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types';




// children daba error, asi que he añadido algo al fondo de la página... con suerte, funcionará...
function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth.catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            // res = response
            // como en api ya hemos definido la baseURL solo le pasamos el resto de la ruta
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            // res.status 200 significa que todo ha ido bien!!!
            if (res.status === 200) {
                // esto hará que ACCESS_TOKEN sea igual a res.data.access, que contiene el token de acceso
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    /* Esta funcion va a comprobar si tenemos un token, y si lo tenemos, si está actualizado */
    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false)
            return
        }
        // jwtDecode(token) va a decodificar el token y nos va a decir su tiempo de expiracion y cosas utiles 
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        // dividimos entre 1000 para sacar la fecha en segundos, en vez de en milisegundos
        const now = Date.now() / 1000

        // esto significa que ya ha expirado el token
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            // tenemos un token que no ha expirado, es decir, un token válido; el usuario esta logueado
            setIsAuthorized(true)
        }


    }

    /* Estamos haciendo tiempo hasta averiguar el token */
    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    /* Si estamos autorizados, devuelve children; si no, nos manda al login (a pasear mindundi!)*/ 
    return isAuthorized ? children : <Navigate to="/login"/>
}

// esto es lo que he añadido para arreglar "children", no se si dara un error despues, ¡oh vaya!
ProtectedRoute.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoute
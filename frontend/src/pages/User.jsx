import React from 'react';
import '../styles/User.css';
import { useHref, useNavigate } from 'react-router-dom';
import { useEffect } from "react"


function User() {
    // // Supongamos que la lista de datos viene de una base de datos
    // const [userData, setUserData] = useState([]);
  
    // // Simulando la carga de datos de la base de datos
    // useEffect(() => {
    //   // Aquí deberías hacer la llamada a tu base de datos para obtener la lista de usuarios
    //   // Por simplicidad, voy a crear datos de ejemplo
    //   const exampleData = [
    //     { id: 1, robotName: "Robot_1", estado: "Activo" },
    //     { id: 2, robotName: "Robot_2", estado: "Inactivo" },
    //     // Puedes agregar más datos aquí según tus necesidades
    //   ];
    //   setUserData(exampleData);
    // }, []);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            navigate("/movement")
  
        } catch (error) {
            alert(error)
        }
     };

     const navigate2 = useNavigate();

    const handleSubmit2 = async (e) => {
        e.preventDefault();
          try {
            navigate("/login")
  
        } catch (error) {
            alert(error)
        }
     };
  
    return (
      <div className="app-user">
          <main className='main-user'>
              <h1>Lista de Robots</h1>
              <table className='tabla-user'>
                  <thead className='cabezera-user'>
                  <tr>
                      <th>ID</th>
                      <th>Nombre del Robot</th>
                      <th>Estado</th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody className='cuerpo-user'>
                    <tr>
                        <td>1</td>
                        <td>Robot_1</td>
                        <td>Activo</td>
                        <td className="btn-container-user">
                            <button className="btn-monitoreo-user" onClick={ handleSubmit }>Monitoreo de robot</button>
                            <button className="btn-editar-user">Editar</button>
                            <button className="btn-eliminar-user">Eliminar</button>
                        </td>
                    </tr>
                    
                  </tbody>
                  
              </table>
              <button className="btn-eliminar-user" onClick={ handleSubmit2 } >Cerrar Sesión</button>
          </main>
      </div>
    );
  }
  
  export default User;  
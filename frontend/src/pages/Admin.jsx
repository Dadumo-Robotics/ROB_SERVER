import React from 'react';
import '../styles/Admin.css';

function Admin() {
    // // // Supongamos que la lista de datos viene de una base de datos
    // // const [userData, setUserData] = useState([]);
  
    // // Simulando la carga de datos de la base de datos
    // useEffect(() => {
    //   // Aquí deberías hacer la llamada a tu base de datos para obtener la lista de usuarios
    //   // Por simplicidad, voy a crear datos de ejemplo
    //   const exampleData = [
    //     { id: 1, nombre: "Jorge", apellido: "Satorres", email:"pollicaChica69@gmail.com" },
    //     { id: 2, nombre: "Pepe", apellido: "ete Sech", email:"XxTilinInsanoxX@gmail.com" },
    //     // Puedes agregar más datos aquí según tus necesidades
    //   ];
    //   setUserData(exampleData);
    // }, []);
  
    return (
      <div className="admin-user">
          <main className='main-admin'>
              <h1>Lista de Usuarios</h1>
              <table className='tabla-admin'>
                  <thead className='cabezera-admin'>
                  <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo electronico</th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody className='cuerpo-user'>
                    <tr>
                      <td>1</td>
                      <td>Nombre</td>
                      <td>Apellido</td>
                      <td>email@gmail.com</td>
                      <td className="btn-container-admin">
                          <button className="btn-editar-admin">Editar</button>
                          <button className="btn-eliminar-admin">Eliminar</button>
                      </td>
                    </tr>
                  </tbody>
              </table>
              <button className='btn-admin-add'>Añadir usuario</button>
          </main>
      </div>
    );
  }
  
  export default Admin;
  
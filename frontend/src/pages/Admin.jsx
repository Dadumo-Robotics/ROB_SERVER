import React from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="app-admin">
            <main className='main-admin'>
                <div className="header-admin">
                    <button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
                    <h1>Lista de Usuarios</h1>
                </div>
                <table className='tabla-admin'>
                    <thead className='cabezera-admin'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo electrónico</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='cuerpo-admin'>
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

import React from 'react';
import '../styles/User.css';
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate("/movement");
        } catch (error) {
            alert(error);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="app-user">
            <main className='main-user'>
                <div className="header-user">
                    <button className="btn-cerrar-sesion" onClick={handleSubmit2}>Cerrar Sesión</button>
                    <h1>Lista de Robots</h1>
                </div>
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
                                <button className="btn-monitoreo-user" onClick={handleSubmit}>Monitoreo de robot</button>
                                <button className="btn-editar-user">Editar</button>
                                <button className="btn-eliminar-user">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default User;

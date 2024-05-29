import React, { useState } from 'react';
import '../styles/User.css';
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: '', robotName: '', estado: '' });

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        // Aquí puedes manejar la lógica para guardar los cambios
        console.log('Datos guardados:', currentUser);
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            const user = email
            const res = await api.post(route, { "username": user, "password":password })
            console.log(res.data.access)
            console.log(res.data.refresh)
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/user")
          } catch (error) {
              alert(error)
          }
     }; 

    return (
        <div className="app-user">
            <main className='main-user'>
                <div className="header-user">
                    <button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
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
                                <button className="btn-monitoreo-user" onClick={() => navigate("/movement")}>Monitoreo de robot</button>
                                <button className="btn-editar-user" onClick={() => handleEdit({ id: 1, robotName: 'Robot_1', estado: 'Activo' })}>Editar</button>
                                <button className="btn-eliminar-user">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Editar Robot</h2>
                        <form>
                            <label>
                                ID:
                                <input type="text" name="id" value={currentUser.id} readOnly />
                            </label>
                            <label>
                                Nombre del Robot:
                                <input type="text" name="robotName" value={currentUser.robotName} onChange={handleChange} />
                            </label>
                            <label>
                                Estado:
                                <select name="estado" value={currentUser.estado} onChange={handleChange}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </label>
                            <button type="submit" onClick={handleSave}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;

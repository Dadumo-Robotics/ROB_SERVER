import React, { useState } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: '', nombre: '', apellido: '', email: '' });

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
                                <button className="btn-editar-admin" onClick={() => handleEdit({ id: 1, nombre: 'Nombre', apellido: 'Apellido', email: 'email@gmail.com' })}>Editar</button>
                                <button className="btn-eliminar-admin">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn-admin-add'>Añadir usuario</button>
            </main>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Editar Usuario</h2>
                        <form>
                            <label>
                                ID:
                                <input type="text" name="id" value={currentUser.id} readOnly />
                            </label>
                            <label>
                                Nombre:
                                <input type="text" name="nombre" value={currentUser.nombre} onChange={handleChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" name="apellido" value={currentUser.apellido} onChange={handleChange} />
                            </label>
                            <label>
                                Correo electrónico:
                                <input type="email" name="email" value={currentUser.email} onChange={handleChange} />
                            </label>
                            <button type="button" onClick={handleSave}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;

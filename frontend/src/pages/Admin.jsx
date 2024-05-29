import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Importa el cliente de API

function Admin() {
    const routeAllUsers="/api/users/"
    const routeIndividualUser="/api/user/"

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: '', first_name: '', last_name: '', email: '', password: '', role: '', last_login: ''});

    useEffect(() => {
        fetchUsers();// Carga la lista de robots al montar el componente
        //fetchUserData(); // Cuando el componente se monta, obtén los datos del usuario
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get(routeAllUsers); // Obtener la lista de Users desde el backend
            setUsers(response.data); // Actualizar el estado local con la lista de Users obtenida
            console.log(response.data)
        } catch (error) {
            alert('Error al obtener la lista de users');
            console.error(error);
        }
    };


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            navigate("/logout");
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

    const handleSave = async () => {
        try {
            // Realizar solicitud PUT para actualizar el robot con los nuevos datos
            await api.put(routeIndividualUser +"update/"+ currentUser.id, currentUser);
            setShowModal(false);
            fetchUsers(); // Volver a cargar la lista de robots después de la actualización
        } catch (error) {
            alert('Error al actualizar el user');
            console.error(error);
        }
    };

    const handleCreate = async () => {
        try {
            let JSONuser = {
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                email: currentUser.email,
                role: currentUser.role,
                password: currentUser.password 
            }
            // Realizar solicitud PUT para actualizar el robot con los nuevos datos
            await api.post(routeIndividualUser +"register/", JSONuser);
            setShowModal(false);
            fetchUsers(); // Volver a cargar la lista de robots después de la actualización
        } catch (error) {
            alert('Error al crear el user');
            console.error(error);
        }
    };


    const handleCreateModal = (user) => {
        setCurrentUser(user);
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return formattedDate+" | "+formattedTime;
    };

    return (
        <div className="app-admin">
            <main className='main-admin'>
                <div className="header-admin">
                    <h1>Lista de Usuarios</h1>
                </div>
                <table className='tabla-admin'>
                    <thead className='cabezera-admin'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo electrónico</th>
                            <th>Rol</th>
                            <th>Última conexión</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='cuerpo-admin'>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{formatDateTime(user.last_login)}</td>
                                <td className="btn-container-admin">
                                    <button className="btn-editar-admin" onClick={() => handleEdit(user)}>Editar</button>
                                    <button className="btn-eliminar-admin" onClick={() => handleEdit(user)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div>
                   <button className='btn-admin-add' onClick={handleCreateModal}>Añadir usuario</button>
                    <button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button> 
                </div>
                
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
                                <input type="text" name="first_name" value={currentUser.first_name} onChange={handleChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" name="last_name" value={currentUser.last_name} onChange={handleChange} />
                            </label>
                            <label>
                                Correo electrónico:
                                <input type="email" name="email" value={currentUser.email} onChange={handleChange} />
                            </label>
                            <label>
                                Rol:
                                <input type="text" name="role" value={currentUser.role} onChange={handleChange} />
                            </label>
                            <button type="button" onClick={handleSave}>Guardar</button>
                        </form>
                    </div>
                </div>
            )}
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseCreateModal}>&times;</span>
                        <h2>Añadir Usuario</h2>
                        <form>
                            <label>
                                Nombre:
                                <input type="text" name="first_name" value={currentUser.first_name} onChange={handleChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" name="last_name" value={currentUser.last_name} onChange={handleChange} />
                            </label>
                            <label>
                                Correo electrónico:
                                <input type="email" name="email" value={currentUser.email} onChange={handleChange} />
                            </label>
                            <label>
                                Rol:
                                <input type="text" name="role" value={currentUser.role} onChange={handleChange} />
                            </label>
                            <label>
                                Contraseña:
                                <input type="text" name="password" value={currentUser.password} onChange={handleChange} />
                            </label>
                            <button type="button" onClick={handleCreate}>Crear</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;

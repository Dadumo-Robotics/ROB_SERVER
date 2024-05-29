//pages/User.jsx
import React, { useState, useEffect } from 'react';
import '../styles/User.css';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Importa el cliente de API
import { FaAlignCenter } from 'react-icons/fa';
import { ROBOT_ID, ROBOT_IP, ROBOT } from "../constants";

function User() {
    const routeAll="/api/robots/"
    const routeIndividual="/api/robot/"
    
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showAddRobotModal, setShowAddRobotModal] = useState(false);
    const [robots, setRobots] = useState([]);
    const [currentRobot, setCurrentRobot] = useState({ id: '', name: '', state: '', last_coordinates: '', last_update_time: '', device_ip: ''/*, owner:''*/});
    
    useEffect(() => {
        fetchRobots();// Carga la lista de robots al montar el componente
        
    }, []); 

    const fetchRobots = async () => {
        try {
            const response = await api.get(routeAll); // Obtener la lista de robots desde el backend
            setRobots(response.data); // Actualizar el estado local con la lista de robots obtenida
        } catch (error) {
            alert('Error al obtener la lista de robots');
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

    const handleEdit = (robot) => {
        setCurrentRobot(robot);
        console.log(robot);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenAddRobotModal = () => {
        setShowAddRobotModal(true);
    };

    const handleCloseAddRobotModal = () => {
        setShowAddRobotModal(false);
    };


    const handleSave = async () => {
        try {
            // Realizar solicitud PUT para actualizar el robot con los nuevos datos
            await api.put(routeIndividual +"update/"+ currentRobot.id, currentRobot);
            setShowModal(false);
            fetchRobots(); // Volver a cargar la lista de robots después de la actualización
        } catch (error) {
            alert('Error al actualizar el robot');
            console.error(error);
        }
    };

    const handleSync = async () => {
        try {
            // Realizar solicitud PUT para conectar el robot con los nuevos datos
            await api.put(routeIndividual +"user-sync/"+ currentRobot.id, currentRobot);
            setShowAddRobotModal(false);
            fetchRobots(); // Volver a cargar la lista de robots después de la actualización
        } catch (error) {
            alert('Error al conectar el robot');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentRobot((prevRobot) => ({
            ...prevRobot,
            [name]: value,
        }));
    };

    const handleDesync = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este robot?')) {
            try {
                await api.put(routeIndividual +"user-desync/"+id);
                fetchRobots(); // Volver a cargar la lista de robots después de la eliminación
            } catch (error) {
                alert('Error al eliminar el robot');
                console.error(error);
            }
        }
    };

    const handleGoToNavigate = (robot) => {
            try {
                console.log(robot)
                localStorage.setItem(ROBOT_ID, robot.id);
                localStorage.setItem(ROBOT_IP, robot.device_ip);
                localStorage.setItem(ROBOT, JSON.stringify(robot));
                navigate("/movement");
            } catch (error) {
                alert('Error al ir a movement');
                console.error(error);
            }
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
        <div className="app-user">
            <main className='main-user'>
                
                

                <div className="header-user">
                    
                    <h1>Lista de Robots</h1>
                </div>
                <table className='tabla-user'>
                    <thead className='cabezera-user'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Robot</th>
                            <th>Estado</th>
                            <th>Últimas Coordenadas</th>
                            <th>Último Envío</th>
                            <th>IP</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='cuerpo-user'>
                        {robots.map((robot) => (
                            <tr key={robot.id}>
                                <td>{robot.id}</td>
                                <td>{robot.name}</td>
                                <td>{robot.state ? 'Activo' : 'Inactivo'}</td>
                                <td>{robot.last_coordinates}</td>
                                <td>{formatDateTime(robot.last_update_time)}</td>
                                <td>{robot.device_ip}</td>
                                <td className="btn-container-user">
                                    <button className="btn-monitoreo-user" onClick={() => handleGoToNavigate(robot)}>Monitoreo de robot</button>
                                    <button className="btn-editar-user" onClick={() => handleEdit(robot)}>Editar</button>
                                    <button className="btn-eliminar-user" onClick={() => handleDesync(robot.id)}>Retirar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>

                <button className="btn-monitoreo-user" onClick={handleOpenAddRobotModal}>Añadir Robot</button>
            </main>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Editar Robot</h2>
                        <form>
                            <label>
                                ID:
                                <input type="text" name="id" value={currentRobot.id} readOnly />
                            </label>
                            <label>
                                Nombre del Robot:
                                <input type="text" name="name" value={currentRobot.name} onChange={handleChange} />
                                </label>
                                <label>
                                    Estado:
                                    <select name="state" value={currentRobot.state} onChange={handleChange}>
                                        <option value="true">Activo</option>
                                        <option value="false">Inactivo</option>
                                    </select>
                                </label>
                                <label>
                                    Últimas Coordenadas:
                                    <input type="text" name="last_coordinates" value={currentRobot.last_coordinates} readOnly />
                                </label>
                                <label>
                                    Última Conexión:
                                    <input type="text" name="last_update_time" value={currentRobot.last_update_time} readOnly />
                                </label>
                                <label>
                                    IP:
                                    <input type="text" name="device_ip" value={currentRobot.device_ip} onChange={handleChange} />
                                </label>
                                <button type="button" onClick={handleSave}>Guardar</button>
                            </form>
                        </div>
                    </div>
                )}

                {showAddRobotModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseAddRobotModal}>&times;</span>
                        <h2>Añadir Robot</h2>
                        <form>
                            <label>
                                ID (Número de serie):
                                <input type="text" name="id" value={currentRobot.id} onChange={handleChange} />
                            </label>
                            {/* 
                            <label>
                                Nombre del Robot:
                                <input type="text" name="name" value={currentRobot.name} onChange={handleChange} />
                            </label>
                            <label>
                                IP:
                                <input type="text" name="device_ip" value={currentRobot.device_ip} onChange={handleChange} />
                            </label>
                            */}
                                <button type="button" onClick={handleSync}>Guardar</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    export default User;
    
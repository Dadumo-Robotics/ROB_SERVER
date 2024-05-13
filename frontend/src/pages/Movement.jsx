import React, { useEffect, useRef } from 'react';
import '../styles/Movement.css';
import '../App.css';
import camara_foto from '../multimedia/FotosMovimiento/camara_casera.png';
import mapa_foto from '../multimedia/FotosMovimiento/mapa.png';
import { useNavigate } from "react-router-dom";
//import movement from '../movement';

function Movement() {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        navigate("/user")

    } catch (error) {
        alert(error)
    }
 };

  console.log("entro en la pagina")

  // Crear refs para cada elemento del DOM que necesita manejo de eventos o acceso
  const backButtonRef = useRef(null);
  const upButtonRef = useRef(null);
  const downButtonRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const mapRef = useRef(null);
  const otherButtonRef = useRef(null);
  const coordinatesRef = useRef(null);

  useEffect(() => {
    // Crear un elemento script
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.min.js";
    script.async = true;

    // Añadir el script al cuerpo del documento
    document.body.appendChild(script);

    script.onload = () => {
      // El script está cargado completamente, ahora es seguro usar ROSLIB
      connect(); // Mueve la llamada a connect aquí
    };

    // Añadir manejadores de eventos a los elementos necesarios
    const backButton = backButtonRef.current;
    const upButton = upButtonRef.current;
    const downButton = downButtonRef.current;
    const leftButton = leftButtonRef.current;
    const rightButton = rightButtonRef.current;
    const map = mapRef.current;
    const otherButton = otherButtonRef.current;
    const coordinates = coordinatesRef.current;

    if (backButton) backButton.addEventListener("click", disconnect);
    if (upButton) upButton.addEventListener("click", () => call_delante_service("delante"));
    if (downButton) downButton.addEventListener("click", () => call_delante_service("atras"));
    if (leftButton) leftButton.addEventListener("click", () => call_delante_service("izquierda"));
    if (rightButton) rightButton.addEventListener("click", () => call_delante_service("derecha"));
    if (map) map.addEventListener("click", () => call_delante_service("parar"));
    if (otherButton) otherButton.addEventListener("click", trayecto);

    // Función para limpiar los eventos al desmontar el componente
    return () => {
      if (backButton) backButton.removeEventListener("click", disconnect);
      if (upButton) upButton.removeEventListener("click", () => call_delante_service("delante"));
      if (downButton) downButton.removeEventListener("click", () => call_delante_service("atras"));
      if (leftButton) leftButton.removeEventListener("click", () => call_delante_service("izquierda"));
      if (rightButton) rightButton.removeEventListener("click", () => call_delante_service("derecha"));
      if (map) map.removeEventListener("click", () => call_delante_service("parar"));
      if (otherButton) otherButton.removeEventListener("click", trayecto);
      document.body.removeChild(script);
    };
  }, []);

  let data = {
    // ros connection
    ros: null,
    rosbridge_address: 'ws://192.168.0.101:9090/',
    //rosbridge_address: '',
    connected: false,
    // service information 
    service_busy: false,
    service_response: ''
  }

  // Conexion base
  function connect() {
    if (data.ros) {
      console.log("Ya existe una conexión. Desconecte antes de reconectar.");
      return;
    }

    console.log("Clic en connect")

    data.ros = new ROSLIB.Ros({
      url: data.rosbridge_address
    })

    // Define callbacks
    data.ros.on("connection", () => {
      data.connected = true
      console.log("Conexion con ROSBridge correcta")
    })
    data.ros.on("error", (error) => {
      console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
      console.log(error)
    })
    data.ros.on("close", () => {
      data.connected = false
      console.log("Conexion con ROSBridge cerrada")
    })

    show_pos();
  }

  function disconnect() {
    if (data.ros) {
      data.ros.close();
      data.ros = null;
      data.connected = false;
      console.log("Desconexión exitosa.");
    } else {
      console.log("No hay conexión activa para desconectar.");
    }
  }

  // Ejercicio publicacion movimiento
  function stop_move() {
    let topic = new ROSLIB.Topic({
      ros: data.ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/msg/Twist'
    })
    let message = new ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0.0, },
    })
    topic.publish(message)
  }

  // Suscripcion
  function show_pos() {
    let topic = new ROSLIB.Topic({
      ros: data.ros,
      name: '/odom',
      messageType: 'nav_msgs/msg/Odometry'
    })

    topic.subscribe((message) => {
      data.position = message.pose.pose.position
      coordinates.innerHTML = "X: " + data.position.x.toFixed(2) + ", Y:" + data.position.y.toFixed(2);
    })
  }

  // Para servicio y mover direcciones
  function call_delante_service(valor) {
    data.service_busy = true
    data.service_response = ''

    //definimos los datos del servicio
    let service = new ROSLIB.Service({
      ros: data.ros,
      name: '/movement',
      serviceType: 'custom_interface/srv/MyMoveMsg'
    })

    let request = new ROSLIB.ServiceRequest({
      move: valor
    })

    service.callService(request, (result) => {
      data.service_busy = false
      data.service_response = JSON.stringify(result)
    }, (error) => {
      data.service_busy = false
      console.error(error)
    })
  }

  // Waypoints
  function trayecto() {
    var startWaypointsService = new ROSLIB.Service({
      ros: data.ros,
      name: '/start_waypoint_following',
      serviceType: 'std_srvs/Trigger'
    });

    var request = new ROSLIB.ServiceRequest();

    startWaypointsService.callService(request, function (result) {
      console.log('Received result:', result);
      if (result.success) {
        console.log('Waypoints following started!');
      } else {
        console.log('Failed to start following waypoints.');
      }
    });
  }

  //connect();

  return (

    <div className="app-movement">
      <main className='main-movement'>
        <div className='movement-container'>
          <div id="camera">
            <img src={camara_foto} alt="Vista de la cámara" />
            <div id="controls">
              <button ref={backButtonRef} id="back-button" onClick={handleSubmit}>Volver</button>
              <button ref={otherButtonRef} id="other-button">Trayecto</button>
            </div>
            <div id="map-container">
              <div id="map" ref={mapRef}>
                <img src={mapa_foto} alt="Minimapa" />
              </div>
              <div id="coordinates" ref={coordinatesRef}>Coordenadas: X, Y</div>
            </div>
            <div id="arrows">
              <div className="arrow-box" id="vertical-arrows">
                <button ref={upButtonRef} className="arrow" id="btn_move_up">↑</button>
                <button ref={downButtonRef} className="arrow" id="btn_move_down">↓</button>
              </div>
              <div className="arrow-box" id="horizontal-arrows">
                <button ref={leftButtonRef} className="arrow" id="btn_move_left">←</button>
                <button ref={rightButtonRef} className="arrow" id="btn_move_right">→</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Movement;
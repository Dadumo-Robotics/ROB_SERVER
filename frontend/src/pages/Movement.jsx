import React, { useEffect, useRef } from 'react';
import '../styles/Movement.css';
import '../App.css';
import camara_foto from '../multimedia/FotosMovimiento/camara_casera.png';
import mapa_foto from '../multimedia/FotosMovimiento/mapa.png';
import flecha from '../multimedia/flecha.png';
import cola from '../multimedia/lata-cola.png';
import { useNavigate } from "react-router-dom";
import { ROBOT_ID, ROBOT_IP, ROBOT} from "../constants";
import api from '../api'; // Importa el cliente de API

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
  
  const backButtonRef = useRef(null);
  const upButtonRef = useRef(null);
  const downButtonRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const mapRef = useRef(null);
  const otherButtonRef = useRef(null);
  const coordinatesRef = useRef(null);
  const mapaRef = useRef(null);
  const camaraRef = useRef(null);
  let coordinatesForDatabase = "X:0, Y:0";
  let currentRobot;
  let currentRobotString;
  const routeIndividual="/api/robot/"

  const handleCoordinates = async () => {
    try {
        /*localStorage.setItem(ROBOT).last_coordinates = coordinatesForDatabase;
        localStorage.setItem(ROBOT).last_update_time = getCurrentTime();*/
        currentRobotString = localStorage.getItem(ROBOT)
        currentRobot = JSON.parse(currentRobotString)
        console.log(currentRobot);
        currentRobot.last_coordinates = coordinatesForDatabase;
        console.log(currentRobot);
        // Realizar solicitud PUT para actualizar el robot con los nuevos datos
        await api.put(routeIndividual +"update-coordinates/"+localStorage.getItem(ROBOT_ID), currentRobot);

    } catch (error) {
        alert('Error al actualizar el robot');
        console.error(error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.min.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      connect();
    };

    const backButton = backButtonRef.current;
    const upButton = upButtonRef.current;
    const downButton = downButtonRef.current;
    const leftButton = leftButtonRef.current;
    const rightButton = rightButtonRef.current;
    const map = mapRef.current;
    const otherButton = otherButtonRef.current;
    const coordinates = coordinatesRef.current;
    const mapa = mapaRef.current;    
    const camara = camaraRef.current;
    

    if (backButton) backButton.addEventListener("click", disconnect);
    if (upButton) upButton.addEventListener("click", () => call_delante_service("delante"));
    if (downButton) downButton.addEventListener("click", () => call_delante_service("atras"));
    if (leftButton) leftButton.addEventListener("click", () => call_delante_service("izquierda"));
    if (rightButton) rightButton.addEventListener("click", () => call_delante_service("derecha"));
    if (map) map.addEventListener("click", () => call_delante_service("parar"));
    if (otherButton) otherButton.addEventListener("click", trayecto);

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
    ros: null,
    // rosbridge_address: 'ws://'+localStorage.getItem(ROBOT_IP)+':9090/',
    rosbridge_address: 'ws://192.168.0.101:9090/',
    connected: false,
    service_busy: false,
    service_response: ''
  }

  console.log(data.rosbridge_address)

  function connect() {
    if (data.ros) {
      console.log("Ya existe una conexión. Desconecte antes de reconectar.");
      return;
    }

    console.log("Clic en connect")

    data.ros = new ROSLIB.Ros({
      url: data.rosbridge_address
    })

    data.ros.on("connection", () => {
      data.connected = true
      setMapa()
      setCamera()
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

  function show_pos() {
    let topic = new ROSLIB.Topic({
      ros: data.ros,
      name: '/odom',
      messageType: 'nav_msgs/msg/Odometry'
    })

    topic.subscribe((message) => {
      data.position = message.pose.pose.position
      coordinates.innerHTML = "X: " + data.position.x.toFixed(2) + ", Y:" + data.position.y.toFixed(2);
      //Esto es para que envie las coordenadas a la base de datos también
      coordinatesForDatabase =  "X: " + data.position.x.toFixed(2) + ", Y:" + data.position.y.toFixed(2);
      handleCoordinates();
    })
  }

  function call_delante_service(valor) {
    data.service_busy = true
    data.service_response = ''

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

  // Camara
  function setMapa(){
    //Subscribe to the map topic
    var mapTopic = new ROSLIB.Topic({
        ros: data.ros,
        name: '/map',
        messageType: 'nav_msgs/msg/OccupancyGrid'
    });

    mapTopic.subscribe((message) => {
        draw_occupancy_grid(mapa, message)
    });
  }

  function draw_occupancy_grid(canvas, map_data, robotPosition) {

    var ctx = canvas.getContext("2d");
    //document.querySelector('canvas'); //canvas.getContext("2d");

    var map = map_data;
    var pointSize = 1;

    canvas.width = map.info.width;
    canvas.height = map.info.height;

    for (let i = 0; i < map.info.height; i++) {
        for (let j = 0; j < map.info.width; j++) {

            let posX = j;
            let posY = i;
            let pos = map.info.width * i + j;

            let gridValue = map.data[pos];

            var color = evaluarGradiente(gridValue);

            ctx.beginPath();
            ctx.fillRect(posX, posY, pointSize, pointSize);
            ctx.fillStyle = color;
            ctx.stroke();
        }
    }

    if(robotPosition) {
        let robotSize = {
            width:4,
            height:4,
        }
        let posX = robotPosition.x + canvas.width/2 - robotSize.width/2;
        let posY = robotPosition.y + canvas.height/2 - robotSize.height/2;

        // console.log(posX, posY)

        // ctx.beginPath();
        // ctx.fillStyle = 'green';
        // ctx.fillRect(posX, posY, robotSize.width, robotSize.height);
        // ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(posX, posY, robotSize.width/2, 0, 2 * Math.PI);
        ctx.fill();
    }

}

function evaluarGradiente(valor) {

    if (valor == 100) return "rgb(0,0,0)"
    else if (valor == 0) return "rgb(255,255,255)"
    else if (valor < 0) return "rgb(120,120,120)"

    // Define la escala de colores
    var colores = [
        [0, 0, 0],
        [0, 0, 0],
        [255, 0, 255],
        [250, 0, 0],
        [0, 255, 255],
    ];

    // Convierte el valor en una posiciÃ³n en la escala
    var posicion = valor / 100 * (colores.length - 1);
    var posicionEntera = Math.floor(posicion);
    var posicionDecimal = posicion - posicionEntera;

    // Interpola entre los colores en las posiciones correspondientes
    var color1 = colores[posicionEntera];
    var color2 = colores[posicionEntera + 1];

    if (typeof color1 !== 'undefined' && typeof color2 !== 'undefined' && color1.length > 0 && color2.length > 0) {
        var r = color1[0] * (1 - posicionDecimal) + color2[0] * posicionDecimal;
        var g = color1[1] * (1 - posicionDecimal) + color2[1] * posicionDecimal;
        var b = color1[2] * (1 - posicionDecimal) + color2[2] * posicionDecimal;
    }

    // Devuelve el color en formato RGB
    return "rgb(" + Math.round(r) + ", " + Math.round(g) + ", " + Math.round(b) + ")";
}

// Camara
function setCamera(){
  console.log("Entra camara");
  var imageListener = new ROSLIB.Topic({
      ros: data.ros,
      name: '/camera/image_processed',
      messageType: 'custom_interface/msg/Base64Image'
  });

  imageListener.subscribe(function(message) {
      // Convertir la imagen de ROS a base64
      var base64Image = 'data:image/jpeg;base64,' + message.data;
      document.getElementById('mjpeg').src = base64Image;
  });
  console.log("Acaba camara");
}

  return (
    <div className="app-movement">
      <main className='main-movement'>

        <div className="left-panel">
          <button ref={otherButtonRef} className='btn-trayecto'>Trayecto</button>
          {/*
            <button className='btn-trayecto' onClick={handleCoordinates}>Probar</button>
          */}
          
          
          <div className="control-buttons">
            <button ref={upButtonRef} className="arrow" id="btn_move_up">
             <img src={flecha} alt="Flecha arriba" className="arriba" />
            </button>
            <button ref={downButtonRef} className="arrow" id="btn_move_down">
              <img src={flecha} alt="Flecha arriba" className="abajo" />
            </button>
          </div>
        </div>

        <div className="center-panel">
          <div className="object-info">
            <div className="object-column">
              <img src={cola} alt="Lata" className="object-image" />
            </div>
            <div className="object-details">
                <p>Objeto: Lata</p>
                <div id="coordinates" ref={coordinatesRef}>Coordenadas: X, Y</div>
              </div>
            <div className="mapa-column">
              <div className="mapa-image">
                <canvas id="mapa" ref={mapaRef}></canvas>
              </div>
            </div>
          </div>
          <div className="camera-view">
            <img id="mjpeg" width= "100%" height="100%"  ref={camaraRef}/>
          </div>
        </div>

        <div className="right-panel">
          <button ref={backButtonRef} className='btn-volver' onClick={handleSubmit}>Volver</button>

            <div className="control-buttons">
              <button ref={leftButtonRef} className="arrow" id="btn_move_left">
                <img src={flecha} alt="Flecha arriba" className="izquierda" />
              </button>
              <button ref={rightButtonRef} className="arrow" id="btn_move_right">
                <img src={flecha} alt="Flecha arriba" className="derecha" />  
              </button>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Movement;
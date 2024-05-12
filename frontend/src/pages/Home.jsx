import logo from '../multimedia/logoDadumo.png';
import tutel from '../multimedia/turtlebot03.jpg';
import PCGazebo from '../multimedia/pcGazebo.png';
import gazebo from '../multimedia/gazebo.png';
import turtlebot03_fleet from '../multimedia/turtlebot03_fleet.jpg';
import modelo3D from '../multimedia/modelo3d.png';
import fondo3 from '../multimedia/fondo-3.png';

import video from '../multimedia/LandingVideo.mp4';

import '../styles/Home.css';

function Home() {
    return(
        <div className="app-landing">
            {/* Primera parte */}
            <section className="section1">
                <div className="background-video-container">
                    <video autoPlay loop muted className="background-video">
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay"></div> {/* Capa gris transparente */}
                </div>
                <div className="content1">
                    <h1>Innovando para un mañana más brillante</h1>
                    <p>Descubre la solución a la limpieza automática de recintos</p>
                </div>
            </section>

            {/* Segunda parte */}
            <section className="section2" style={{ backgroundImage: `url(${turtlebot03_fleet})` }}>
                <div className="content2">
                    <div className="text-container">
                        <h2>Trash Trooper</h2>
                        <p>Con tu "TrashTrooper" no puedes fallar. Busca, recoge y recicla, manteniendo los espacios limpios y reciclando sin límites</p>
                    </div>
                    <div className="images-container">
                        {/* Aquí irían tus imágenes */}
                        <img className='tutel' src={tutel} alt="Turtlebot 3 burguer" />
                        <img className='modelo' src={modelo3D} alt="Modelado 3D del robot" />
                        <img className='logo-dadumo' src={logo} alt="Logo" />
                    </div>
                </div>
            </section>

            {/* Tercera parte */}
            <section className="section3" style={{ backgroundImage: `url(${fondo3})` }}>
                <div className="content3">
                    <div className="images-container">
                        <img className='gazebo' src={gazebo} alt="Imagen 4" />
                        <img className='pcGazebo' src={PCGazebo} alt="Imagen 5" />
                    </div>
                    <div className="text-container">
                        <h2>Reconocimiento y guía</h2>
                        <p>"TrashTrooper" va a los contenedores asignados para depositar la basura encontrada gracias al mapeado y entrenamiento en entornos virtuales</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

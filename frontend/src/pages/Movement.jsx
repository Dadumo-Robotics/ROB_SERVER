import React from 'react';
import '../styles/Movement.css';
import '../App.css';
import camara_foto from '../multimedia/FotosMovimiento/camara_casera.png';
import mapa_foto from '../multimedia/FotosMovimiento/mapa.png';
//import movement from '../movement';

function Movement() {
  return (

    <div className="app-movement">
      <main className='main-movement'>
        <div className='movement-container'>
          <div id="camera">
            <img src={camara_foto} alt="Vista de la cámara" />
              <div id="controls">
                <button id="back-button">Volver</button>
                <button id="other-button">Trayecto</button>
              </div>
              <div id="map-container">
                <div id="map">
                  <img src={mapa_foto} alt="Minimapa" />
                </div>
                <div id="coordinates">Coordenadas: X, Y</div>
              </div>
              <div id="arrows">
                <div className="arrow-box" id="vertical-arrows">
                  <button className="arrow" id="btn_move_up">↑</button>
                  <button className="arrow" id="btn_move_down">↓</button>
                </div>
                <div className="arrow-box" id="horizontal-arrows">
                  <button className="arrow" id="btn_move_left">←</button>
                  <button className="arrow" id="btn_move_right">→</button>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Movement;
import React from 'react';
import '../styles/Movement.css';
import '../App.css';
import movement from '../movement';

function Movement() {
  return (
    
    <div className="app-movement">
      <main className='main-movement'>
        <div className='movement-container'>
            <div id="camera">
                <img src="camara-imagen.jpg" alt="Vista de la cámara" />
                <div id="controls">
                    <button id="back-button">Volver</button>
                    <button id="other-button">Otra Acción</button>
                </div>
                <div id="map">Minimapa</div>
                <div id="arrows">
                    <div class="arrow-box" id="vertical-arrows">
                        <button class="arrow">↑</button>
                        <button class="arrow">↓</button>
                    </div>
                    <div class="arrow-box" id="horizontal-arrows">
                        <button class="arrow">←</button>
                        <button class="arrow">→</button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Movement;
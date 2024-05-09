import React from 'react';
import videoSrc from './multimedia/homero.mp4';
import videoSrcSecreto from './multimedia/homero.mp4';

function VideoSection() {
    return (
        <div className="video-container" style={{ height: '33vh', width: '100%' }}> {/* Ajusta el estilo como sea necesario */}
            {videoSecreto()}
        </div>
    );
}

function videoSecreto() {
    const chance = Math.random();
    if (chance < 0.01) { // 1% de probabilidad de mostrar el video secreto
        console.log("Video Secreto!");
        return (
            <video width="100%" height="100%" autoPlay loop muted controls>
                <source src={videoSrcSecreto} type="video/mp4"/>
                Tu navegador no soporta videos HTML5.
            </video>
        );
    } else {
        return (
            <video width="100%" height="100%" autoPlay loop muted controls>
                <source src={videoSrc} type="video/mp4"/>
                Tu navegador no soporta videos HTML5.
            </video>
        );
    }
}

export default VideoSection;

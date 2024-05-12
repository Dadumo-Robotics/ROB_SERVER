import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import '../styles/Contacto.css';

  export const Contacto = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_t9uwf44', 'template_0hmtvxe', form.current, {
        publicKey: 'ZLrZSwVq5yRbupG2V',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  
  {return (
    <div className="app-contacto">
    <main className='main-contacto'>
      <div className='contacto-container'>
        <h2 className='titulo-contacto'>Ficha de Contacto</h2>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <label className='label-contacto'>Nombre y Apellidos</label>
            <input type='text' className="input-style-contacto" placeholder='Nombre y Apellidos' name ="user_name"/>
          </div>
          <div>
            <label className='label-contacto'>Email</label>
            <input type='email' className="input-style-contacto" placeholder='Correo electrónico' name="user_email"/>
          </div>
          <div>
            <label className='label-contacto'>Teléfono</label>
            <input type='number' className="input-style-contacto" placeholder='Teléfono' name="user_phone"/>
          </div>
          <div>
            <label className='label-contacto'>Información Adicional</label>
            <textarea className="textarea-style-contacto" placeholder='Escribe tu consulta aquí...' name="message"/>
          </div>
          <button type="submit" className='btn-enviar'>Enviar</button>
        </form>
      </div>
    </main>
  </div>    
  );
}}

export default Contacto;
import React from 'react';
import '../styles/Header.css';
import logo from '../multimedia/logoDadumo.png';
import { FaBars, FaTimes } from "react-icons/fa"
import { useRef } from "react"

function Header() {

	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  return (
    <header>
      <img src={logo} className="logo-header" alt="logo" />
      <nav ref={navRef}>
        <a href='./register'>Registro</a>
        <a>Inicio</a>
        <a href='./contacto'>Contáctanos</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
    </header>
  );
}

export default Header;
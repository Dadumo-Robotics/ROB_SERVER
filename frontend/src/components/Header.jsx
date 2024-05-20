import React from 'react';
import './Header.css';
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
		<a href="./">
			<img src={logo} className="logo-header" alt="logo" />
		</a>
		<nav ref={navRef}>
			<a href='./'>Inicio</a>
			<a href='./login'>Inicia sesión</a>
			<a href='./contacto'>Contáctanos</a>
			{/* MENU HAMBURGUESA */}
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
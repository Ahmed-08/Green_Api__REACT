import React from 'react';
import './header.scss';


const logo = require("../../shared/images/whatsapp.png");
const download = require("../../shared/images/download.png");

export const Header: React.FC = () => {
  return (
		<header className="login__header">
			<div className="logo">
				<img src={logo} alt="whatsapp" />
				<h1 className="login__title">WhatsApp</h1>
			</div>
			<div className="header__btn_download">
				<button type="button" className="btn_download">
					Скачать
				</button>
				<img src={download} alt="download" />
			</div>
		</header>
  );
}

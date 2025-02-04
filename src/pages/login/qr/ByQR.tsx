import React from "react";
import { Link } from "react-router-dom";
import { Instruction } from "../../../components/instruction/Instruction";

import "./ByQR.scss";


export const ByQR: React.FC = () => {
	return (
		<div className="login">
			<div className="container">


				<div className="login__main">
					<h2>Вход WhatsApp Web</h2>
					<p>
						Конфиденциально обменивайтесь сообщениями с друзьями и
						близкими в версии WhatsApp для браузера.
					</p>

					<Instruction />
					<div className="links">
						<Link
							to={
								"https://faq.whatsapp.com/1317564962315842/?cms_platform=web&lang=ru"
							}
						>
							Нужна помощь, чтобы начать
						</Link>
						<Link to={"/login/bynumber"}>Войти по номеру телефона</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

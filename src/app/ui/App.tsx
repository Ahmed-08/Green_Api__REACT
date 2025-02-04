import React from "react";
import { Routes, Route } from "react-router-dom";
import { Aside } from "../../components/aside/Aside";
import { ChatBlock } from "../../components/chatblock/ChatBlock";
import { Root } from "./Root";
import { ByQR } from "../../pages/login/qr/ByQR";
import { ByNumber } from "../../pages/login/bynumber/ByNumber";
import { Login } from "../../pages/login/Login";
import { Confirm } from "../../pages/login/confirm/Confirm";
import { Home } from "../../pages/home/Home";

export const App: React.FC = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />}>
					<Route path="" element={<ByQR />} />
					<Route path="/login/bynumber" element={<ByNumber />} />
					<Route path="/login/confirm" element={<Confirm />}/>
				</Route>
			</Routes>
		</div>
	);
};

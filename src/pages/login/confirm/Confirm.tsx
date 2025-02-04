import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/stories/store";
import { DataType } from "../../../shared/config/types";
import { Instruction } from "../../../components/instruction/Instruction";

import './confirm.scss';
import { Link } from "react-router-dom";

export const Confirm: React.FC = () => {
    const data = useSelector<RootState, DataType>(state=>state.access.data);

	return (
		<div className="confirm">
			<div className="container">
				<h2>
					Введите код на телефоне
					<p>Связывание аккаунта WhatsApp с</p>{" "}
					<Link to={"/login/bynumber"}>(изменить)</Link>
				</h2>
				<div className="confirm__code">
					<ol>
						{data.code.split("").map((item, index) => {
							return <li key={index}>{item}</li>;
						})}
					</ol>
				</div>

				<Instruction />
			</div>
		</div>
	);
};

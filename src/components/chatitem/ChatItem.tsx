import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/stories/store";
import { ChatType } from "../../shared/config/types";
import "./chatitem.scss";

interface Props {
	isActive: boolean;
	number: string;
	onClick: () => void;
}

export const ChatItem: React.FC<Props> = ({
	number,
	isActive,
}: Props): JSX.Element => {

	return (
		<div className={`chat-item ${isActive ? "chat-item_active" : ""}`}>
			<img
				className="chat-item__pic"
				src={require("../../shared/images/user.png")}
				alt="avatar"
			/>
			<div className="chat-item__number">
				<span>{number}</span>
			</div>
		</div>
	);
};

import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/stories/store";
import {
	setapiTokenInstance,
	setapiUrl,
	setidInstance,
} from "../../domain/slices/accessSlice";
import { setJurnal, requestToAddChat } from "../../domain/slices/chatSlice";
import { ChatType } from "../../shared/config/types";
import { ChatItem } from "../chatitem/ChatItem";
import "./aside.scss";

export const Aside: React.FC<{
	setNumberPhone: Dispatch<SetStateAction<string>>;
}> = ({ setNumberPhone }) => {


	const inputRefNumber = React.useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const idInstance = useSelector<RootState, string>(
		(state) => state.access.idInstance
	);
	const apiTokenInstance = useSelector<RootState, string>(
		(state) => state.access.apiTokenInstance
	);

	const apiUrl = useSelector<RootState, string>(
		(state) => state.access.apiUrl
	);

	const chats = useSelector<RootState, ChatType[]>(
		(state) => state.chats.chats
	);

	React.useEffect(() => {
		if (sessionStorage.getItem("user") !== null) {
			const user = JSON.parse(sessionStorage.getItem("user")!);
			if (user !== null) {
				dispatch(setidInstance(user.idInstance));
				dispatch(setapiTokenInstance(user.apiTokenInstance));
				dispatch(setapiUrl(user.apiUrl));
			}
		}
	}, [idInstance, apiTokenInstance, apiUrl]);

	const addChat = () => {
		const number = "7" + inputRefNumber.current?.value;
		setNumberPhone(number);
		dispatch(
			requestToAddChat({ idInstance, apiTokenInstance, apiUrl, number })
		);
	};

	const setMessages = () => {
		const numberPhone = "7" + inputRefNumber.current?.value;
		dispatch(
			setJurnal({
				url: `${apiUrl}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
				numberPhone,
			})
		);
	};

	return (
		<div className="aside">
			<div className="container">
				<header className="aside__header">
					<h2 className="aside__title">Чаты</h2>
				</header>
				<div className="enter">
					<label htmlFor="number">
						<span>+7</span>
						<input
							type="text"
							id="number"
							ref={inputRefNumber}
							placeholder="enter the number to create a chat"
						/>
					</label>

					<img
						onClick={addChat}
						className="aside__addchat"
						src={require("../../shared/images/new-message.png")}
						alt="add chat"
					/>
				</div>
			</div>

			<div className="chats">
				{chats.map((item, index) => {
					return (
						<ChatItem
							key={index}
							isActive={false}
							number={item.number}
							onClick={setMessages}
						/>
					);
				})}
			</div>
		</div>
	);
};

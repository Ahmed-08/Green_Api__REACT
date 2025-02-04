import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../app/stories/store";
import { useSelector } from "react-redux";
import {
	setapiTokenInstance,
	setapiUrl,
	setidInstance,
} from "../../domain/slices/accessSlice";
import { MessageType } from "../../shared/config/types";
import { Message } from './Message';
import { setJurnal } from "../../domain/slices/chatSlice";
import "./chatblock.scss";

export const ChatBlock: React.FC<{ numberPhone: string }> = ({
	numberPhone,
}) => {
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

	const historyMessage = useSelector<RootState, MessageType[]>(
		(state) => state.chats.jurnal
	);

	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (sessionStorage.getItem("user") !== null) {
			const user = JSON.parse(sessionStorage.getItem("user")!);
			if (user !== null) {
				dispatch(setidInstance(user.idInstance));
				dispatch(setapiTokenInstance(user.apiTokenInstance));
				dispatch(setapiUrl(user.apiUrl));
			}
		}
	}, [idInstance, apiTokenInstance]);

	const sendMessage = async () => {
		const message = inputRef.current?.value;
		const sendUrl = `${apiUrl}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

		if (message) {
			await fetch(sendUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chatId: `${numberPhone}@c.us`,
					message,
				})
			});

			if (inputRef.current) inputRef.current.value = "";
		}
	};

	useEffect(() => {
		if (!(apiUrl && idInstance && apiTokenInstance && numberPhone)) {
			return;
		}

		const intervalId = setInterval(() => {
			try {
				dispatch(setJurnal({
					url: `${apiUrl}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
					numberPhone
				}));
			}
			catch (e) {}
		}, 2 * 1000);

		return () => clearInterval(intervalId);
	}, [apiUrl, idInstance, apiTokenInstance, numberPhone]);

	return (
		<div className="chat">
			<div className="container">
				<div className="messages__block">
					{historyMessage.map((message) =>
						<Message
							key={message.idMessage}
							message={message}
						/>
					)}
				</div>

				<div className="input-container">
					<label htmlFor="message">
						<input type="text" ref={inputRef} id="message" />
						<div
							className="send-icon" 
							onClick={sendMessage}
						>
							<img
								src={require("../../shared/images/send.png")}
								alt="Send a message"
							/>
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};

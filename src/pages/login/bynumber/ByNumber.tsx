import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../app/stories/store";
import {
	request,
	setapiTokenInstance,
	setapiUrl,
	setidInstance,
	setNumber,
} from "../../../domain/slices/accessSlice";
import { useSelector } from "react-redux";
import { DataType } from "../../../shared/config/types";
import "./byNumber.scss";

export const ByNumber: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const data = useSelector<RootState, DataType>((state) => state.access.data);
	const idInstance = useSelector<RootState, string>(
		(state) => state.access.idInstance
	);
	const apiTokenInstance = useSelector<RootState, string>(
		(state) => state.access.apiTokenInstance
	);

	const myNumber = useSelector<RootState, string>(
		(state) => state.access.myNumber
	);
	const apiUrl = useSelector<RootState, string>(
		(state) => state.access.apiUrl
	);

	const actionSubmit = (formData: FormData) => {
		dispatch(setidInstance(formData.get("idInstance")));
		dispatch(setapiTokenInstance(formData.get("apiTokenInstance")));
		dispatch(setNumber(formData.get("phone")));
		dispatch(setapiUrl(formData.get("apiUrl")));
	};

	React.useEffect(() => {

		if (apiTokenInstance !== "" && idInstance !== "" && apiUrl !== "") {
			const url = `${apiUrl}/waInstance${idInstance}/getAuthorizationCode/${apiTokenInstance}`;
			const number = Number('7' + myNumber);
			sessionStorage.setItem(
				"user",
				JSON.stringify({
					number,
					idInstance,
					apiTokenInstance,
					apiUrl,
				})
			);
			dispatch(request({ url, number }));
		}
	}, [idInstance, apiTokenInstance, apiUrl]);

	React.useEffect(() => {
		if (data.code !== "") {
			navigate("/login/confirm");
			let timeId: any;
			const getStateInstance = () => {
				
				return fetch(
					`${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
				)
					.then((response) => response.json())
					.then(({ stateInstance }: { stateInstance: string }) => {
						if (stateInstance === "authorized") {
							clearTimeout(timeId);
							navigate("/");
						} else {
							timeId = setTimeout(getStateInstance, 2000);
						}
					});
			};

			getStateInstance();
		}
	}, [data]);

	return (
		<div className="loginNumber">
			<div className="container">
				<form action={actionSubmit}>
					<label htmlFor="numberPhone">
						<span>enter number</span>
						<div className="number">
							<span className="code">+7</span>
							<input type="text" id="numberPhone" name="phone" />
						</div>
					</label>
					<label htmlFor="idInstance">
						<span>enter idInstance</span>
						<input type="text" id="idInstance" name="idInstance" />
					</label>
					<label htmlFor="apiTokenInstance">
						<span>enter apiTokenInstance</span>
						<input
							type="text"
							id="apiTokenInstance"
							name="apiTokenInstance"
						/>
					</label>
					<label htmlFor="apiUrl">
						<span>enter apiUrl</span>
						<input type="text" id="apiUrl" name="apiUrl" />
					</label>
					<input type="submit" className="button" value={"Далее"} />
				</form>
			</div>
		</div>
	);
};

import React, { JSX } from "react";
import moment from "moment";
import { MessageType } from "../../shared/config/types";
import "./message.scss";

interface Props {
  message: MessageType
};

export const Message: React.FC<Props> = ({message}: Props): JSX.Element => (
  <div className={`message message_${message.type}`}>
    <div className="message__container">
      <span className="message__text">
        {message.textMessage}
      </span>
      <span className="message__time">
        {moment(new Date(message.timestamp)).format('HH:mm')}
      </span>
    </div>
  </div>
);

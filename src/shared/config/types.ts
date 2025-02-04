export type DataType = {
	status: Boolean;
	code: string;
};

export type UserType = {
	myNumber: string;
	idInstance: string;
	apiTokenInstance: string;
	apiUrl: string;
	data: DataType;
};

export type ChatType = {
	chatId: string;
	groupInviteLink: string;
	number: string;
};

export type MessageType = {
	type: string;
	idMessage: string;
	timestamp: number;
	typeMessage: string; //"videoMessage"/`documentMessage`/`audioMessage`/`stickerMessage`
	chatId: string;
	downloadUrl: string;
	caption: string;
	fileName: string;
	jpegThumbnail: string;
	mimeType: string;
	isAnimated: false;
	isForwarded: true;
	forwardingScore: 1;
	senderId: string;
	senderName: string;
	senderContactName: string;
	textMessage: string;
};

export type NotificationType = {
	receiptId: number;
	body: {
		typeWebhook: string;
		instanceData: {
			idInstance: number;
			wid: string;
			typeInstance: string;
		};
		timestamp: number;
		idMessage: string;
		senderData: {
			chatId: string;
			sender: string;
			senderName: string;
			senderContactName: string;
		};
		messageData: {
			typeMessage: string;
			textMessageData: {
				textMessage: string;
			};
		};
	};
} | null;

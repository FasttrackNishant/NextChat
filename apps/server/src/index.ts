console.log('hello from server');

import http from 'http';
import SocketService from './services/socket';
import { Socket } from 'socket.io';

async function init() {
	// creating socket server

	const socketService = new SocketService();

	// fake http server
	const httpServer = http.createServer();
	const PORT = process.env.PORT || 8000;

	// attaching socker server on http
	socketService.io.attach(httpServer);

	httpServer.listen(PORT, () => {
		console.log('server running on ', PORT);
	});

	socketService.initListeners();
}

init();

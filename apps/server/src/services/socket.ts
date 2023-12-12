// all socket related work is here

import { Server } from 'socket.io';

class SockerService {
	// class ka instance variable
	private _io: Server;

	constructor() {
		console.log('socker server start ho gaya');
		this._io = new Server({
			cors: {
				allowedHeaders: ['*'],
				origin: '*',
			},
		});
	}

	get io() {
		return this._io;
	}

	// emitting the msg to server
	public initListeners() {
		console.log('listerens mein hu');
		const io = this.io;
		io.on('connect', (socket) => {
			console.log('new socket connected', socket.id);

			// set event liststeners
			// set event listeners
			socket.on(
				'event:message',
				async ({ message }: { message: string }) => {
					console.log('new message received', message);
				}
			);
		});
	}
}

export default SockerService;

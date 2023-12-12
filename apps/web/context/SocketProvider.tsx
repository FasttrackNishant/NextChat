'use client';

import React, { useCallback, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// ye children pass karega
interface SocketProviderProps {
	children?: React.ReactNode;
}
// ye message bhejega

interface ISocketContext {
	sendMessage: (msg: string) => any;
}

// isne context create kiya hain
const socketContext = React.createContext<ISocketContext | null>(null);

// ek custom hook banate hain

export const useSocket = () => {
	const state = useContext(socketContext);
	if (!state) throw new Error(`State mein problem hain`);
	return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	// functions for socket
	const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
		console.log('message send kar diya bhai', msg);
	}, []);

	useEffect(() => {
		const _socket = io('http://localhost:8000');

		return () => {
			_socket.disconnect();
		};
	}, []);

	return (
		<socketContext.Provider value={{ sendMessage }}>
			{children}
		</socketContext.Provider>
	);
};

export default SocketProvider;

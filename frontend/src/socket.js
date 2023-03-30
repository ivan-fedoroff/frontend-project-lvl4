import { Manager } from 'socket.io-client';

const host = window.location.href;
const manager = new Manager(host);
const socket = manager.socket('/');

export default socket;

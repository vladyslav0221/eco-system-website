import { io } from 'socket.io-client';
import { toastr } from '../utils/toastr';
import { serverURL } from '../config';
import store from '../store';
import { setActiveUser } from '../store/slice/authSlice';
import { isEmpty, localStorageUserInfo } from '.';
import { setMessageList } from '../store/slice/categorySlice';
const socket = io(isEmpty(serverURL) ? '/' : serverURL, { transports: ['websocket'] });
// socket.disconnect();
let { user_id, user_email } = localStorageUserInfo();
socket.on("connect", () => {
    console.log("connect: ", socket.id);
})

socket.on("disconnect", () =>{
    console.log("disconnect: ", socket.id);
    // setLogOut();
})

socket.on("activeUser", (data) => {
    console.log("activeUser",data);
    store.dispatch(setActiveUser(data));
})

socket.on("newMessage", () => {
    console.log("newMessage");
    let data = {user_id: user_id, user_email: user_email};
    store.dispatch(setMessageList(data));
})

export default socket;
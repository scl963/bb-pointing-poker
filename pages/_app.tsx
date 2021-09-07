import '../styles/globals.scss'
import { io } from "socket.io-client";


const socket = io(process.env.NODE_ENV === 'production' ? "https://bb-pointing-poker.herokuapp.com" : 'http://localhost:8080', {
  withCredentials: true,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} socket={socket}/>
}

export default MyApp

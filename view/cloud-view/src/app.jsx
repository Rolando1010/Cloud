import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./styles/app.module.css";
import Menu from "./components/menu";
import Routes from "./routes";
import ToastContainer from "./components/toast";

const App = () => 
    <Router>
        <Menu/>
        <Routes/>
        <ToastContainer/>
    </Router>

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
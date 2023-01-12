import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./styles/app.module.css";
import Routes from "./routes";
import Layout from "./components/layout";

const App = () =>
    <Router>
        <Layout>
            <Routes/>
        </Layout>
    </Router>

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
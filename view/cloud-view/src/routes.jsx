import { Routes as RoutesContainer, Route } from "react-router-dom";
import Home from "./pages/home";

const Routes = () =>
    <RoutesContainer>
        <Route path="/" element={<Home/>}/>
    </RoutesContainer>

export default Routes;
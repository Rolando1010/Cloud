import { Routes as RoutesContainer, Route } from "react-router-dom";
import Files from "./pages/files";
import Notes from "./pages/notes";
import Note from "./pages/note";
import NewNote from "./pages/new-note";

const Routes = () =>
    <RoutesContainer>
        <Route path="/" element={<></>}/>
        <Route path="/files" element={<Files/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/notes/new" element={<NewNote/>}/>
        <Route path="/notes/:noteId" element={<Note/>}/>
    </RoutesContainer>

export default Routes;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PlayList from "./component/music/PlayList";
import Home from "./component/music/Home";
import CreatePlaylist from "./component/music/CreatePlaylist";

function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/playlist/*" element={<PlayList/>}></Route>
      <Route path="/create/" element={<CreatePlaylist/>}></Route>
      <Route path="/musicplay/:id" element={<Home/>}></Route>
\    </Routes>
  </BrowserRouter>
  </>;
}

export default App;

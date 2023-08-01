import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../src/pages/Home";
import Filmes from "../src/pages/Filmes";
import Header from "./components/Header";
function RoutesApp (){
 return(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filme/:id" element={ <Filmes/> } />
    </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;
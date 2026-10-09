import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import AdoptPage from "../pages/AdoptPage";
import ContactPage from "../pages/ContactPage";
import DonatePage from "../pages/DonatePage";
import HelpPage from "../pages/HelpPage";
import JoinPage from "../pages/JoinPage";
import MissingPage from "../pages/MissingPage";
import VolunteeringPage from "../pages/VolunteeringPage";

const Router = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/adopt' element={<AdoptPage/>}/>
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path='/donate' element={<DonatePage/>}/>
                <Route path='/help' element={<HelpPage/>}/>
                <Route path='/join' element={<JoinPage/>}/>
                <Route path='/missing' element={<MissingPage/>}/>
                <Route path='/Volunteering' element={<VolunteeringPage/>}/>
            </Routes>
        </BrowserRouter>
  )
}
export default Router
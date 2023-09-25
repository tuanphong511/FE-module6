import Navbar from "../../components/navbar/Navbar";
import SlideShow from "../../components/slideShow/slideShow";
import ListHouse from "../../components/house/listHouse";
import FunctionBar from "../../components/functionBar/FunctionBar";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import ListHouseForUser from "../../components/house/listHouseForUser";
import NavbarForUser from "../../components/navbar/NavbarForUser";


export default function User() {
    return (
        <div>
            <div className="row">
                <NavbarForUser/>
            </div>
            <div className="row">
                <FunctionBar/>
            </div>
            <div className="row">
                <Banner/>
            </div>
            <div className="row mt-3">
                <ListHouseForUser/>
            </div>
            <div className="row mt-3">
                <Footer/>
            </div>
        </div>
    )
}
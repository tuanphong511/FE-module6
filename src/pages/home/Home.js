import Navbar from "../../components/navbar/Navbar";
import ListHouse from "../../components/house/listHouse";
import FunctionBar from "../../components/functionBar/FunctionBar";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";


export default function Home() {
    return (
        <div>
            <div className="row">
                <Navbar />
            </div>
            <div className="row">
                <FunctionBar />
            </div>
            <div className="row">
                <Banner />
            </div>
            <div className="row mt-3">
                <ListHouse />
            </div>
            <div className="row mt-3">
                <Footer />
            </div>
        </div>
    )
}
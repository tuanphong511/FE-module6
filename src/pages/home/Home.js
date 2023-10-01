import Navbar from "../../components/navbar/Navbar";
import ListHouse from "../../components/house/listHouse";
import FunctionBar from "../../components/functionBar/FunctionBar";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import { useRef } from "react";


export default function Home() {
    const bottomRef = useRef(null);
    function handleSearch() {
         bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        console.log('Function ran in Child component');
    }

    return (
        <div>
            <div className="row">
                <Navbar />
            </div>
            <div className="row">
                <FunctionBar handleSubmit={handleSearch}/>
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
            <div ref={bottomRef} />
        </div>
    )
}
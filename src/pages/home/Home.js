import Navbar from "../../components/navbar/Navbar";
import SlideShow from "../../components/slideShow/slideShow";
import ListHouse from "../../components/house/listHouse";
import FunctionBar from "../../components/functionBar/FunctionBar";


export default function Home() {
    return (
        <div>
            <Navbar />
            <FunctionBar/>
            <SlideShow/>
            <ListHouse/>
        </div>
    )
}
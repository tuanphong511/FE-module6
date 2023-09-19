import Navbar from "../../components/navbar/Navbar";
import ListHouse from "../../components/house/listHouse";
import FunctionBar from "../../components/functionBar/FunctionBar";


export default function Host() {
    return (
        <div>
            <Navbar />
            <FunctionBar/>
            <ListHouse/>
        </div>
    )
}
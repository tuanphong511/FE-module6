import ListHost from "../admin/list/ListHost";
import ListUser from "../admin/list/ListUser";
import Navbar from "../../components/navbar/Navbar";
import {Outlet} from "react-router-dom";

export default function Admin(){
    return(
        <div>

            <ListUser />
        </div>
    )
}
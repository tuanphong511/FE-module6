import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../../style.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUser} from "../../../services/userService";
import Navbar from "../../../components/navbar/Navbar";

export default function ListUser() {
    const dispatch = useDispatch()
    const [listUser, setListUser] = useState()


    useEffect(() =>{
        dispatch(getUser())
            .then((response) => {
                console.log(response)
                // Sau khi nhận được dữ liệu từ getUser, lưu danh sách người dùng vào state
                setListUser(response.payload.data);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    }, [dispatch])
    console.log(listUser)
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Link to={"/list/host"}>
                    <Button sx={{ position: "absolute", top: "20", left: "10%" }}>Danh sách chủ nhà</Button>
                </Link>
                <h3 style={{ marginTop: "20px" }}>Danh sách người dùng</h3>


            <div className="list-frame">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên tài khoản</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                        <th scope="col">
                            <Link to={"/detail/user"}>
                                <button class="btn btn-light btn-text" type="button" aria-expanded="false" >
                                    Chi tiết
                                </button>
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    { listUser && listUser.map((item,key) => {
                        if(item.role === "Người dùng") {

                                return(
                            <tbody key={key}>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.telephone}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-light dropdown-toggle btn-text" type="button"
                                                data-toggle="dropdown" aria-expanded="false">
                                            Trạng thái
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">Đang hoạt động</a>
                                            <a class="dropdown-item" href="#">Khoá</a>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <Button class="btn btn-light dropdown-toggle btn-text" type="button"
                                                data-toggle="dropdown" aria-expanded="false">
                                            Trạng thái
                                        </Button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">Khoá</a>
                                            <a class="dropdown-item" href="#">Mở khoá</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                                )
                        }
                    })}
                </table>

            </div>

            </div>
        </>
    )
}
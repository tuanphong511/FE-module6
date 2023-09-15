import "../../../style.css";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getUser} from "../../../services/userService";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Link} from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";

export default function DetailUser() {
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
    return (
        <div>
            <Navbar/>
            <h3 style={{ marginTop: "20px" }}>Thông tin người dùng</h3>

            <div className="list-frame">
                <table class="table">

                                <thead >
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ảnh đại diện</th>
                                    <th scope="col">tên tài khoản</th>
                                    <th scope="col">số điện thoại</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Số tiền đã chi tiêu</th>
                                    <th scope="col">Lịch sử thuê nhà</th>
                                </tr>
                                </thead>
                    { listUser && listUser.map((item,key) => {
                        if (item.role === 'Người dùng') {
                            return(<>
                                <tbody >
                                <tr key={key}>
                                    <th scope="row">{item.id}</th>
                                    <td>ảnh</td>
                                    <td>{item.username}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.status}</td>
                                    <td>222222</td>
                                    <td>2002-10-20 thuê căn A</td>
                                </tr>
                                </tbody>
                            </>)
                        }
                    })}
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <Link to={"/admin"}>
                    <Button variant="contained" startIcon={<KeyboardBackspaceIcon />}>Quay lại</Button>
                </Link>
            </div>
        </div>
    )
}
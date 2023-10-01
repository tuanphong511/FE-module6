import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {getHouseById, getHouses} from "../../services/houseService";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrders, getOrder} from "../../services/orderService";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function RentalHistory() {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState("")
    useEffect(() => {
        dispatch(getOrder())
            .then(res => {
                setOrders(res.payload.data)
            })
    }, [])
    console.log(orders)
    const user = useSelector(state => {
        if (state.user && state.user.user && state.user.user.message) {
            return state.user.user.message.token.idUser;
        }
        // Nếu bất kỳ một phần nào đó bị thiếu, trả về giá trị mặc định hoặc null
        return null;

    });
    const isCancelable = (checkIn) => {
        const currentDate = new Date();
        const checkInDateTime = new Date(checkIn);
        // Tính số mili giây chênh lệch giữa ngày check-in và ngày hiện tại
        const timeDifference = checkInDateTime - currentDate;
        // Chuyển đổi thành số ngày
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        // Kiểm tra xem có ít nhất 1 ngày cách hiện tại không
        return daysDifference > 1;
    };
    const {id} = useParams()
    const [Status, setStatus] = useState("");
    const updatedStatus = "Đã hủy"
    const navigate =useNavigate()



    const handleDelete = (id) =>{
        dispatch(deleteOrders(id)).then(() =>{
            console.log(id)
            const data = {
                status: updatedStatus
            }
            axios.put(`http://localhost:5000/orders/${id}`,data).then(()=>{

                setStatus(updatedStatus)
            })
            navigate(`/rental/history/${orders[0].user.id}`)
            toast.success("Hủy thuê thành công")

        })
        console.log(orders.id)
    }




    return (
        <div className="row">
            <div className="col-12" style={{padding: "0 0px"}}>
                <Navbar/>
            </div>
            <div className="col-12">
                <h3 style={{marginTop: "20px"}}>Lịch sử thuê nhà</h3>
            </div>
            <div className="col-12">
                <table class="table" style={{
                    width: "80vw",
                    height: "80vh",
                    borderRadius: "10px",
                    boxShadow: "1px 2px 9px rgb(193, 193, 193)",
                    margin: "auto"
                }}>



                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Thời gian thuê</th>
                                <th scope="col">Tên nhà</th>
                                <th scope="col">Tổng đơn</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Trạng thái đơn</th>
                                <th scope="col">Hành động</th>

                            </tr>
                            </thead>
                    {orders && orders.map((item, key) => {
                        if (item.user.id=== user ){


                        return (

                            <tbody key={key}>
                        <tr>
                            <th scope="row">{item.id}</th>

                            <td>{item.rentalTime} ngày</td>
                            <td>{item.house.name}</td>
                            <td>{item.totalMoney}</td>
                            <td>{item.house.address}</td>
                            <td>{item.status}</td>

                            {isCancelable(item.checkIn) && (
                                <td>
                                    <Button variant="outlined" onClick={handleDelete(item.id)}>Hủy thuê</Button>
                                </td>
                            )}

                        </tr>
                        </tbody>
                    )
                        }
                    })}
                </table>
            </div>
        </div>


    )
}
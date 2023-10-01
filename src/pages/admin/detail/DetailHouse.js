import Navbar from "../../../components/navbar/Navbar";
import StarIcon from '@mui/icons-material/Star';
import Footer from "../../../components/footer/Footer";
import {Button, InputAdornment, Modal, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getHouseById, getHouses, updateHouses} from "../../../services/houseService";
import {useNavigate, useParams} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import * as React from "react";
import {number} from "yup";
import {addOrders, getOrder} from "../../../services/orderService";
import {toast} from "react-toastify";
import NavbarForUser from "../../../components/navbar/NavbarForUser";
import customAxios from "../../../services/api";
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function DetailHouse() {
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const {id} = useParams()
    const userLogin = JSON.parse(localStorage.getItem("user"))

    const dispatch = useDispatch()
    const [house, setHouse] = useState("")
    useEffect(() => {
        dispatch(getHouseById(id))
            .then(res => {
                setHouse(res.payload.data)
            })
    }, [])

    const get_day_of_time = (d1, d2) => {
        if (d1 && d2) {
            let ms1 = d1.getTime();
            let ms2 = d2.getTime();
            return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
        }
    };
    console.log(get_day_of_time(selectedDateRange[0]?.$d, selectedDateRange[1]?.$d))
    let day = get_day_of_time(selectedDateRange[0]?.$d, selectedDateRange[1]?.$d)
    let serviceCharge = 50
    let result = house.price * day
    let price = result + serviceCharge
    const [Status, setStatus] = useState("");




    const navigate = useNavigate()
    const handleAddOrder = () => {
        if (selectedDateRange[0] && selectedDateRange[1]) {
            const checkIn = selectedDateRange[0].$d; // Ngày đặt
            const checkOut = selectedDateRange[1].$d; // Ngày trả phòng
            const totalMoney = price; // Giá tổng cộng
            const rentalTime = day
            const updatedStatus = "Đang cho thuê"

            const newOrder = {
                checkIn,
                checkOut,
                totalMoney,
                rentalTime,
                status: "Chờ nhận phòng",
                action: " ",
                user:  userLogin.message.token.idUser ,
                house: {id: house.id}


            };
            dispatch(addOrders(newOrder)).then((res) => {
                const  data = {
                    status:updatedStatus,
                    rentals: house.rentals + 1 ,

                }

                axios.put(`http://localhost:5000/houses/${id}`,data).then(()=>{

                    setStatus(updatedStatus)
                })
                dispatch(getOrder());
                navigate(`/detail/house/${id}`);
                toast.success("Đã đặt phòng thành công");

            });




        } else {
            alert("Vui lòng chọn ngày đặt và ngày trả phòng.");
        }
    };




    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <NavbarForUser/>
                </div>
                <div className="col-12" style={{padding: "0 6.5%", marginTop: "15px"}}>
                    <div style={{display: "flex", padding: "0 24px"}}>
                        <h2 style={{alignItems: "left"}}>{house.name}</h2>
                    </div>
                    <div style={{display: "flex", padding: "0 24px"}}>
                        <div>
                            <StarIcon sx={{color: "black"}}/>
                        </div>
                        <div>
                            4,90 .
                        </div>
                        <viv>
                            1 đánh giá .
                        </viv>

                        <div>
                            {house.address}
                        </div>
                    </div>
                </div>
                <div id="carouselExampleCaptions1" className="carousel slide" data-ride="carousel"
                     style={{marginTop: "20px", width: "85vw"}}>
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions1" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions1" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions1" data-slide-to="2"></li>

                    </ol>
                    {house && (


                        <div className="carousel-inner" style={{borderRadius: "10px"}}>
                            <div className="carousel-item active">

                                <img src={house.picture[0].picture} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={house.picture[1].picture} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={house.picture[2].picture} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions1"
                        data-slide="prev" style={{top: "475px", right: "30px"}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions1"
                        data-slide="next" style={{top: "475px", right: "30px"}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
                <div className="col-12 mt-4" style={{padding: "0 90px", display: "flex"}}>
                    <div className="col-8">
                        <div style={{display: "flex"}}>
                            <h3>Toàn bộ nhà gỗ chalet. Chủ nhà Tanja</h3>
                        </div>
                        <div style={{display: "flex"}}>

                            <div>
                                {house.numberOfBedrooms} phòng ngủ
                            </div>

                            <div style={{marginLeft:"10px"}}>
                                {house.numberOfBathrooms} phòng tắm
                            </div>
                            {/*<div>*/}
                            {/*    1 phòng tắm đầy đủ và 1 phòng vệ sinh cơ bản riêng*/}
                            {/*</div>*/}
                        </div>
                        <div style={{border: "0.5px solid gray", width: "100%", margin: "20px 0"}}></div>
                        <div style={{textAlign: "left"}}>
                            {house.description}
                        </div>
                    </div>
                    <div className="col-4">
                        <div style={{
                            width: "370px",
                            height: "460px",
                            border: "0.5px solid gray",
                            borderRadius: "10px",
                            padding: "24px",
                            boxShadow: "1px 2px 9px #DADADA"
                        }}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                                <div>
                                    {house.price}$/ đêm
                                </div>
                                <div style={{display: "flex"}}>
                                    <div>
                                        <StarIcon/> 4,90 .
                                    </div>
                                    <div>
                                        40 đánh giá
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{display: "flex", borderRadius: "10px", textAlign: "center", marginTop: "20px"}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker']}>
                                        <DateRangePicker
                                            localeText={{start: 'Check-in', end: 'Check-out'}}
                                            value={selectedDateRange}
                                            onChange={(newDateRange) => setSelectedDateRange(newDateRange)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    sx={{width: "100%", top: "15px"}}
                                    onClick={handleAddOrder}
                                >
                                    Thuê Phòng
                                </Button>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "15%"}}>
                                <div>
                                    {house.price}$/đêm x {day}
                                </div>
                                <div>
                                    {(isNaN(result)) ? "0" : result}$
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "3%"}}>
                                <div>
                                    Phí dịch vụ
                                </div>
                                <div>
                                    {serviceCharge}$
                                </div>
                            </div>
                            <div style={{border: "0.5px solid gray", width: "100%", marginTop: "10%"}}></div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "10%"}}>
                                <div>
                                    Tổng tiền
                                </div>
                                <div>
                                    {(isNaN(price)) ? "0" : price}$
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="col-12">
                        <div style={{border: "0.5px solid gray", width: "90%", margin: "5% auto"}}></div>
                    </div>
                    <div className="col-12" style={{marginTop: "3%", textAlign: "left", padding: "0 6%"}}>
                        <h3>Đánh giá</h3>
                    </div>
                    <div className="col-12" style={{with: "100%", padding: "0 5%"}}>
                        <div className="col-8" style={{marginBottom: "10%"}}>
                            <div style={{display: "flex"}}>
                                <div>
                                    <img
                                        src="https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="" style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
                                </div>
                                <div style={{textAlign: "left", marginLeft: "10px"}}>
                                    <div>
                                        <h5 style={{marginBottom: "5px"}}>Quang anh an cut</h5>
                                    </div>
                                    <div>
                                        thang 9 nam 2023
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{marginTop: "10px", textAlign: "left"}}>
                                    Quyết định ở lại đây thêm 1 đêm, một nơi tuyệt vời, một nơi rất đáng yêu, homestay
                                    nằm trong một vùng đất hình trái tim và thân thiện với môi trường.
                                </div>
                            </div>
                        </div>
                        <div className="col-8" style={{marginBottom: "10%"}}>
                            <div style={{display: "flex"}}>
                                <div>
                                    <img
                                        src="https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="" style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
                                </div>
                                <div style={{textAlign: "left", marginLeft: "10px"}}>
                                    <div>
                                        <h5 style={{marginBottom: "5px"}}>Anh Phong an cut</h5>
                                    </div>
                                    <div>
                                        thang 9 nam 2023
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{marginTop: "10px", textAlign: "left"}}>
                                    Quyết định ở lại đây thêm 1 đêm, một nơi tuyệt vời, một nơi rất đáng yêu, homestay
                                    nằm trong một vùng đất hình trái tim và thân thiện với môi trường.
                                </div>
                            </div>
                        </div>
                        <div className="col-8" style={{marginBottom: "10%"}}>
                            <div style={{display: "flex"}}>
                                <div>
                                    <img
                                        src="https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="" style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
                                </div>
                                <div style={{textAlign: "left", marginLeft: "10px"}}>
                                    <div>
                                        <h5 style={{marginBottom: "5px"}}>Quang anh an cut</h5>
                                    </div>
                                    <div>
                                        thang 9 nam 2023
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{marginTop: "10px", textAlign: "left"}}>
                                    Quyết định ở lại đây thêm 1 đêm, một nơi tuyệt vời, một nơi rất đáng yêu, homestay
                                    nằm trong một vùng đất hình trái tim và thân thiện với môi trường.
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <TextField
                                id="standard-basic"
                                label="Nhập đánh giá"
                                variant="standard"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SendIcon sx={{cursor: "pointer", color: "#1a77f1"}}/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12" style={{marginTop: "20px"}}>
                    <div className="col-12">
                        <div style={{border: "0.5px solid gray", width: "90%", margin: "3% auto"}}></div>
                    </div>
                    <div className="col-12" style={{marginTop: "3%", textAlign: "left", padding: "0 6%"}}>
                        {house && (
                            <div style={{display: "flex"}}>

                                <div>
                                    <img src={house?.user?.avatar} alt="error"
                                         style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
                                </div>
                                <div style={{textAlign: "left", marginLeft: "10px"}}>
                                    <div>

                                        <h4 style={{margin: "0"}}>Chủ nhà {house.user.fullName}</h4>

                                    </div>
                                    <div>
                                        Đã tham gia vào tháng 8 năm 2015
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row" style={{marginTop: "10px", padding: "0 5%"}}>
                        <div className="col-5">
                            <div style={{textAlign: "left"}}>
                                Tôi đã làm việc hơn 12 năm trong ngành dịch vụ lưu trú và bây giờ tôi đã quyết định mở
                                một nhà nghỉ nhỏ thân thiện với môi trường ở trung tâm Ubud, nơi tôi có thể chào đón
                                khách và… Tìm hiểu thêm
                                Mega là một Chủ nhà siêu cấp
                                Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao và cam kết mang lại kỳ
                                nghỉ tuyệt vời cho khách.
                            </div>
                        </div>
                        <div className="col-7" style={{textAlign: "left", maxWidth: "27%", marginLeft: "10%"}}>
                            <div style={{paddingBottom: "16px"}}>
                                Tỉ lệ phản hồi: 100%
                            </div>
                            <div style={{paddingBottom: "16px"}}>
                                Thời gian phản hồi: trong vòng một giờ
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    type="button"
                                >
                                    Liên hệ với chủ nhà
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12" style={{padding: "0", marginTop: "50px"}}>
                    <Footer/>
                </div>
            </div>

        </div>
    )
}
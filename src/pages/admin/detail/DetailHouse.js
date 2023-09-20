import Navbar from "../../../components/navbar/Navbar";
import StarIcon from '@mui/icons-material/Star';
import Footer from "../../../components/footer/Footer";
import { Box, Modal } from "@mui/material";
import React, { useState } from 'react';
import BasicDateRangePicker from "../../../components/selectDatetime";

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
    return (
        <div className="row">
            <div className="col-12">
                <Navbar />
            </div>
            <div className="col-12" style={{ padding: "0 100px" }}>
                <div style={{ display: "flex", padding: "0 24px" }}>
                    <h2 style={{ alignItems: "left" }}>Nhà gỗ chalet sáng sủa và hiện đại gần khu trượt tuyết và tiện nghi</h2>
                </div>
                <div style={{ display: "flex", padding: "0 24px" }}>
                    <div>
                        <StarIcon sx={{ color: "black" }} />
                    </div>
                    <div>
                        4,90 .
                    </div>
                    <viv>
                        1 đánh giá .
                    </viv>
                    <div>
                        Chu nha sieu cap .
                    </div>
                    <div>
                        ha noi
                    </div>
                </div>
            </div>
            <div id="carouselExampleCaptions1" className="carousel slide" data-ride="carousel" style={{ marginTop: "20px", width: "85vw"}}>
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions1" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions1" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions1" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" style={{ borderRadius: "10px" }}>
                    <div className="carousel-item active">
                        <img src="https://www.homelane.com/blog/wp-content/uploads/2022/11/single-floor-house-design.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.homelane.com/blog/wp-content/uploads/2022/11/single-floor-house-design.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.homelane.com/blog/wp-content/uploads/2022/11/single-floor-house-design.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions1" data-slide="prev" style={{top: "475px", right: "30px"}}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions1" data-slide="next" style={{top: "475px", right: "30px"}}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </button>
            <div className="col-12 mt-4" style={{ padding: "0 90px", display: "flex" }}>
                <div className="col-8">
                    <div style={{ display: "flex" }}>
                        <h3>Toàn bộ nhà gỗ chalet. Chủ nhà Tanja</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div>
                            7 khach .
                        </div>
                        <div>
                            4 phong ngu .
                        </div>
                        <div>
                            7 giuong .
                        </div>
                        <div>
                            1 phòng tắm đầy đủ và 1 phòng vệ sinh cơ bản riêng
                        </div>
                    </div>
                    <div style={{ border: "0.5px solid gray", width: "100%", margin: "20px 0" }}></div>
                    <div style={{ textAlign: "left" }}>
                        Một số thông tin đã được dịch tự động. Hiển thị ngôn ngữ gốc
                        Đây là nhà gỗ 4 phòng ngủ chất lượng cao và được trang bị đầy đủ tiện nghi tại khu nghỉ dưỡng trượt tuyết Lapland xinh đẹp và khu nghỉ dưỡng trượt tuyết lớn nhất Phần Lan Levi.

                        200m đến dốc, trạm xe buýt trượt tuyết bên cạnh và làng Levi cách đó 10 phút.

                        Nhà gỗ chalet có bếp/phòng chờ mở rộng rãi, với cửa sổ lớn để tận hưởng tầm nhìn đẹp.
                    </div>
                </div>
                <div className="col-4">
                    <div style={{ width: "390px", height: "480px", border: "0.5px solid gray", borderRadius: "10px", padding: "24px", boxShadow: "1px 2px 9px #DADADA" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                $101 / đêm
                            </div>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <StarIcon /> 4,90 .
                                </div>
                                <div>
                                    40 đánh giá
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", borderRadius: "10px", textAlign: "center", marginTop: "20px" }}>
                            <BasicDateRangePicker />
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-12" style={{ padding: "0", marginTop: "20px" }}>
                <Footer />
            </div>
        </div>
    )
}
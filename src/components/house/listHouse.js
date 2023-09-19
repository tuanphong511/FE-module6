import "../../style.css";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
export default function ListHouse() {
    const navigate = useNavigate();

    const handleDetail = () => {
            navigate('/detail/house');
        }

    return (
        <>
            <div className="col-3" style={{ marginLeft: "30px", margin: "10px 30px", cursor: "pointer" }}>
                <div class="card" style={{ width: "18rem", borderRadius: "10px" }}>
                    <div id="home1" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#home1" data-slide-to="0" class="active"></li>
                            <li data-target="#home1" data-slide-to="1"></li>
                            <li data-target="#home1" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner" onClick={(e) => {
                            handleDetail(e)
                        }}>
                            <div class="carousel-item active">
                                <img class="d-block" style={{ borderRadius: "10px", height: "270px", width: "280px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW5_4HObJCUd9vscLQBxu6zndM3fnXr6z98g&usqp=CAU" alt="First slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block" style={{ borderRadius: "10px", height: "270px", width: "280px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW5_4HObJCUd9vscLQBxu6zndM3fnXr6z98g&usqp=CAU" alt="Second slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block" style={{ borderRadius: "10px", height: "270px", width: "280px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW5_4HObJCUd9vscLQBxu6zndM3fnXr6z98g&usqp=CAU" alt="Third slide" />
                            </div>
                        </div>
                        <a class="control-prev" href="#home1" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="control-next" href="#home1" role="button" data-slide="next" >
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <div class="card-body" style={{ textAlign: "left" }} onClick={(e) => {
                            handleDetail(e)
                        }}>
                        <h5 class="card-title">ten nha</h5>
                        <p class="card-text">dia chi</p>
                    </div>
                </div>
            </div>
        </>
    )
}
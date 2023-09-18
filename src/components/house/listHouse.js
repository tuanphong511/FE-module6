import "../../style.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getHouses} from "../../services/houseService";
export default function ListHouse() {
    const houses = useSelector((state) =>{
        return state.houses.houses
    })
    const pictures = useSelector((state) =>{
        return state.pictures.pictures
    })

    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getHouses())
    }, [])
    console.log(houses)

    return (
        <>
            {houses.map((item, key) => (
                <div className="col-3 mt-4" style={{ maxWidth: "17%" }} key={key}>
                    <div className="card" style={{ width: "18rem" }}>
                        <div id={`home${key}`} className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                {item.picture.map((picture, index) => (
                                    <li
                                        key={index}
                                        data-target={`#home${key}`}
                                        data-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                    ></li>
                                ))}
                            </ol>
                            <div className="carousel-inner">
                                {item.picture.map((picture, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <img className="d-block w-100" src={picture.picture} alt={`Slide ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href={`#home${key}`}
                                role="button"
                                data-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href={`#home${key}`}
                                role="button"
                                data-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}
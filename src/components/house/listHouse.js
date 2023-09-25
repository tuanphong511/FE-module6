import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHouses } from "../../services/houseService";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
export default function ListHouse() {
  const houses = useSelector((state) => {
    return state.houses.houses;
  });
  const user = useSelector((state) => {
   
    if (state.user && state.user.user && state.user.user.message) {
      return state.user.user.message.token.idUser;
    }
    // Nếu bất kỳ một phần nào đó bị thiếu, trả về giá trị mặc định hoặc null
    return null;
  });

  const navigate = useNavigate();

  const handleDetail = () => {
    navigate("/detail/house");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHouses());
  }, []);
  console.log(houses, "houses");

  return (
    <>
      {houses.map((item, key) => {
        if (item.user?.id === user) {
          console.log(item);
          return (
            
            <div
              className="col-3 p-5"
              style={{ cursor: "pointer", marginTop: "10px" }}
              
            >
              <div
                className="card"
                style={{ width: "20rem", borderRadius: "10px" }}
              >
                <div
                  id={`home${key}`}
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    {item.picture && Array.isArray(item.picture) ? (
                      item.picture.map((picture, index) => (
                        <li
                          key={index}
                          data-target={`#home${key}`}
                          data-slide-to={index}
                          className={index === 0 ? "active" : ""}
                        ></li>
                      ))
                    ) : (
                      // Handle the case when item.picture is not defined or not an array
                      <li>No pictures available</li>
                    )}
                  </ol>
                  <div
                    className="carousel-inner"
                    onClick={(e) => {
                      handleDetail(e);
                    }}
                  >
                    { Array.isArray(item.picture) && item.picture.map((picture, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          className="d-block w-100"
                          src={picture.picture}
                          style={{
                            borderRadius: "10px",
                            height: "270px",
                            width: "280px",
                          }}
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <a
                    className="carousel-control-prev"
                    href={`#home${key}`}
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href={`#home${key}`}
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                <div
                  className="card-body"
                  style={{ textAlign: "left" }}
                  onClick={(e) => {
                    handleDetail(e);
                  }}
                >
                  <h5 className="card-title">{item.name}</h5>
                  <h5 className="card-title">{item.address}</h5>
                  <h5 className="card-title">{item.price} / đêm</h5>
                  <p className="card-text">{item.description}</p>
                </div>

                <div>
                  <Link to={`/edit-houses/${item.id}`}>
                    <Button variant="text">Sửa</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
}

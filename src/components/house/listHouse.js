import "../../style.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getHouses} from "../../services/houseService";
export default function ListHouse() {
    const houses = useSelector((state) =>{
        return state.houses.houses
    })
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getHouses())
    }, [])
    return (
        <div>
            {houses.map((item,key) =>(
        <div className="list-house">
            <div className="list-item">
                <div className="image-house" key={key}>
                    <img
                        src={item.avatar}
                        alt="error"
                        style={{ width: "300px", height: "300px", borderRadius: "10px" }}
                    />
                </div>
                <div className="information-house">
                    <div>
                        {item.name}
                    </div>
                    <div>
                        {item.address}
                    </div>
                    <div>
                        {item.price}
                    </div>
                </div>
            </div>
            <div className="list-item">
                <div className="image-house">
                    <img
                        src="https://i.ytimg.com/vi/lSDDtx9QkjQ/oar2.jpg?sqp=-oaymwEVCJUDENAFSFryq4qpAwcIARUAAIhC&rs=AOn4CLDodKcFykg4BjLsAhMhmiOJkoMUkg"
                        alt="error"
                        style={{ width: "300px", height: "300px", borderRadius: "10px" }}
                    />
                </div>
                <div className="information-house">
                    <div>
                        name
                    </div>
                    <div>
                        ha noi
                    </div>
                    <div>
                        gia tien
                    </div>
                </div>
            </div>


        </div>
            ))}
        </div>
    )
}
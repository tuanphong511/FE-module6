import "./listHouse.css"
export default function ListHouse(){
    return(
        <div className={"bigItem"}>
            <div className={"item1"}>

                <div className={"small-item1"}>
                    <p>ảnh đại diêện</p>
                </div>
                <div className={"item2"}>
                    <div className={"small_item1"}><p>tên phòng</p></div>
                    <div className={"small_item1"}><p>date</p></div>
                    <div className={"small_item1"}><p>200$</p></div>
                    <div className={"small_item1"}><p>xem chi tiết</p></div>

                </div>
            </div>
        </div>
    )
}
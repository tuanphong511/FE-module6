import Navbar from "../../../components/navbar/Navbar";
import StarIcon from '@mui/icons-material/Star';

export default function DetailHouse() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar />
            </div>
            <div className="col-12" style={{ padding: "0 100px" }}>
                <div style={{ display: "flex" }}>
                    <h2 style={{ alignItems: "left" }}>Nhà gỗ chalet sáng sủa và hiện đại gần khu trượt tuyết và tiện nghi</h2>
                </div>
                <div style={{ display: "flex" }}>
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
            <div id="carouselExampleCaptions1" className="carousel slide" data-ride="carousel" style={{ marginTop: "20px" }}>
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
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions1" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions1" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </button>
            {/* <div className="col-12">
                <div className="col-8">

                </div>
                <div className="col-4">

                </div>
            </div> */}
        </div>
    )
}
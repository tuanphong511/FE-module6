import "../../style.css";

export default function Banner() {
    return (
        <div className="col-12">
            <div id="carouselExampleCaptions1" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions1" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions1" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions1" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
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
                            <div className="carousel-caption d-none d-md-block" />
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
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
        </div>
    )
}
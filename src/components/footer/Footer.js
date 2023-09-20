export default function Footer() {
    return (
        <div className="col-12">
            <div class="container1" style={{ width: "100%"}}>
                <footer
                    class="text-center text-lg-start text-dark"
                    style={{ backgroundColor: "#ECEFF1" }}
                >

                    <section class="section1">
                        <div class="container text-center text-md-start mt-5">
                            <div class="row mt-3">
                                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h6 class="text-uppercase fw-bold">Tên công ty</h6>
                                    <hr
                                        class="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                    />
                                    <p>
                                        CÔNG TY ĐỨC VIỆT
                                        <br/>
                                        Công ty hiện đã hoạt động và làm việc 10 năm ,
                                        đạt nhiều lượt đánh giá tốt. Công ty được rất
                                        nhiều người tin tưởng
                                    </p>
                                </div>
                                {/*<div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">*/}
                                {/*    <h6 class="text-uppercase fw-bold">Products</h6>*/}
                                {/*    <hr*/}
                                {/*        class="mb-4 mt-0 d-inline-block mx-auto"*/}
                                {/*        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}*/}
                                {/*    />*/}
                                {/*    <p>*/}
                                {/*        <a href="#!" class="text-dark">MDBootstrap</a>*/}
                                {/*    </p>*/}
                                {/*    <p>*/}
                                {/*        <a href="#!" class="text-dark">MDWordPress</a>*/}
                                {/*    </p>*/}
                                {/*    <p>*/}
                                {/*        <a href="#!" class="text-dark">BrandFlow</a>*/}
                                {/*    </p>*/}
                                {/*    <p>*/}
                                {/*        <a href="#!" class="text-dark">Bootstrap Angular</a>*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 class="text-uppercase fw-bold">Tiện ích</h6>
                                    <hr
                                        class="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                    />

                                    <p>
                                        <a href="#!" class="text-dark">Giới thiệu</a>
                                    </p>
                                    <p>
                                        <a href="#!" class="text-dark">Chủ công ty</a>
                                    </p>
                                    <p>
                                        <a href="#!" class="text-dark">Hỗ trợ</a>
                                    </p>
                                </div>
                                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 class="text-uppercase fw-bold">Liên lạc</h6>
                                    <hr
                                        class="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                                    />
                                    <p><i class="fas fa-home mr-3"></i> CodeGym , Mỹ Đình , Hà Nội</p>
                                    <p><i class="fas fa-envelope mr-3"></i>haducbaoviet@gmail.com </p>
                                    <p><i class="fas fa-phone mr-3"></i> 0869 854 360</p>

                                </div>
                            </div>
                        </div>
                    </section>
                </footer>
            </div>
        </div>
    )
}
import {Button, Grid, TextField} from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import {useDispatch} from "react-redux";
import {addHouses, getHouses} from "../../../services/houseService";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {addPictures} from "../../../services/pictureService";
import axios from "axios";

export default function FormAddHouse() {
    const a = JSON.parse(localStorage.getItem("user"));
    const [imageUpload, setImageUpload] = useState([]);
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        address: "",
        numberOfBedrooms: "",
        numberOfBathrooms: "",
        description: "",
        price: "",
        status: "",
        rentals:"",
        user : {
            id : 1
        }
    });

    const [imgStatus, setImgStatus] = useState([]);
    console.log(imgStatus,"img")

    const uploadFiles = () => {
        if (imageUpload.length === 0) return;

        const uploadPromises = [];
        const uploadedFileUrls = [];

        for (const file of imageUpload) {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadPromises.push(
                new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const percent = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            setPercent(percent);
                        },
                        (err) => {
                            console.error(err);
                            reject(err);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((url) => {
                                    uploadedFileUrls.push(url);
                                    resolve(url);
                                })
                                .catch((error) => {
                                    console.error(error);
                                    reject(error);
                                });
                        }
                    );
                })
            );
        }

        // Chạy tất cả các promise để đợi tải lên hoàn tất
        Promise.all(uploadPromises)
            .then(() => {
                // Lưu danh sách URL của các tệp đã tải lên vào mảng imgStatus
                setImgStatus(uploadedFileUrls);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error uploading files:", error);
            });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let newHouseId; // Biến lưu id của nhà mới được tạo

    const handleAdd = () => {
        if (
            !values.name ||
            !values.address ||
            !values.numberOfBedrooms ||
            !values.numberOfBathrooms ||
            !values.description ||
            !values.price ||
            // !values.status ||
            // !values.rentals ||
            imgStatus.length === 0
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin và tải lên ít nhất một hình ảnh.");
            return;
        }

        // Thêm nhà mới
        let houseData = {
            name: values.name,
            address: values.address,
            numberOfBedrooms: values.numberOfBedrooms,
            numberOfBathrooms: values.numberOfBathrooms,
            description: values.description,
            price: values.price,
            status: values.status,
            rentals:values.rentals,
            picture: imgStatus,
            userId : a.message.token.idUser
            // order:{id: values.payload.id}
        };
        console.log(houseData,"user house")


        dispatch(addHouses(houseData))
            .then((houseRes) => {
                // Lấy id của nhà mới được tạo
                newHouseId = 1
                // Tạo mảng promise để thêm các đường dẫn hình ảnh vào bảng Picture
                const addPicturePromises = imgStatus.map((imageUrl) => {

                    // Thêm id của nhà vào dữ liệu ảnh
                    const pictureData = {
                        picture: imageUrl,
                        house: {id: houseRes.payload[houseRes.payload.length - 1].id},
                       // Sử dụng id của nhà mới
                    };
                    console.log(pictureData,"pic")
                    // Thêm ảnh vào bảng Picture
                    return dispatch(addPictures(pictureData))
                        .then((res) => {
                            // Trong đây, bạn có thể làm gì đó nếu cần
                        })
                        .catch((error) => {
                            console.error("Error adding picture:", error);
                        });
                });

               setTimeout(()=> {
                   dispatch(getHouses());
                   console.log(1)
                   toast.success("Đã thêm thành công");
                   navigate("/host");
               },500)
                // Chạy tất cả các promise để đợi thêm các đường dẫn hình ảnh hoàn tất
                return Promise.all(addPicturePromises);
            }).catch((e) => {
        }).then((res) => {
            // console.log(res)
            // Tất cả ảnh đã được thêm vào nhà mới thành công
        }).catch((error) => {
            console.error("Error adding house:", error);
        });
    };


    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFiles();
        }
    }, [imageUpload]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,

            [name]: value,
        });
    };

    return (
        <div className="form-add-house">
            <Navbar/>
            <h2>Đăng nhà cho thuê</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        label="Tên nhà"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        label="Địa chỉ"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        type="number"
                        label="Số Lượng phòng ngủ"
                        name="numberOfBedrooms"
                        value={values.numberOfBedrooms}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        type="number"
                        label="Số Lượng phòng tắm"
                        name="numberOfBathrooms"
                        value={values.numberOfBathrooms}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        label="Mô tả"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{width: "500px"}}
                        label="Giá tiền"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*    <TextField*/}
                {/*        sx={{width: "500px"}}*/}
                {/*        label="Trạng thái"*/}
                {/*        name="status"*/}
                {/*        value={values.status}*/}
                {/*        onChange={handleInputChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <input
                        style={{width: "500px"}}
                        id="avatar"
                        type="file"
                        name="picture"
                        onChange={(event) => {
                            setImageUpload(Array.from(event.target.files));
                        }}
                        multiple
                        required
                    />
                    {isLoading && (
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{width: `${percent}%`}}
                                aria-valuenow={percent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                {percent}%
                            </div>
                        </div>
                    )}
                    {imgStatus.length > 0 &&
                        !isLoading &&
                        imgStatus.map((url, index) => (
                            <img style={{width: "100px", height: "100px"}} key={index} src={url} alt={`Image ${index}`}/>
                        ))}
                </Grid>
            </Grid>
            <Button
                type="button"
                variant="contained"
                sx={{marginTop: "10px", width: "500px"}}
                onClick={handleAdd}
            >
                Thêm nhà
            </Button>
        </div>
    );
}

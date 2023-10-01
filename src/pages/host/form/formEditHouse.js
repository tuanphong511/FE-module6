import { Box, Button, Grid, TextField } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addHouses, getHouses, updateHouses } from "../../../services/houseService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase";
import customAxios from "../../../services/api";

export default function FormEditHouse() {
    let a = JSON.parse(localStorage.getItem("user"));
    const [imageUpload, setImageUpload] = useState(null);
    const [percent, setPercent] = useState(0);
    const [urlFile, setUrlFile] = useState("");
    const [idPicture, setIdPicture] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        address: "",
        numberOfBedrooms: "",
        numberOfBathrooms: "",
        description: "",
        price: "",
        status: "",
        rentals: ""
    });

    const uploadFile = () => {
        if (imageUpload == null) return;
        const storageRef = ref(storage, `/file/${imageUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageUpload);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.error(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrlFile(url);
                    setIsLoading(false);
                });
            }
        );
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        try {
            customAxios.get(`/houses/${id}`).then(res => {
                setValues(res.data)
                console.log("res", res.data)
                setUrlFile(res.data.picture[0].picture);
                setIdPicture(res.data.picture[0].id);
                return res.data
            })
        }
        catch (err) {
            console.log("error", err);
        }
    }, [])

    const handleEdit = async () => {
        let data = {
            name: values.name,
            address: values.address,
            numberOfBedrooms: values.numberOfBedrooms,
            numberOfBathrooms: values.numberOfBathrooms,
            description: values.description,
            price: values.price,
            status: values.status,
            rentals:values.rentals,
            user: { id: a.message.token.idUser }
        };
        let dataPicture = {
            picture: urlFile
        }
        console.log("data: ", data);

        customAxios.put(`/houses/${id}`, data).then((res) => {
            console.log(res)
            toast.success("Sửa thành công");
            navigate("/")
        })
        const resPicture = await customAxios.put(`/pictures/${idPicture}`, dataPicture);
        if (resPicture.data) {
            toast.success("Sửa thành công");
            navigate('/')
        } else {
            console.error(resPicture.error);
        }
    };

    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFile();
        }
    }, [imageUpload]);

    return (
        <div className="form-add-house">
            <Navbar />
            <div style={{marginTop: "3%"}}>
            <h2>Sửa thông tin nhà</h2>
            <Box initialValues={values} enableReinitailize={true} onSubmit={handleEdit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            sx={{ width: "500px" }}
                            label="Tên nhà"
                            name="name"
                            value={values.name}
                            onChange={(e) => setValues({...values, name: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            label="Địa chỉ"
                            name="address"
                            value={values.address}
                            onChange={(e) => setValues({...values, address: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            type="number"
                            label="Số Lượng phòng ngủ"
                            name="numberOfBedrooms"
                            value={values.numberOfBedrooms}
                            onChange={(e) =>setValues({...values, numberOfBedrooms: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            type="number"
                            label="Số Lượng phòng tắm"
                            name="numberOfBathrooms"
                            value={values.numberOfBathrooms}
                            onChange={(e) => setValues({...values, numberOfBathrooms: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            label="Mô tả"
                            name="description"
                            value={values.description}
                            onChange={(e) => setValues({...values, description: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            label="Giá tiền"
                            name="price"
                            value={values.price}
                            onChange={(e) =>setValues ({...values, price: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            label="trạng thái"
                            name="status"
                            value={values.status}
                            onChange={(e) => setValues ({...values, status: e.target.value})}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            style={{ width: "500px" }}
                            id="avatar"
                            type="file"
                            name="avatar"
                            onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}
                            required
                            multiple
                        />
                        {isLoading && (
                            <div className="progress mt-2" style={{ width: "26.5%", margin: "0 auto"}}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${percent}%` }}
                                    aria-valuenow={percent}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {percent}%
                                </div>
                            </div>
                        )}

                    </Grid>
                    <Grid item xs={12}>
                        {urlFile && !isLoading && <img src={urlFile} alt="" style={{width: "100px", height: "100px", margin: "0 10px"}} />}
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    variant="contained"
                    sx={{ marginTop: "10px", width: "500px" }}
                    onClick={handleEdit}
                >
                    Sửa thông tin nhà
                </Button>
            </Box>
            </div>
        </div>
    );
}
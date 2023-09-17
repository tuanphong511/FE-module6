import { Button, Grid, TextField } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addHouses, getHouses } from "../../../services/houseService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase";

export default function FormAddHouse() {
    let a = JSON.parse(localStorage.getItem("user"));
    const [imageUpload, setImageUpload] = useState(null);
    const [percent, setPercent] = useState(0);
    const [urlFile, setUrlFile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        address: "",
        numberOfBedrooms: "",
        numberOfBathrooms: "",
        description: "",
        price: "",
        status:""
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

    const handleAdd = () => {
        if (!values.name || !values.address || !values.numberOfBedrooms || !values.numberOfBathrooms || !values.description || !values.price || !values.status || !urlFile) {
            toast.error("Vui lòng điền đầy đủ thông tin và tải lên một hình ảnh.");
            return;
        }

        let data = {
            name: values.name,
            address: values.address,
            numberOfBedrooms: values.numberOfBedrooms,
            numberOfBathrooms: values.numberOfBathrooms,
            description: values.description,
            price: values.price,
            status:values.status,
            avatar: urlFile,
            user: { id: a.message.token.idUser },

        };

        dispatch(addHouses(data)).then((res) => {
            dispatch(getHouses());
            navigate("/");
            toast.success("Đã thêm thành công");
        });
    };

    useEffect(() => {
        if (imageUpload) {
            setIsLoading(true);
            uploadFile();
        }
    }, [imageUpload]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div className="form-add-house">
            <Navbar />
            <h2>Thêm nhà mới</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: "500px" }}
                        label="Tên nhà"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: "500px" }}
                        label="Địa chỉ"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: "500px" }}
                        label="Mô tả"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: "500px" }}
                        label="Giá tiền"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: "500px" }}
                        label="trạng thái"
                        name="status"
                        value={values.status}
                        onChange={handleInputChange}
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
                    />
                    {isLoading && (
                        <div className="progress">
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
                    {urlFile && !isLoading && <img src={urlFile} alt="" />}
                </Grid>
            </Grid>
            <Button
                type="button"
                variant="contained"
                sx={{ marginTop: "10px", width: "500px" }}
                onClick={handleAdd}
            >
                Thêm nhà
            </Button>
        </div>
    );
}

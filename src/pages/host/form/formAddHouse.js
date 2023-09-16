import { Button, Grid, TextField } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";

export default function FormAddHouse() {
    return (
        <div className="form-add-house">
            <Navbar />
            <h2>Thêm nhà mới</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} label="Tên nhà" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} label="Địa chỉ" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} type="number" label="Số Lượng phòng ngủ" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} type="number" label="Số Lượng phòng tắm" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} label="Mô tả" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} label="Giá tiền" />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{ width: "500px" }} type="file" />
                </Grid>
            </Grid>
            <Button
                type="button"
                variant="contained"
                sx={{marginTop: "10px", width: "500px"}}
            >
                Thêm nhà
            </Button>
        </div>
    )
}

import "./FunctionBar.css";
import "../../style.css";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSelector, useDispatch } from "react-redux";
import { handleSearch } from "../../services/houseService";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function FunctionBar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const houses = useSelector((state) => {
        console.log(state, "stateeeeeeee")
        return state.houses.houses;
    });
    console.log(houses,111111)
    const user = useSelector((state) => {
        if (state.user && state.user.user && state.user.user.message) {
            return state.user.user.message.token.idUser;
        }
        // Nếu bất kỳ một phần nào đó bị thiếu, trả về giá trị mặc định hoặc null
        return null;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleSearch());
    }, []);
    console.log(houses, "houses111111");
    console.log(user, "user1111");

    return (
        <div className={"col-12"}>
            <div className="btn-search-category">
        <span>
          <img
              src="https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
              alt="err"
          />
          <div>Grand piano</div>
        </span>
                <span>
          <img
              src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
              alt="err"
          />
          <div>Hồ bơi</div>
        </span>
                <span>
          <img
              src="https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg"
              alt="err"
          />
          <div>Hồ bơi</div>
        </span>
                <span>
          <img
              src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"
              alt="err"
          />
          <div>Hồ bơi</div>
        </span>
                <span>
          <Button onClick={handleOpen} variant="outlined">
            <TuneSharpIcon fontSize="large" sx={{ color: "black" }} />
          </Button>
          <div>Bộ lọc</div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Bộ Lọc
              </Typography>
              <Typography sx={{ marginRight: " 442px" }}>
                Lọc theo một khoảng thời gian
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangePicker"]}>
                  <DateRangePicker
                      localeText={{ start: "Check-in", end: "Check-out" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Tên nhà"
                    variant="outlined"
                    sx={{ marginRight: "68%", width: " 100%" }}
                />
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Địa chỉ"
                    variant="outlined"
                    sx={{ marginRight: "68%", width: " 100%" }}
                    type="text"
                    placeholder="Search by address"

                />
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Số lượng phòng ngủ
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Số lượng phòng ngủ"
                    onChange={handleChange}
                >
                  <MenuItem value={10}>1 phòng ngủ</MenuItem>
                  <MenuItem value={20}>2 phòng ngủ</MenuItem>
                  <MenuItem value={30}>3 phòng ngủ</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Số lượng phòng tắm
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Số lượng phòng tắm"
                    onChange={handleChange}
                >
                  <MenuItem value={10}>1 phòng tắm</MenuItem>
                  <MenuItem value={20}>2 phòng tắm</MenuItem>
                  <MenuItem value={30}>3 phòng tắm</MenuItem>
                </Select>
              </FormControl>

              <Button
                  variant="contained"
                  sx={{ mt: 2, width: "100%" }}
                  onClick={handleSearch}
              >
                Hiển thị kết quả
              </Button>
            </Box>
          </Modal>
        </span>
            </div>
        </div>
    );
}
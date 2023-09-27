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
import { useDispatch } from "react-redux";
import { handleSearch } from "../../services/houseService";
import dayjs from "dayjs";

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
    const [time, setTime] = useState([dayjs(), dayjs()]);
    const [homeName, setHomeName] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [bath, setBath] = React.useState("");
    const [bad, setBad] = React.useState("");
    const [address, setAddress] = useState("");
    const [houses, setHouses] = useState([]);


    console.log(bath, "bath");
    console.log(bad, "bad");

    const dispatch = useDispatch();
    const onSubmit = () => {
      const [startTime, endTime] = time;
        const dataSearch = {
          address,
          homeName,
          bath,
          bad,
          startTime: startTime.format('YYYY-MM-DD HH:mm'),
          endTime: endTime.format('YYYY-MM-DD HH:mm')
        }
        console.log(dataSearch,'click');
        dispatch(handleSearch(dataSearch)).then((res) => {
          console.log(res.payload.data, 'res');
            // setaddress(res.payload.data);
            setHouses(res.payload.data);
            console.log(houses, 'houses');
        });
    };

    const searchHouses = houses.map((house, i) => {
      return (
        <div>
          { house.name } - { house.address }
        </div>
      );
    });
    // useEffect(() => {

    // }, [searchAddress]);
    return (
        <div className={"col-12"}>
          
            <div className="btn-search-category">
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
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  mb={3}
              >
                Bộ Lọc
              </Typography>
              { searchHouses }
              <Typography sx={{ marginRight: " 442px" }}></Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
            value={time}
            onChange={(newValue) => setTime(newValue)}
            localeText={{ start: "Check-in", end: "Check-out" }}
        />
                </DemoContainer>
              </LocalizationProvider>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                    value={ homeName }
                    onChange={(event) => setHomeName(event.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Số lượng phòng ngủ
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bad}
                    label="Số lượng phòng ngủ"
                    onChange={(e) => setBad(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1 phòng ngủ</MenuItem>
                  <MenuItem value={2}>2 phòng ngủ</MenuItem>
                  <MenuItem value={3}>3 phòng ngủ</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Số lượng phòng tắm
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bath}
                    label="Số lượng phòng tắm"
                    onChange={(e) => setBath(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1 phòng tắm</MenuItem>
                  <MenuItem value={2}>2 phòng tắm</MenuItem>
                  <MenuItem value={3}>3 phòng tắm</MenuItem>
                </Select>
              </FormControl>

              <Button
                  variant="contained"
                  sx={{ mt: 2, width: "100%" }}
                  onClick={() => onSubmit()}
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
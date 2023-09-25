import "./FunctionBar.css";
import "../../style.css";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
          <Button onClick={handleOpen} variant="outlined" >
            <TuneSharpIcon fontSize="large" />
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
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                />
              </Typography>
            </Box>
          </Modal>
        </span>
      </div>
    </div>
  );
}

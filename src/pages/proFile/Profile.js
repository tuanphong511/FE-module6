import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';
import EditProfile from './EditProfile';
import {useEffect} from "react";
import customAxios from "../../services/api";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
    mt: 1,
    my: 8,
    mx: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: "auto"
};

export default function Profile(props) {
    const handleClose = () => props.setOpenProfile(false);
    const [open, setOpen] = React.useState(false);
    const [profile ,setProfile]= React.useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (!user || !user.message || !user.message.token || !user.message.token.idUser) {
            return;
        }

        const id = user.message.token.idUser;

        customAxios(`/users/?id=${id}`).then((res) => {
            setProfile(res.data);
            // Lấy dữ liệu người dùng (chẳng hạn, thông tin về mật khẩu hiện tại) từ API
        }).catch((error) => {
            console.error(error);
            // Handle error when unable to fetch user data
        });
    }, [user]);

    const handleOpen = () => setOpen(true);
    return (
        <div>
            <Modal
                open={props.openProfile}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}
                    initialValues={profile}
                     enableReinitialize={true}
                >
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                        Thông tin cá nhân
                    </Typography>
                    <TextField
                        label="Username"
                        sx={{ mb: 2, width: "100%" }}
                        name={"username"}
                        value={profile.username}
                        onChange={(e) =>{
                            setProfile({ ...Profile, username: e.target.value })
                        }}
                    />

                    {/*<TextField*/}
                    {/*    label="Address"*/}
                    {/*    sx={{ mb: 2, width: "100%" }}*/}
                    {/*    name={"Address"}*/}
                    {/*/>*/}
                    <TextField
                        label="Telephone"
                        sx={{ mb: 2, width: "100%" }}
                        name={"telephone"}
                        value={profile.telephone}
                        onChange={(e) =>{
                            setProfile({ ...Profile, telephone: e.target.value })
                        }}
                    />
                    <Button variant='contained' sx={{ width: "100%" }} onClick={handleOpen} >Chỉnh sửa thông tin</Button>
                </Box>
            </Modal>
            <EditProfile open={open} setOpen={setOpen} />
        </div>
    )
}
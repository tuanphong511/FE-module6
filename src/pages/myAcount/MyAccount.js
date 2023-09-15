import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useEffect, useState } from "react";
import customAxios from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

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

export default function MyAccount(props) {
    const handleClose = () => props.setOpenMyAccount(false);
    const user = JSON.parse(localStorage.getItem("user"))
    // const id = user.message.token.idUser;
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        if (!user || !user.message || !user.message.token || !user.message.token.idUser) {
            navigate('/');
            return;
        }

        const id = user.message.token.idUser;

        customAxios(`/users/?id=${id}`).then((res) => {
            setCurrentUser(res.data);
            // Lấy dữ liệu người dùng (chẳng hạn, thông tin về mật khẩu hiện tại) từ API
        }).catch((error) => {
            console.error(error);
            // Handle error when unable to fetch user data
        });
    }, [user, navigate]);

    const handlePasswordChange = () => {
        console.log(currentPassword)
        // Kiểm tra xem mật khẩu hiện tại có khớp với mật khẩu đã lưu hay không
        if (currentPassword !== currentPassword) {
            setErrorMessage("Mật khẩu hiện tại không đúng.");
            return;
        }

        // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu mới có khớp nhau hay không
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
            return;
        }

        // Gửi yêu cầu PUT đến API để cập nhật mật khẩu
        const updatedUserData = {
            ...currentUser,
            password: newPassword
        };

        customAxios.put(`/users/${currentUser.id}`, updatedUserData).then(() => {
            toast.success("Thay đổi mật khẩu thành công")
            handleClose();
        }).catch((error) => {
            console.error(error);
            setErrorMessage("Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại sau.");
        });
    }

    return (
        <div>
            <Modal
                open={props.openMyAccount}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                        Đổi mật khẩu
                    </Typography>
                    <TextField
                        id="currentPassword"
                        label="Mật khẩu hiện tại"
                        type="password"
                        variant="outlined"
                        sx={{ mb: 2, width: "100%" }}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        id="newPassword"
                        label="Mật khẩu mới"
                        type="password"
                        variant="outlined"
                        sx={{ mb: 2, width: "100%" }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        id="confirmNewPassword"
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        variant="outlined"
                        sx={{ mb: 2, width: "100%" }}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <div style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>
                            {errorMessage}
                        </div>
                    )}
                    <Button
                        variant="outlined"
                        sx={{ width: "100%" }}
                        onClick={handlePasswordChange}
                    >
                        Đổi mật khẩu
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

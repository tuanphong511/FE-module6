import { Button, TextField, Typography } from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import customAxios from "../../services/api";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function FormEditProfile({ handleClose }) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        username : "",
        telephone : ""
    });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user || !user.message || !user.message.token || !user.message.token.idUser) {
            navigate("/");
            return;
        }

        const id = user.message.token.idUser;

        customAxios(`/users/?id=${id}`)
            .then((res) => {
                setProfile(res.data);
                // Lấy dữ liệu người dùng (chẳng hạn, thông tin về mật khẩu hiện tại) từ API
            })
            .catch((error) => {
                console.error(error);
                // Xử lý khi không thể lấy dữ liệu người dùng
            });
    }, []);



    const handleSubmit = () => {
        const profiles = {
            username : profile.username,
            telephone : profile.telephone,
            password : profile.password,
            role: profile.role,
            avatar: profile.avatar,
            status:profile.status

        };
        console.log("update",profiles)
        customAxios
            .put(`/users/${profile.id}`, profiles)
            .then(() => {
                toast.success("Đã sửa thành công")
                handleClose()
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                // Xử lý khi không thể cập nhật thông tin người dùng
            });
    };
    console.log(profile)
    return (
        <div>
            <Box
                initialValues={profile}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                    Chỉnh sửa thông tin
                </Typography>
                <TextField
                    id="username"
                    sx={{ mb: 2, width: "100%" }}
                    name="username"
                    value={profile.username || ""}
                    // onChange={(e) =>
                    //     setProfile({...profile, username: e.target.value})
                    // }
                />

                {/*<TextField*/}
                {/*    label="Address"*/}
                {/*    sx={{ mb: 2, width: "100%" }}*/}
                {/*/>*/}
                <TextField
                    id="telephone"
                    sx={{ mb: 2, width: "100%" }}
                    name="telephone"
                    value={profile.telephone}
                    onChange={(e) =>
                        setProfile({...profile, telephone: e.target.value})
                    }
                />
                <Button variant="contained" sx={{ width: "100%" }} onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </Box>
        </div>
    );
}
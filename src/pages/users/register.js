import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { register } from "../../services/userService";
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Register({ setLogin }) {
    const [fullname, setFullname] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [telephone, setTelephone] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [role, setRole] = React.useState("Người dùng")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isError, setIsError] = React.useState("");


    const changeLogin = () => {
        setLogin(true)
    }
    const checkValidation = (value) => {
        setConfirmPassword(value)
        if (password !== value) {
            setIsError("Confirm Password should be match witch password")
        } else if (password === value) {
            setIsError("Đã trùng khớp")
        }
    }

    const handleStatusClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleStatusClose = (newRole) => {
        setAnchorEl(null);
        if (newRole) {
            setRole(newRole);
        }
    };

    const dispatch = useDispatch();

    const handleRegister = async () => {
        let userData = { username, password, confirmPassword, telephone, role }
        console.log(userData);
        await dispatch(register(userData));
        toast.success("Đăng ký thành công", { autoClose: 1500 })
        setTimeout(() => {
            changeLogin();
        }, 2000);

    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                className="form-register"
            >
                <div className="form-register-user">
                    <Avatar sx={{ m: 1, width: "50px", height: "50px", margin: "auto" }}>
                        <img src="logo.png" style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="err" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>
                    <Box component="form"
                        sx={{
                            mt: 1,
                            my: 0,
                            mx: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            id="fullname"
                            label="Họ và tên"
                            name="fullname"
                            autoComplete="fullname"
                            autoFocus
                            sx={{ width: "300px" }}
                            value={fullname}
                            onChange={(e) => {
                                setFullname(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            id="username"
                            label="Tài khoản"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            sx={{ width: "300px" }}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ width: "300px" }}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            name="confirmPassword"
                            type="password"

                            label="Xác nhận mật khẩu"
                            id="confirmPassword"
                            autoComplete="off"
                            sx={{ width: "300px" }}
                            value={confirmPassword}
                            onChange={(e) =>
                                checkValidation(e.target.value)
                            }
                        />
                        <div style={{ color: "red", fontSize: "13px" }}>
                            {isError}
                        </div>
                        <TextField
                            margin="normal"
                            required
                            name="telephone"
                            label="Số điện thoại"
                            type="tel"
                            id="telephone"
                            autoComplete="off"
                            sx={{ width: "300px" }}
                            value={telephone}
                            onChange={(e) => {
                                setTelephone(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            name="address"
                            label="Địa chỉ"
                            type="address"
                            id="address"
                            autoComplete="off"
                            sx={{ width: "300px" }}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            name="avatar"
                            type="file"
                            id="avatar"
                            autoComplete="off"
                            sx={{ width: "300px" }}
                        />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: 'white', color: 'black', margin: "10px 0 0 0", width: "300px" }}
                            onClick={handleStatusClick}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            Vai trò: {role}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleStatusClose(null)}
                        >
                            <MenuItem onClick={() => handleStatusClose('Người dùng')}>Người dùng</MenuItem>
                            <MenuItem onClick={() => handleStatusClose('Người cho thuê')}>Người cho thuê</MenuItem>
                        </Menu>


                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "300px" }}
                            onClick={handleRegister}

                        >
                            Đăng ký
                        </Button>
                        <Link variant="body2" onClick={changeLogin} className="link">
                            {"Bạn đã có tài khoản? Đăng nhập"}
                        </Link>
                    </Box>
                </div>
            </Box>
        </ThemeProvider>
    );
}
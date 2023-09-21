import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../services/userService";
import * as Yup from "yup"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const SchemaError = Yup.object().shape({
    username: Yup.string().required("Tài khoản không được để trống"),
    password: Yup.string().min(6, "Mật khẩu phải có ít nhất từ 6-32 ký tự").max(32, "Mật khẩu phải nhỏ hơn 32 ký tự").required("Yêu cầu nhập mật khẩu từ 6-32 ký tự")
})

const defaultTheme = createTheme();

export default function Login({ setLogin, handleClose }) {
    const [error, setError] = React.useState("");

    const changeLogin = () => {
        setLogin(false);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async (event, setIsLoggedIn) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }


        const isValid = await SchemaError.isValid(data)

        if (!isValid) {
            setError("Vui lòng kiểm tra lại thông tin đăng nhập");
            return;
        }
        try {
            const response = await dispatch(login(data))
            console.log(data)
            if (response.payload.data.message.token === "User is not exist") {

                toast.error("Tài khoản không tồn tại ");
            } else if (response.payload.data.message.token === "Password is wrong") {
                toast.warning("Bạn nhập sai mật khẩu");
            } else {
                toast.success("Đăng nhập thành công");
                handleClose();
            }
            console.log(response.payload.data.message.token)

            const user = response.payload.data.message.token;

            if (user.role === 'Người dùng') {
                navigate('/user')
            } else if (user.role === 'Người cho thuê') {
                navigate("/host")
            } else if (user.role === 'admin')
                navigate("/admin")
            console.log(user.role)
        } catch (error) {
            console.error("Lỗi đăng nhập: ", error);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: SchemaError,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });


    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                className="form-login"
                initialValues={{}}
                validationSchema={SchemaError}
                onSubmit={handleLogin}
                sx={{ height: "500px" }}
            >
                <div className="form-login-user">
                    <Avatar sx={{ m: 1, width: "50px", height: "50px", margin: "auto" }}>
                        <img src="logo.png" style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="err" />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ width: "120px", margin: "0 auto" }}>
                        Đăng nhập
                    </Typography>
                    <Box component="form"
                        style={{ margin: "0px" }}
                        initialValues={{ username: "", password: "" }}
                        onSubmit={(values) => {
                            handleLogin(values)
                        }}
                        sx={{
                            mt: 1,
                            my: 8,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            className="width-textfield"
                            margin="normal"
                            id="username"
                            label="Tài khoản"
                            name="username"
                            autoComplete="off"
                            autoFocus
                            sx={{
                                width: "100%"
                            }}
                            {...formik.getFieldProps("username")}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error" style={{ color: "red" }}>{formik.errors.username}</div>
                        ) : null}
                        <TextField
                            className="width-textfield"
                            margin="normal"
                            required
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="off"
                            sx={{ width: "100%" }}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error" style={{ color: "red" }}>{formik.errors.password}</div>
                        ) : null}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "100%", margin: "15px 0" }}
                        >
                            Đăng nhập
                        </Button>
                        <Button variant="outlined" className="icon-fb" style={{
                            textTransform: 'none',
                            margin: "0",
                            width: "100%"
                        }}>
                            <IconButton position="start" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-facebook color-svg-fb" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </IconButton>
                            Đăng nhập với Facebook
                        </Button>
                        <Button variant="outlined" className="icon-gg" style={{ textTransform: 'none', width: "100%" }}>
                            <IconButton position="start" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                            </IconButton>
                            Đăng nhập với Google
                        </Button>
                        <Link variant="body2" onClick={changeLogin} className="link" sx={{ margin: "15px 0" }}>
                            {"Bạn chưa có tài khoản? Đăng ký"}
                        </Link>
                    </Box>
                </div>
            </Box>
        </ThemeProvider>
    );
}


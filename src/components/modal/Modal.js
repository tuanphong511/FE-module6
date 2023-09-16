import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from '../../pages/users/login';
import Register from '../../pages/users/register';
import "../../style.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const handleClose = () => props.setOpen(false);
    const [login, setLogin] = React.useState(true);

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {login ? <Login setLogin={setLogin} handleClose={handleClose}/> : <Register setLogin={(e) => setLogin(e)} />}
                </Box>
            </Modal>
        </div>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormEditProfile from './FormEditProfile';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
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

export default function EditProfile(props) {
    const handleClose = () => props.setOpen(false);
    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormEditProfile handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    )
}
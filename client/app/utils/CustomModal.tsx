import { Modal, Box } from '@mui/material';
import { FC } from 'react';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    component: any;
    setRoute?: (route: string) => void;
}

const CustomModal: FC<Props> = ({ open, setOpen, activeItem, component: Component, setRoute }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 lg:w-[450px] bg rounded-lg shadow p-3 lg:p-6 outline-none'>
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    );
};

export default CustomModal;
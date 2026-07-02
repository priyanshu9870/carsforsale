import React from 'react';
import './Modal.css';
import { Box , Container,  Stack , Grid , TextField} from '@mui/material';

const Modal = ({ show, onClose, title, content }) => {
    if (!show) {
        return null;
      }
  return (
            <Stack id="myModal" className="modal">
            <Stack className="modal-dialog">
                <Stack className="modal-content">
                    <Stack className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <span className="close" onClick={onClose}>&times;</span>
                    </Stack>
                    <Stack className="modal-body">
                        {content}
                    </Stack>
                    <Stack className="modal-footer">
                        <button className="btn close-btn" onClick={onClose}>Close</button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
  )
}

export default Modal

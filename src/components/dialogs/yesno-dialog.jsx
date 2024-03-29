import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

function YesNoDialog({open, title, content, isAlert = false, onAction}) {
  const handleClose = (answer) => {
    onAction(answer);
  };
  return (
      <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h5">
              {content}
            </Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!isAlert ? <Button onClick={() => handleClose(false)}
                             variant="outlined">Нет</Button> : null}
          <Button onClick={() => handleClose(true)} variant="contained">
            Да
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default YesNoDialog;
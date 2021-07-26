import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [iccid, setIccid] = React.useState({})
  React.useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`http://localhost:5502/devices/usage/89011703278452311809`)
      setIccid(res.data)
    }
    fetchDetails()
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Details</h2>
      <p id="simple-modal-description">
        {iccid.status}
      </p>
      <p id="simple-modal-description">
      {iccid.ctdSMSUsage}
      </p>
      <p id="simple-modal-description">
      {iccid.ctdDataUsage}
      </p>
      <p id="simple-modal-description">
      {iccid.ctdVoiceUsage}
      </p>
      <p id="simple-modal-description">
      {iccid.overageLimitReached}
      </p>
      <p id="simple-modal-description">
      {iccid.ratePlan}
      </p>
      <p id="simple-modal-description">
      {iccid.communicationPlan}
      </p>
      <p id="simple-modal-description">
      {iccid.ctdSessionCount}
      </p>

      <button onClick={handleClose}>x</button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

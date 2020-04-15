import React from "react";
import "./game.css";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Game() {
  const [selectedValue, setSelectedValue] = React.useState();
  const [score, setScore] = React.useState(0);
  const [play, setPlay] = React.useState(false);
  const [message, setMessage] = React.useState(
    "Something went wrong!! please reload the page..."
  );
  const [open, setOpen] = React.useState(false);
  const radioButton = [];

  const handleChange = (e) => {
    if (play) {
      if (e.target.value == selectedValue) {
        setSelectedValue(Math.floor(Math.random() * 63));
        setScore(score + 1);
      } else {
        setScore(score - 1);
      }
    } else {
      setMessage("Please start the game");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue();
    setPlay(false);
    setScore(0);
  };

  const handleSubmit = () => {
    if (!play) {
      setSelectedValue(Math.floor(Math.random() * 63));
      setPlay(true);
    } else {
      setMessage("Your score is " + score);
      setOpen(true);
    }
  };

  for (let i = 0; i < 64; i++) {
    radioButton.push(
      <Radio
        key={i}
        checked={selectedValue == i}
        onClick={handleChange}
        value={i}
        name="radio-button-demo"
      />
    );
  }

  return (
    <div className="split left">
      <div className="leftcontainer">
        <Typography variant="h4" gutterBottom>
          Hit the Circle : {score !== 0 && score}
        </Typography>
        <form className="root" noValidate autoComplete="off">
          <div>
            {radioButton}
            <Button
              onClick={handleSubmit}
              value={play}
              variant="contained"
              style={{
                width: 312,
                height: 40,
                marginLeft: "10px",
                marginTop: "30px",
                backgroundColor: "#04BE66",
              }}
            >
              {play ? "Stop" : "Play"}
            </Button>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{message}</DialogTitle>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </form>
      </div>
    </div>
  );
}

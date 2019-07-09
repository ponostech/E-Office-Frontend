import React, { Component } from "react";
import {
  AppBar,
  Button,
  Card, CardContent,
  CardHeader,
  Dialog, DialogActions,
  Divider,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import LoadingView from "./LoadingView";
import FileUpload from "../../components/FileUpload";
import PropTypes from "prop-types";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CashPaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state={
      attachments:[],
      comment: "",

      commentError: "",
      loading:false
    }
  }

  handleClose=(e)=>{
    this.props.onClose(null);
  }
  handleChange=(event)=> this.setState({[event.target.name]:event.target.value})

  handleBlur=(event)=>event.target.value?this.setState({commentError:""}):this.setState({commentError:"Comment is required"})
  render() {
    const { classes,open } = this.props;
    const { comment,commentError,loading } = this.state;
    let content=(
      <>
        <FileUpload
          required={true}
          applicationName={"challan"}
          onUploadSuccess={(data) => {
            this.setState(state => {
              let temp = {
                mandatory: true,
                document_id: new Date().getTime(),
                name: "challan",
                path: data.location
              };
              state.attachments.push(temp);
            });
          }} onUploadFailure={(e) => {
          console.log(e);
        }} document={
          {id:new Date().getTime(),name:"challan",mime:"application/pdf",mandatory:1}
        }/>
        <TextField margin={"dense"} multiline={true} rows={5} fullWidth={true} variant={"outlined"} value={comment}
                   label={"Comment"}
                   onChange={this.handleChange.bind(this)}
                   onBlur={this.handleBlur.bind(this)}
                   error={Boolean(commentError)}
                   helperText={commentError}/>
        </>
    )
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={this.handleClose.bind(this)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.handleClose.bind(this)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Cash Payment
            </Typography>
            <Button href={"#"} onClick={this.handleClose.bind(this)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
            <Card>
              <CardContent>
              {loading ? <LoadingView/> : content}
              </CardContent>
            </Card>
        </DialogContent>
        <Divider component={"div"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"primary"} onClick={this.handleClose.bind(this)}>Confirm Payment</Button>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={this.handleClose.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CashPaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application:PropTypes.object.isRequired
};


export default withStyles(styles)(CashPaymentDialog);
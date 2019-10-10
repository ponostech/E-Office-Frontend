import React, {Component} from "react";
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
import DetailViewRow from "../e-office/common/DetailViewRow";

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
    this.state = {
      receipt: null,
      comment: "",

      commentError: "",
      loading: false
    }
  }

  handleClose = (name) => {
    const {challan} = this.props;
    const {comment, receipt} = this.state;
    if (name === "confirm") {
      let data = {
        receipt,
        txn_details: comment,
        txn_no: challan.number,
        challan_id: challan.id
      }
      this.clear();
      this.props.onClose(data);
    } else {
      this.clear();
      this.props.onClose(null);
    }
  }
  clear = () => this.setState({
    receipt: null,
    comment: "",
  })

  handleChange = (event) => this.setState({[event.target.name]: event.target.value})

  handleBlur = (event) => event.target.value ? this.setState({commentError: ""}) : this.setState({commentError: "Comment is required"})

  render() {
    const {classes, open, challan} = this.props;
    const {comment, commentError, loading} = this.state;
    let content = (
        <>
          <FileUpload
              required={true}
              applicationName={"challans"}
              onUploadSuccess={(data) => {
                this.setState({
                  receipt: data.location
                });
              }} onUploadFailure={(e) => {
            console.log(e);
          }} document={
            {id: new Date().getTime(), name: "Scanned Copy of Receipt", mime: "application/pdf", mandatory: 1}
          }/>
          <TextField name={"comment"} margin={"dense"} multiline={true} rows={5} fullWidth={true} variant={"outlined"}
                     value={comment}
                     label={"Comment"}
                     required={true}
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
              <IconButton href={"#"} color="inherit" onClick={event => this.handleClose("close")} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                Cash Payment
              </Typography>
              <Button href={"#"} onClick={event => this.handleClose("close")} color="inherit">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <>
              <DetailViewRow primary={"Challan Number"} secondary={challan ? challan.number : ""}>
                <Typography color={"primary"} variant={"h6"}>{"Amount Payable : " + new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumSignificantDigits: 2
                }).format(Boolean(challan) ? challan.amount : 0)}</Typography>
              </DetailViewRow>

              <Divider component={"div"}/>
              <CardContent>
                {loading ? <LoadingView/> : content}
              </CardContent>
            </>
          </DialogContent>
          <Divider component={"div"}/>
          <DialogActions>
            <Button disabled={!Boolean(this.state.comment)} href={"#"} variant={"outlined"} color={"primary"}
                    onClick={event => this.handleClose("confirm")}>Confirm Payment</Button>
            <Button href={"#"} variant={"outlined"} color={"secondary"}
                    onClick={event => this.handleClose("close")}>Close</Button>
          </DialogActions>
        </Dialog>
    );
  }
}

CashPaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  challan: PropTypes.object.isRequired
};


export default withStyles(styles)(CashPaymentDialog);
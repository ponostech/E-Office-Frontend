import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  Divider, IconButton,
  Tooltip, Typography
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import ConfirmDialog from "../../../../components/ConfirmDialog";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import FileUpload from "../../../../components/FileUpload";

class HoardingApplyDialog extends Component {
  state={
    application:null,
    documents:[]
  }

  handleConfirm=(e)=>{
    const { documents } = this.state;
    if (documents) {
      this.props.onConfirm(documents)
    }
  }
  render() {
    const { open, onClose,confirmBtnText,closeBtnText, application,rest } = this.props;

    return (
      <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={onClose} {...rest}>
        <Card>
          <CardHeader title={"Apply hoarding"} action={
            <>
              <Tooltip title={"Close"}>
                <IconButton onClick={onClose}> <CloseIcon color={"action"}/> </IconButton>
              </Tooltip>
            </>
          }/>
          <CardContent>
            <GridContainer justify={"center"}>

              <GridItem md={6}>

                <h2>Application detail goes here</h2>
              </GridItem>
              <GridItem md={6}>
              <div>
                <Typography variant={"h5"}>Upload Document's</Typography>
                <FileUpload document={{id: 40, name: "Signature", mime: "image/*", mandatory: 1}}
                            onUploadSuccess={(data) => {
                              let temp = {
                                document_id: 1,
                                name: "signature",
                                path: data.location
                              };
                              this.setState(state=>{
                                state.documents.push(temp)
                              });
                            }} onUploadFailure={(data) => {
                  console.log(data);
                }}/>
              </div>
              </GridItem>
            </GridContainer>

          </CardContent>
        </Card>

        <Divider/>
        <DialogActions>
          <Button disabled={Boolean(this.state.documents)} variant={"outlined"} color={"primary"} onClick={this.handleConfirm.bind(this)}>{confirmBtnText}</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>{closeBtnText}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

HoardingApplyDialog.defaultProps = {
  confirmBtnText: "Confirm",
  closeBtnText: "Close"
};
HoardingApplyDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  onConfirm:PropTypes.func.isRequired,
  application:PropTypes.object.isRequired,
  confirmBtnText:PropTypes.string,
  closeBtnText:PropTypes.string
}

export default HoardingApplyDialog;
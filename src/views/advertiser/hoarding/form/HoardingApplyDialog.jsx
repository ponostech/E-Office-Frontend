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
  Divider, IconButton, List, ListItem, ListItemText,
  Tooltip, Typography
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import ConfirmDialog from "../../../../components/ConfirmDialog";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import FileUpload from "../../../../components/FileUpload";
import { APPLICATION_NAME } from "../../../../utils/Util";

class HoardingApplyDialog extends Component {
  state={
    application:null,
    documents:[]
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({documents:nextProps.documents})
  }

  handleConfirm=(e)=>{
    const { documents } = this.state;
    if (documents) {
      this.props.onConfirm(documents)
    }
  }
  render() {
    const { open, onClose,confirmBtnText,closeBtnText, application,rest } = this.props;
    // const { file, hoarding } = application;
    let heading=application?"FILE NUMBER : "+application.hoarding.file.number:"";
    let subheading=application?"SUBJECT : "+application.hoarding.file.subject:"";
    let detail=application?
      (
        <List>
          <CardHeader title="Hoarding Details"/>
          <ListItem>
            <ListItemText primary={"Lenght"} secondary={application.hoarding.length}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Height"} secondary={application.hoarding.heigth}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Ground Clearance"} secondary={application.hoarding.ground_clearance}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Details of Road"} secondary={application.hoarding.road_details}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Address"} secondary={application.hoarding.address}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Is Both Sided?"} secondary={application.hoarding.both_side? "Yes":"No"}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Type of dislay"} secondary={application.hoarding.display_type}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Landlord/ Landowner"} secondary={application.hoarding.land_owner_name}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Type of Landlord/ Landowner"} secondary={application.hoarding.land_owner_type?"Public":"Private"}/>
          </ListItem>
        </List>
      ):"";
    return (
      <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={onClose} {...rest}>
        <Card>
          <CardHeader title={heading} subheader={subheading} action={
            <>
              <Tooltip title={"Close"}>
                <IconButton onClick={onClose}> <CloseIcon color={"action"}/> </IconButton>
              </Tooltip>
            </>
          }/>
          <Divider/>
          <CardContent>
            <GridContainer justify={"center"}>

              <GridItem md={6}>
                {detail}
              </GridItem>
              <GridItem md={6}>
              <div>
                <CardHeader title="Upload Document's"/>

                {this.state.documents.map((doc, index) => {
                  return <GridItem key={index} xs={12} sm={12} md={12}>
                    <FileUpload
                      applicationName={APPLICATION_NAME.HOARDING}
                      onUploadSuccess={(data) => {
                        this.setState(state => {
                          let temp = {
                            document_id: doc.id,
                            name: doc.name,
                            path: data.location
                          };
                          state.uploadDocuments.push(temp);
                        });
                      }} onUploadFailure={(e) => {
                      console.log(e);
                    }} document={doc}/>
                  </GridItem>;
                })}
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
  confirmBtnText: "Apply",
  closeBtnText: "Close"
};
HoardingApplyDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  onConfirm:PropTypes.func.isRequired,
  application:PropTypes.object.isRequired,
  confirmBtnText:PropTypes.string,
  closeBtnText:PropTypes.string,
  documents:PropTypes.array
}

export default HoardingApplyDialog;
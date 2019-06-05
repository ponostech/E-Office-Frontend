import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import PropTypes from "prop-types";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import CloseIcon from "@material-ui/icons/Close";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
import DetailViewRow from "../e-office/common/DetailViewRow";

const style = {
  item: {
    padding: "10px 10px !important"
  }
};

class HoardingApplicationDialog extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.application);
  }

  getView = () => {
    const { open, onClose, application, classes } = this.props;
    console.log(application);
    const { file, hoarding, applicant, documents } = application;
    return (
      <>
        <GridContainer>

          <GridItem xs={12} sm={12} md={5}>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"h6"}>Details of Hoarding</Typography>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>

              <List dense={false}>
                    <Card>
                      <DetailViewRow primary={"Date of Application"} secondary={moment(hoarding.created_at).format("Do MMM YYYY")}/>
                      <DetailViewRow primary={"Proposed Location"} secondary={hoarding.address}/>
                      <DetailViewRow primary={"Local Council"} secondary={hoarding.local_council.name}/>
                      <DetailViewRow primary={"Length"} secondary={hoarding.length+" ft"}/>
                      <DetailViewRow primary={"Height"} secondary={hoarding.height+" ft"}/>
                      <DetailViewRow primary={"Type of Display"} secondary={hoarding.display_type}/>
                      <DetailViewRow primary={"Is Both Sided"} secondary={hoarding.both_side ? "Yes" : "No"}/>
                      <DetailViewRow primary={"Details of Road"}
                                secondary={hoarding.road_detail ? hoarding.road_detail : "N/A"}/>
                      <DetailViewRow primary={"Ground Clearance"} secondary={hoarding.ground_clearance?hoarding.ground_clearance:"NA"}/>
                      <DetailViewRow primary={"Landlord / Land owner"} secondary={hoarding.land_owner_name}/>
                       <DetailViewRow primary={"Type of Landlord / Landowner"}
                                secondary={hoarding.land_owner_type ? "Public" : "Private"}/>
                </Card>
              </List>
          </GridItem>



            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"h6"}>Uploaded Documents</Typography>
            </GridItem>
            <List>
              {
                documents.map(function(doc, index) {
                  return (
                    <>
                    <ListItem key={index}>
                      <ListItemText primary={doc.name}/>
                      <ListItemSecondaryAction>
                        <IconButton target={"_blank"} href={doc.path}>
                          <EyeIcon fontSize={"small"} color={"primary"}/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    </>
                  );
                })
              }
            </List>
          </GridItem>
        </GridContainer>
      </>
    );
  };

  render() {
    const { open, onClose, application } = this.props;
    const number = application ? application.file.number : "";
    const subject = application ? application.file.subject : "";
    let self = this;
    return (

      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
        <CardHeader title={`FILE NO : ${number}`}
                    subheader={`SUBJECT : ${subject}`}
                    action={
                      <>
                        <IconButton onClick={onClose}>
                          <PrintIcon/>
                        </IconButton>
                        <IconButton onClick={onClose}>
                          <DownloadIcon/>
                        </IconButton>
                        <IconButton onClick={onClose}>
                          <CloseIcon/>
                        </IconButton>
                      </>
                    }/>
        <Divider/>
        <DialogContent>
          {
            application ? self.getView() : undefined
          }
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={e => onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

HoardingApplicationDialog.propTypes = {
  application: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(style)(HoardingApplicationDialog);
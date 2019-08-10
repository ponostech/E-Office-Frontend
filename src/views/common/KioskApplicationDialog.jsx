import React, { Component } from "react";
import {
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

const style = {
  item: {
    padding: "10px 10px !important"
  }
};

class KioskApplicationDialog extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.application);
  }

  getView = () => {
    const { open, onClose, application, classes } = this.props;
    console.log(application);
    const { file, kiosk, applicant, documents } = application;
    return (
      <>
        <GridContainer>

          <GridItem xs={12} sm={12} md={5}>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <Typography variant={"h6"}>Details of Kiosk</Typography>
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <List dense={false}>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Date of Application"} secondary={moment(kiosk.created_at).format("Do MMM YYYY")}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Purposed Location"} secondary={kiosk.address}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Local Council"} secondary={kiosk.local_council.name}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Length"} secondary={kiosk.length+" ft"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Height"} secondary={kiosk.height+" ft"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Type of Display"} secondary={kiosk.display_type}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Both Sided"} secondary={kiosk.both_side ? "Yes" : "No"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Collapsible"} secondary={kiosk.collapsible ? "Yes" : "No"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Details of Road"}
                                secondary={kiosk.road_detail ? kiosk.road_detail : "N/A"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Ground Clearance"} secondary={kiosk.ground_clearance?kiosk.ground_clearance:"NA"}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Landlord / Land owner"} secondary={kiosk.land_owner_name}/>
                </ListItem>
                <ListItem button={true} dense={false}>
                  <ListItemText primary={"Type of Landlord / Landowner"}
                                secondary={kiosk.land_owner_type ? "Public" : "Private"}/>
                </ListItem>
              </List>
            </GridItem>
          </GridItem>

          <GridItem xs={12} sm={12} md={7}>

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

KioskApplicationDialog.propTypes = {
  application: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(style)(KioskApplicationDialog);
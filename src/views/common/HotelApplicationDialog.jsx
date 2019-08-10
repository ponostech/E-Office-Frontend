import React, { Component } from "react";
import UserIcon from "@material-ui/icons/SupervisedUserCircle";
import ShopIcon from "@material-ui/icons/Store";
import BookIcon from "@material-ui/icons/Book";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import NavPills from "../../components/NavPills/NavPills";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import withStyles from "@material-ui/core/es/styles/withStyles";


const styles = {
  root: {
    background: "white"
  },
  input: {
    background:"white"
  }
};

/**
 * @return {string}
 */
function HotelInfo(props) {
  const { application, classes } = props;
  let view = application ? (
    <>
      <TextField className={classes.root} InputProps={{ className: classes.input }} variant={"filled"} margin={"dense"}
                 fullWidth={true} value={application.name} label={"NAME OF SHOP"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }} variant={"filled"} margin={"dense"}
                 fullWidth={true} value={application.estd} label={"ESTD"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }} variant={"filled"} margin={"dense"}
                 fullWidth={true} value={application.address} label={"LOCATION"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.premise_type}
                 label={"PREMISED?"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.detail} label={"DETAIL"}/>
    </>
  ) : "";
  return view;
}

/**
 * @return {string}
 */
function ApplicantInfo(props) {
  const { application,classes } = props;
  const { tin_no, cst_no, pan_no, gst_no } = application;
  let view = application ? (
    <>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.owner}
                 label={"NAME"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.phone} label={"PHONE"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.email} label={"EMAIL"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={application.owner_address}
                 label={"ADDRESS"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={tin_no ? tin_no : "NA"} label={"TIN NO"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={cst_no ? cst_no : "NA"} label={"CST NO"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }} variant={"filled"} margin={"dense"} fullWidth={true} value={pan_no ? pan_no : "NA"} label={"PAN NO"}/>
      <TextField className={classes.root} InputProps={{ className: classes.input }}  variant={"filled"} margin={"dense"} fullWidth={true} value={gst_no ? gst_no : "NA"} label={"GST NO"}/>
    </>
  ) : "";
  return view;
}

/**
 * @return {string}
 */
function DocumentView(props) {
  const { documents } = props;
  let view = documents ? (
    <List>
      {
        documents.map(function(doc, index) {
          return (
            <ListItem key={index}>
              <ListItemText>
                {doc.name}
              </ListItemText>
              <ListItemSecondaryAction>
                <Tooltip title={"Click here to view/download documents"}>
                  <IconButton target={"_blank"} href={doc.path}>
                    <EyeIcon/>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      }
    </List>
  ) : "";
  return view;
}

class HotelApplicationDialog extends Component {
  render() {
    const { open, onClose, application, classes } = this.props;
    const number = application ? "FILE NUMBER : " + application.file.number : "";
    const subject = application ? "SUBJECT     : " + application.file.subject : "";
    return (
      <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={"lg"}>
        <CardHeader title={number} subheader={subject} action={
          <>
            <Tooltip title={"Download"}>
              <IconButton onClick={onClose}><DownloadIcon/></IconButton>
            </Tooltip>
            <Tooltip title={"Print"}>
              <IconButton onClick={onClose}><PrintIcon/></IconButton>
            </Tooltip>
            <Tooltip title={"Close"}>
              <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
          </>
        }/>
        <Divider/>
        {
          application ?
            <NavPills
              horizontal={{
                tabsGrid: { xs: 12, sm: 12, md: 2 },
                contentGrid: { xs: 12, sm: 12, md: 10 }
              }}
              tabs={[
                {
                  tabButton: "Applicant Info",
                  tabIcon: UserIcon,
                  tabContent: (<ApplicantInfo classes={classes} application={application}/>)
                },
                {
                  tabButton: "Hotel/Lodging Info",
                  tabIcon: ShopIcon,
                  tabContent: (<HotelInfo classes={classes} application={application}/>)
                }, {
                  tabButton: "Documents",
                  tabIcon: BookIcon,
                  tabContent: (<DocumentView classes={classes} documents={application.documents}/>)
                }
              ]}
            />
            : ""
        }
        <Divider/>

        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

HotelApplicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object
};
export default withStyles(styles)(HotelApplicationDialog);
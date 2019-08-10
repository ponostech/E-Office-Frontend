import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Chip,
  Dialog, DialogActions,
  Divider, IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField, Tooltip
} from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close'
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = {
  root: {
    color:"white",
    background: "white"
  },
  input: {
    background: "#26b99a",
    color:"white"
  }
};

class BannerApplicationDialog extends Component {
  render() {
    const { open, onClose, application,classes } = this.props;
    return (
      <Dialog open={open} onClose={onclose} fullWidth={true} maxWidth={"lg"}>
        <GridContainer justify={"center"}>
          <GridItem style={{backgroundColor:"#26b99a"}} xs={6} sm={6} md={5}>
              <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"FILE NO"} value={ application?application.file.file_number:""}/>
              <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"SUBJECT"} value={application?application.file.subject:""}/>
              <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"BRANCH"} value={application?application.file.branch:""}/>
              <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"REMARK"} value={application?application.file.remark:""}/>
              <Divider/>
            <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"NAME"} value={application?application.name:""}/>
            <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"PHONE"} value={application?application.phone:""}/>
            <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"TYPE OF APPLICANT"} value={application?application.applicant_type:""}/>
            <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"ADDRESS"} value={application?application.address:""}/>
            <TextField className={classes.root} InputProps={{className:classes.input}} margin={"dense"} fullWidth={true} variant={"filled"} label={"TYPE OF ADVERTISEMENT"} value={application?application.advertisement_type:""}/>
            <Chip variant={"primary"} label={ application?application.status:""}/>
          </GridItem>
          <GridItem xs={6} sm={6} md={7}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CardHeader title={"Banner Details"} action={
                  <>
                    <Tooltip title={"Close"}>
                      <IconButton onClick={onClose}><CloseIcon/></IconButton>
                    </Tooltip>
                  </>
                }/>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Length</TableCell>
                      <TableCell>Height</TableCell>
                      <TableCell>Locations</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {application?
                      application.advertisements.map(function(item, index) {
                        return (
                          <TableRow key={index}>
                            <TableCell>item.length</TableCell>
                            <TableCell>item.height</TableCell>
                            <TableCell>item.locations</TableCell>
                            <TableCell>item.from</TableCell>
                            <TableCell>item.to</TableCell>
                          </TableRow>
                        );
                      }):""
                    }
                  </TableBody>
                </Table>
                <DialogActions>
                  <Button color={"primary"} variant={"outlined"}>Close</Button>
                </DialogActions>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

      </Dialog>
    );
  }
}

BannerApplicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object
};

export default withStyles(styles)(BannerApplicationDialog);
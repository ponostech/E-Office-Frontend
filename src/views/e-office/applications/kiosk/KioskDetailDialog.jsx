import React, { Component } from "react";
import { Button, Dialog, DialogActions, Divider, IconButton, Typography } from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close'
const style={
  item:{
    padding: "10px 10px !important"
  }
}
class KioskDetailDialog extends Component {

  render() {
    const { open, onClose,classes } = this.props;
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        <GridContainer style={{padding:20}}>
          <GridItem justify={"space-between"} className={classes.item} md={12}>
            <GridContainer justify={"space-between"}>
              <Typography variant={"title"}>Kiosk Application Detail</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon/>
              </IconButton>
            </GridContainer>
          </GridItem>
          <GridItem className={classes.item} md={12}>
            <Divider color={"action"}/>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Application No</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>123-123-12</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>File No:</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>File-no-123-123</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Subject</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>Matter relating to...</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>local Council</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>Chhinga veng</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Length</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>12 meter</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Length</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>12 meter</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Height</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>12 meter</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Mizo</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>12 meter</Typography>
          </GridItem>
          <GridItem className={classes.item} md={2}>
            <Typography variant={"body2"}>Length</Typography>
          </GridItem>
          <GridItem className={classes.item} md={10}>
            <Typography variant={"body1"}>12 meter</Typography>
          </GridItem>

        </GridContainer>
        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={e=>onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(style)(KioskDetailDialog);
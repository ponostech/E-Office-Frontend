import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import EyeIcon from "@material-ui/icons/PanoramaFishEyeOutlined";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import DownloadIcon from "@material-ui/icons/CloudDownload";

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

  getField = (model) => {
    let view = undefined;

    for (const [key, value] of Object.entries(model)) {
      console.log(value);
      view +=
        (
          <>
            <GridItem md={4}>
              <Typography variant={"textPrimary"}>
                {key}
              </Typography>
            </GridItem>
            <GridItem md={8}>
              <Typography variant={"textSecondary"}>
                {value}
              </Typography>
            </GridItem>
          </>
        );
    }
    return view;
  };

  getView = () => {
    const { open, onClose, application, classes } = this.props;
    console.log(application);
    const { file, kiosk, applicant, documents } = application;
    return (
      <>

        <CardContent>
          <GridContainer>

            <GridItem xs={12} sm={12} md={6}>
              <Grid container={true} spacing={16} justify={"center"}>

                <GridItem className={classes.item} xs={12} sm={12} md={12}>
                  <Typography variant={"h5"}>Details of application</Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Address
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.address}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Road detail
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.road_detail}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Length
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.length}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    height
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {":" + kiosk.height}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Ground Clearance
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.ground_clearance}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Type of display
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.display_type}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Is Both sided ?
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {kiosk.both_side ? ": Yes" : ": No"}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Is Collapsible ?
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {kiosk.collapsible ? ": Yes" : ": No"}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Landlord/Landowner
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.land_owner_name}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Type of Landlord/Landowner
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Typography variant={"subtitle2"}>
                    {": " + kiosk.land_owner_type ? ": Private" : ": Public"}
                  </Typography>
                </GridItem>

                <GridItem className={classes.item} xs={4} sm={4} md={4}>
                  <Typography variant={"subtitle1"}>
                    Status
                  </Typography>
                </GridItem>
                <GridItem className={classes.item} xs={8} sm={8} md={8}>
                  <Chip color={"primary"} label={file.status}/>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <GridItem className={classes.item} xs={12} sm={12} md={12}>
                <Typography variant={"h5"}>Uploaded Documents</Typography>
              </GridItem>
              <List dense={false}>
                {
                  documents.map(function(doc, index) {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={doc.name}/>
                        <ListItemSecondaryAction>
                          <IconButton target={"_blank"} href={doc.path}>
                            <EyeIcon/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })
                }
              </List>
            </GridItem>
          </GridContainer>
        </CardContent>
      </>
    );
  };

  render() {
    const { open, onClose, application } = this.props;
    const number=application ? application.file.number : "";
    const subject=application ? application.file.subject : "";
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
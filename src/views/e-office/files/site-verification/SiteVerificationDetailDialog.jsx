import React, { Component } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import DetailViewRow from "../../common/DetailViewRow";
import { getVerificationData } from "../dialog/common/ApplicationResolver";
import { WIDGET_TYPE } from "../../admin/form-builder/constant";
import Grid from "@material-ui/core/Grid";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  docsItem: {
    cursor: "pointer"
  },
  editor: {
    minHeight: 200
  }
};

class SiteVerificationDetailDialog extends Component {
  state = {
    rows: [],
    images: [],
    attachments: []
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.verification) {
      const { data, template } = nextProps.verification;
      const val = { ...data, ...template };
      console.log(val);
      console.log("after mutation");
      console.log(nextProps.verification);

    }
  }


  getStringValue = () => {
    const { verification } = this.props;
    if (verification === null)
      return <DetailViewRow primary={"No Detail"}/>;
    let data = getVerificationData(verification);
    console.log("data",data)
    let view = (
      <>
        {
          data.map((item, index) => {
              let row;
              if (item.type === WIDGET_TYPE.IMAGE_LIST) {
                row = item.value.map(img =>
                  <DetailViewRow primary={img.label}>
                    <Tooltip title={"Click here to view the details"}>
                      <IconButton onClick={e=>window.open(item.location,"_blank")} href={item.location} target={"_blank"}>
                        <Icon color={"primary"} fontSize={"small"}>remove_red_eye</Icon>
                      </IconButton>
                    </Tooltip>
                  </DetailViewRow>
                );
                return <Grid item={true} md={6} sm={12} xs={12}>
                  <List>
                    <ListItemText primary={item.label}/>
                    {row}
                  </List>
                </Grid>
              } else {
                return <Grid item={true} xs={12} sm={12} md={6}>
                  <DetailViewRow primary={(item.label)} secondary={(item.value)}/>
                </Grid>
              }
            }
          )
        }
      </>
    );
    return view;
  };

  render() {
    const { open, onClose, verification, classes } = this.props;
    const { rows, images, attachments } = this.state;


    return (
      <Dialog fullScreen={true} fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Details of site verification
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>


        <DialogContent>
          <Card>
            {/*<CardHeader title={`FILE NUMBER : ${file.number}`} subheader={`SITE VERIFICATION OF ${file.subject}`}/>*/}
            <CardContent>

              <Divider component={"div"}/>

              <Grid container={true} spacing={0}>
                  {this.getStringValue()}
              </Grid>

            </CardContent>
          </Card>

        </DialogContent>

        <Divider component={"li"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

SiteVerificationDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteVerificationDetailDialog);
import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead
} from "@material-ui/core";
import {
  Button,
  List,
  Typography,
  Card,
  DialogContent,
  DialogActions,
  Dialog,
  Slide
} from "@material-ui/core";
import DetailViewRow from "../../../common/DetailViewRow";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

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

class BannerViewDialog extends Component {
  render() {
    console.log(this.props);
    const { classes, data } = this.props;
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.close}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              View Banner Application
            </Typography>
            <Button onClick={this.props.close} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List>
            {data ? (
              <Card>
                <DetailViewRow
                  primary="Name of Applicant"
                  secondary={data.name}
                />
                <DetailViewRow
                  primary="Type of Applicant"
                  secondary={data.applicant_type.toUpperCase()}
                />
                <DetailViewRow
                  primary="Owner Address"
                  secondary={data.address}
                />
                <DetailViewRow primary="Mobile" secondary={data.phone} />
                <DetailViewRow primary="Shop Name" secondary={data.name} />
                <DetailViewRow
                  primary="Proposed Location"
                  secondary={data.address}
                />
                <DetailViewRow
                  primary="Details of Business"
                  secondary={data.details}
                />
                <DetailViewRow
                  primary="Date of Application"
                  secondary={moment(data.created_at).format(
                    "Do MMMM YYYY (dddd)"
                  )}
                />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Length</TableCell>
                      <TableCell>Height</TableCell>
                      <TableCell>Locations</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>No of days</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      ? data.advertisements.map(function(item, index) {
                          let now = item.from;
                          let then = item.to;
                          let diff = moment(then).diff(moment(now), "days");
                          return (
                            <TableRow key={index}>
                              <TableCell>{item.length}</TableCell>
                              <TableCell>{item.height}</TableCell>
                              <TableCell>{item.locations}</TableCell>
                              <TableCell>
                                {moment(item.from).format(
                                  "Do MMMM YYYY (dddd)"
                                )}
                              </TableCell>
                              <TableCell>
                                {moment(item.to).format("Do MMMM YYYY (dddd)")}
                              </TableCell>
                              <TableCell>{diff}</TableCell>
                            </TableRow>
                          );
                        })
                      : ""}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              ""
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.props.close}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(BannerViewDialog);

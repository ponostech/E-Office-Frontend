import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip, Dialog, DialogActions,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DocumentIcon from "@material-ui/icons/Book";
import FileIcon from "@material-ui/icons/AttachFile";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class HoardingDetailDialog extends Component {

  handleClose=(e)=>{
    const { onClose } = this.props;
    onClose();
  }
  render() {
    const { history,hoarding,open,onClose } = this.props;
    return (
      <Dialog scroll={"body"} fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
        <Card>
          <CardHeader avatar={
            <Avatar>
              <DocumentIcon/>
            </Avatar>
          } action={
            <div>
              <Chip color={"primary"} variant={"default"} label={"NEW"}/>
              <Tooltip title={"Put in file"}>
                <IconButton onClick={(e) => console.log(history)}>
                  <FileIcon/>
                </IconButton>
              </Tooltip>
              <IconButton onClick={(e) => this.handleClose.bind(this)}>
                <CloseIcon/>
              </IconButton>
            </div>
          }
                      title={"File No: 123123"}
                      subheader={"Matters relating to blah"}
          />

          <CardContent>
            <GridContainer justify={"center"}>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Application No"} value={"1231"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Local Council"} value={"Chhinga veng"} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Area's Category"} value={"Category C"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Length"} value={"12 meter"} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Height"} value={"12 meter"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Type of display"} value={"ILLUMINATE"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Road Details"} value={"12 meter"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Clearance"} value={"clearance"} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"LandLord / Land Owner"} value={"Neitua"}  fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Type of Landlord/ Land Owner"} value={"private"} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Bothside"} value={"Yes"} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Address"} value={"hno:12 \nlocality:Venghlui\nVC:Venghlui"} multiline={true} rows={3} fullWidth={true}
                           margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                <Typography variant={"headline"}>List of documents</Typography>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <List color={"primary"} title={"List of Documents"}>
                  <ListItem>
                    <ListItemText title={"fasdfasdfasdfasdfas"} color={"primary"}>fasdfasdfasdf</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Check</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item one</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Check</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item two</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Check</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item three</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Check</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormControlLabel control={<Checkbox/>} label={"Notify the applicant"}/>
              </GridItem>
            </GridContainer>
          </CardContent>
          <DialogActions>
            <Button onClose={this.handleClose.bind(this)} color={"secondary"} variant={"contained"}>Close</Button>
          </DialogActions>
        </Card>
      </Dialog>
    );
  }
}
HoardingDetailDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired,
  haording:PropTypes.object.isRequired
}
export default withRouter(HoardingDetailDialog);


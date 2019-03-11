import React, { Component } from "react";
import {
  Button,
  Card, CardActions,
  CardContent,
  CardHeader, Checkbox, Chip,
  Divider, FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  TextField, Tooltip, Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AvatarIcon from "@material-ui/icons/People";
import FileIcon from "@material-ui/icons/AttachFile";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import CardAvatar from "../../../../components/Card/CardAvatar";
import { withRouter } from "react-router-dom";

class HoardingDetails extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Card>
          <CardHeader avatar={
            <CardAvatar testimonial={true} profile={true}>
              <AvatarIcon/>
            </CardAvatar>
          }  action={
            <div>
              <Chip color={"primary"} variant={"default"} label={"NEW"}/>
              <Tooltip title={"Put in file"}>
                <IconButton onClick={(e)=>console.log(history)}>
                  <FileIcon/>
                </IconButton>
              </Tooltip>
              <IconButton onClick={(e)=>history.goBack()}>
                <CloseIcon/>
              </IconButton>
            </div>
          }/>

          <CardContent>
            <GridContainer justify={"center"}>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField variant={"filled"} label={"Item one"} value={"value one"} disabled={true} fullWidth={true} margin={"dense"}/>
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
                      <Button variant={"contained"} color={"primary"}>Checking</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item one</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Checking</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item two</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Checking</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText title={""} color={"primary"}>Item three</ListItemText>
                    <ListItemSecondaryAction>
                      <Switch color={"primary"}/>{"     "}
                      <Button variant={"contained"} color={"primary"}>Checking</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormControlLabel control={<Checkbox/>} label={"Notify the applicant"}/>
              </GridItem>
            </GridContainer>
          </CardContent>
          <CardActions>
            <Button color={"primary"} variant={"contained"}>Save</Button>
            <Button color={"secondary"} variant={"contained"}>Reject</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(HoardingDetails);


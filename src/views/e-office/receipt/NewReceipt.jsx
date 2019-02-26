import React, { Component } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper, Tabs,
  Typography
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import { Tab } from "@material-ui/icons";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Constraint from "../../../config/Constraint";

class NewReceipt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedFiles: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let temp = [...this.state.selectedFiles, ...acceptedFiles];
    this.setState({
      selectedFiles: temp
    });
    console.log(this.state.selectedFiles);
  };

  handleBrowseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  handleBrowse = () => {
    this.setState({
      openDialog: true
    });
  };

  render() {
    const items =
      this.state.selectedFiles.map(file => {
        return (
          <ListItem key={file.name}>
            <ListItemText color={"danger"} primary={file.name}/>
          </ListItem>
        );
      });

    return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title={"New receipt"}/>

              <CardContent>
                <Dropzone
                  accept={Constraint.ACCEPTED_DOCUMENTS}
                  onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => {
                    return (
                      <Paper style={{ padding: 50 }}
                             {...getRootProps()}
                        // className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                      >
                        <input {...getInputProps()} />
                        {
                          isDragActive ?
                            <p>Drop files here...</p> :
                            <p>Try dropping some files here, or click to select files to
                              upload.</p>
                        }
                      </Paper>
                    );
                  }}
                </Dropzone>
                <Typography variant={"title"}>List of selected file</Typography>
                <Divider/>
                <List>
                  {items}
                </List>
                <Divider/>
              </CardContent>
              <CardActionArea>
                <CardActions title={"Upload"}/>
              </CardActionArea>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>

            <Button variant={"extendedFab"} color={"primary"} >Create and Generate Receipt
              No</Button>
            <Button style={{ marginTop: 10 }} variant={"outlined"} color={"secondary"}>
              reset
            </Button>
          </GridItem>
        </GridContainer>
    );
  }
}

export default NewReceipt;
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  Tooltip
} from "@material-ui/core";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

class DocumentsDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      maxDocError: ""
    };
  }


  componentWillReceiveProps(nextProps, nextContext) {
    const { documents } = nextProps;
    for (let i = 0; i < documents.length; i++) {
      let attr = { found: false };
      documents[i] = { ...documents[i], ...attr };
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    const { documents } = this.props;
    const maxDoc = documents.length;
    let temp = [...this.state.files, ...acceptedFiles];
    let files = this.getUnique(temp, "name");

    let newFiles = [];
    documents.forEach(function(doc) {
      files.forEach(file=>{
        let fname = file.name.substring(0, file.name.lastIndexOf("."));

        if (fname===doc.fileName){
          newFiles.push(file)
          doc.found=true;
        }
      })
    })
    console.log(newFiles)
    this.setState({
      files:newFiles
    })
  };


  getUnique = (arr, comp) => {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  };

  handleItemDelete = (file) => {
    const {documents} =this.props;
    const files = this.state.files.filter(value => value.name !== file.name);
    this.setState({ files });
    let found = false;
    documents.forEach(function(item, i) {
      files.forEach(function(file, j) {
        let fname = file.name.substring(0, file.name.lastIndexOf("."));
        if (fname == item.fileName) {
          found = true;
        }
      });
      item.found = found;

    });
    if (found)
      this.setState({ files });
  };

  onClose = (event) => {
    const { onCloseHandler } = this.props;

    switch (event.target.name) {
      case "confirm":
        onCloseHandler(this.state);
        break;
      case "cancel":
        onCloseHandler(null);
        break;
      default:
        break;

    }
    this.setState({
      files: [],
      maxDocError: ""
    });

  };
  closeSnackBar = () => {
    this.setState({ maxDocError: "" });
  };

  render() {
    const { documents, openDialog, fullScreen, acceptedFiles,title,subHeader } = this.props;

    const { files } = this.state;
    const view = (
      files.map(value => {
        return <ListItem key={value.name}>
          <ListItemText secondary={Math.round(value.size / 1024) + " Kb"} primary={value.name} color={"primary"}/>
          <ListItemSecondaryAction>
            <Tooltip title={"Click here to delete"}>
              <IconButton onClick={this.handleItemDelete.bind(this, value)}>
                <DeleteIcon color={"error"}/>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>;
      })
    );
    const docs = (
      documents.map(function(item, index) {
        return (
          <ListItem key={index}>
            <ListItemIcon>
              {item.found ? <CheckIcon color={"primary"}/> : <span>*</span>}
            </ListItemIcon>
            <ListItemText primary={item.name} secondary={"Required Filename : "+item.fileName}/>
          </ListItem>
        );

      })
    );
    return (
      <Dialog fullScreen={Boolean(fullScreen)} open={openDialog} onClose={this.onClose.bind(this)}
              scroll={"body"}>
        <Card>
          <CardHeader title={title} subheader={subHeader} action={
            <IconButton onClick={this.onClose.bind(this)} name={"cancel"}>
              <CloseIcon/>
            </IconButton>
          }/>
          <DialogContent>
            <CardContent>
              <h4>Required Documents<span>*</span></h4>
              <List dense={true}>
                {docs}
              </List>

                <Dropzone accept={acceptedFiles} onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => {
                    return (
                      <div style={{padding:40,border:5,background:"red"}}
                        {...getRootProps()}
                        className={classNames("dropzone", { "dropzone--isActive": isDragActive })}
                      >
                        <input {...getInputProps()} />
                        {
                          isDragActive ?
                            <p>Drop files here...</p> :
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        }
                      </div>
                    );
                  }}
                </Dropzone>
              <h3>List of selected files</h3>
              <List dense={true}>
                {view}
              </List>
              <Snackbar
                color={"error"}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                open={Boolean(this.state.maxDocError)}
                autoHideDuration={5000}
                ContentProps={{
                  "aria-describedby": "message-id"
                }}
                message={<span id="message-id">{this.state.maxDocError}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.closeSnackBar}
                  >
                    <CloseIcon/>
                  </IconButton>
                ]}
              />
            </CardContent>
          </DialogContent>
          <DialogActions>
            <Button name={"confirm"} onClick={this.onClose.bind(this)} variant={"outlined"}
                    color={"primary"}>Confirm</Button>
            <Button name={"cancel"} onClick={this.onClose.bind(this)} variant={"outlined"}
                    color={"secondary"}>Cancel</Button>
          </DialogActions>
        </Card>
      </Dialog>

    );
  }
}
DocumentsDropzone.defaultProps={
  title:'Documents attachment',
  subHeader:'Please rename your file as per expected file name',
}

DocumentsDropzone.propTypes = {
  documents: PropTypes.array.isRequired,
  openDialog: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  acceptedFiles: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool,
  title:PropTypes.string,
  subHeader:PropTypes.string
};
export default DocumentsDropzone;
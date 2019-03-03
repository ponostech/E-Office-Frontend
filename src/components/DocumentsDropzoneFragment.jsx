import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

// USAGE
// <DocumentsDropzone documents={[
//   {name:"Signature of the applicant",fileName:"signature"},
//   {name:"NOC of landowner",fileName:"noc-landowner"},
//   {name:"Tribal Certificate",fileName:"tribal-certificate"},
// ]}
//                    openDialog={this.state.openDialog}
//                    onCloseHandler={this.handleDocumentClose.bind(this)}
//                    acceptedFiles={[...Constraint.ACCEPTED_IMAGES, ...Constraint.ACCEPTED_DOCUMENTS]}/>

class DocumentsDropzoneFragment extends Component {
  constructor(props) {
    super(props);
    this.state={
      errors:""
    }

  }

  isValid = () => {
    if (this.props.files.length === 0) {
      return false;
    }
    return this.props.documents.length === this.props.files.length;

  };
  getData = () => {
  };

  componentWillReceiveProps(nextProps, nextContext) {
    // const { documents } = nextProps;
    // for (let i = 0; i < documents.length; i++) {
    //   let attr = { found: false };
    //   documents[i] = { ...documents[i], ...attr };
    // }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    let documents  = this.props.documents;
    let temp = [...this.props.files, ...acceptedFiles];
    let files = this.getUnique(temp, "name");

    let newFiles = [];
    let newDocs = [];
    documents.forEach(function(doc) {
      files.forEach(file => {
        let fname = file.name.substring(0, file.name.lastIndexOf("."));

        if (fname === doc.fileName) {
          newFiles.push(file);
          doc.found = true;
          newDocs.push(doc);
        }
      });
    });

    this.props.updateFiles(newFiles);
    this.props.updateDocuments(newDocs)
    // this.setState({
    //   files: newFiles,
    //   documents:newDocs
    // });
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
    const { documents } = this.props;
    const files = this.props.files.filter(value => value.name !== file.name);
    let found = false;
    let newDocs=[];
    documents.forEach(function(item, i) {
      files.forEach(function(file, j) {
        let fname = file.name.substring(0, file.name.lastIndexOf("."));
        if (fname === item.fileName) {
          found = true;
        }
      });
      let newDoc={
         name:item.name,
         fileName:item.fileName,
         found:found
      };
      newDocs.push(newDoc);
      // item.found = found;

    });
       this.props.updateFiles(files);
      // this.setState({ files });
    this.props.updateDocuments(newDocs);
  };

  closeSnackBar = () => {
    this.setState({ maxDocError: "" });
  };

  render() {
    let { acceptedFiles,documents,files, ...rest } = this.props;

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
            <ListItemText primary={item.name} secondary={"Required Filename : " + item.fileName}/>
          </ListItem>
        );

      })
    );
    return (
      <div>
        <Typography variant={"title"}>Required document<span>*</span></Typography>
        <List dense={true}>
          {docs}
        </List>
        <Dropzone accept={acceptedFiles} onDrop={this.onDrop} {...rest}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div style={{ padding: 40, border: 5, background: "#f8f8f8" }}
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
        <h5>List of selected files</h5>
        <List dense={true}>
          {view}
        </List>
        <Snackbar
          color={"error"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={Boolean(this.state.errors)}
          autoHideDuration={5000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.errors}</span>}
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
      </div>

    );
  }
}

DocumentsDropzoneFragment.propTypes = {
  documents: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  acceptedFiles: PropTypes.string.isRequired,
  updateFiles:PropTypes.func.isRequired,
  updateDocuments:PropTypes.func.isRequired,
};
export default DocumentsDropzoneFragment;
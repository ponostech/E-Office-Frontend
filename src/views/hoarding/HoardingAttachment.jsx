import React from "react";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";


class HoardingAttachment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    const files = [...this.state.files, ...acceptedFiles];
    this.setState({ files });
  };

  handleItemDelete = (file) => {
    console.log(file);
    const files = this.state.files.filter(value => value.name !== file.name);
    this.setState({ files });
  };


  render() {
    const { files } = this.state;
    const view = (
      files.map(value => {
        return <ListItem key={value.name}>
          <ListItemText secondary={value.size / 1024 + " Kb"} primary={value.name} color={"primary"}/>
          <ListItemSecondaryAction>
            <Tooltip title={"Click here to delete"}>
              <IconButton onClick={this.handleItemDelete.bind(this, value)}>
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>;
      })
    );
    return (
      <div>
        <h3>Required Documents<span>*</span></h3>
        <ul>
          <li>Structural Stability Certificate of the hoarding and building (if any)
            <br/>from licensed/registered Structural Engineer
          </li>
          <li>NOC form concerned Local Council</li>
          <li>NOC from the owner of land/property</li>
          <li>Tribal Certificate</li>
          <li>EPIC</li>
          <li>Two copies of photograph taken from the proposed site <br/>
            with marking of proposed hoarding thereon
          </li>
          <li>Engineer drawing of the proposed structure in triplicate duly signed by the Applicant</li>
        </ul>
        <Paper title={"Drop file"} style={{ padding: 40 }}>

          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
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
        </Paper>
        <h3>List of selected files</h3>
        <List>
          {view}
        </List>
      </div>
    );
  }
}

export default HoardingAttachment;
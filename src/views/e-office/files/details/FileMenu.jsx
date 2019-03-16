import React, { Component } from "react";
import { Card, CardContent, CardHeader, MenuItem, MenuList } from "@material-ui/core";
import MovementDialog from "../movements/MovementDialog";
import NotesheetTimelineView from "../notesheet/NotesheetTimelineView";

class FileMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      sendDialog:false,
      openNotesheet:false

    }
  }

  handleMovement=(data)=>{
     console.log(data)
    this.setState({
      sendDialog:false
    })
  }
  render() {
    return (
      <Card>
        <CardHeader title={"Menu"}/>
        <CardContent>
          <MenuList subheader={"Create"}>
            <MenuItem>Create Notesheet</MenuItem>
            <MenuItem>Create Draft</MenuItem>
            <MenuItem>Attach Receipt</MenuItem>
          </MenuList>
          <MenuList subheader={"View"}>
            <MenuItem>Draft</MenuItem>
            <MenuItem onClick={(e)=>{
              this.setState({openNotesheet:true})
            }}>Notesheet</MenuItem>
            <MenuItem>Movement</MenuItem>
          </MenuList>
          <MenuList subheader={"Action"}>
            <MenuItem onClick={(e) => this.setState({ sendDialog: true })}>Forward</MenuItem>
            <MenuItem>Archived</MenuItem>
          </MenuList>

          <MovementDialog onClose={this.handleMovement.bind(this)} open={this.state.sendDialog}/>
          <NotesheetTimelineView open={this.state.openNotesheet} onClose={(e)=>this.setState({openNotesheet:false})}/>
        </CardContent>
      </Card>
    );
  }
}

export default FileMenu;

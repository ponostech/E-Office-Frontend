import React, {Component} from 'react';
import axios from 'axios';
import {FILE_MOVEMENTS} from "../../../../../config/ApiRoutes";
import LoadingView from "../../../../common/LoadingView";
import {CardHeader, Divider, List, ListItem, ListItemText} from "@material-ui/core";

class FileMovements extends Component {
  state = {
    movements: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios.get(FILE_MOVEMENTS(this.props.file.id))
        .then(res => {
          if (res.data.status)
            this.setState({movements: res.data.data.file_movements, loading: false});
          console.log('return', res.data.data.file_movements);
        })
  }

  render() {
    const {loading, movements} = this.state;

    let list = "No movement";
    if(movements.length > 0)
      list = this.state.movements.map(res => {
        return <><ListItem><ListItemText primary={"Sent by " + res.sender.staff.name + " (" + res.sender.staff.designation + ")" + " to " + res.recipient.staff.name + " (" + res.sender.staff.designation + ")"} secondary={"On: " + res.created_at}/></ListItem><Divider/></>;
      });

    return (
        <>
          <CardHeader title="File Movement Details"/>
          <Divider/>
          {loading ? <LoadingView/> : <List>
            {list}
          </List>}
        </>
    );
  }
}

export default FileMovements;
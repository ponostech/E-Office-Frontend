import React, { Component } from "react";
import axios from "axios";
import { FILE_MOVEMENTS } from "../../../../../config/ApiRoutes";
import LoadingView from "../../../../common/LoadingView";
import {
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import moment from "moment";

class FileMovements extends Component {
  state = {
    movements: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios.get(FILE_MOVEMENTS(this.props.file.id)).then(res => {
      if (res.data.status)
        this.setState({
          movements: res.data.data.file_movements,
          loading: false
        });
    });
  }

  render() {
    const { loading, movements } = this.state;

    let list = "No file movement";
    if (movements.length > 0)
      list = this.state.movements.map(res => {
        return (
          <>
            <ListItem>
              <ListItemText
                style={{ textTransform: "capitalize" }}
                primary={
                  res.type +
                  " by " +
                  res.sender.staff.name +
                  " (" +
                  res.sender.staff.designation +
                  ")" +
                  " to " +
                  res.recipient.staff.name +
                  " (" +
                  res.recipient.staff.designation +
                  ")"
                }
                secondary={
                  "On: " + moment(res.created_at).format("Do MMMM YYYY (dddd)")
                }
              />
            </ListItem>
            <Divider />
          </>
        );
      });

    return (
      <>
        <CardHeader title="File Movement Details" />
        <Divider />
        {loading ? <LoadingView /> : <List>{list}</List>}
      </>
    );
  }
}

export default FileMovements;

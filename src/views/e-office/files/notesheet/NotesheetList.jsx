import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

class NotesheetList extends Component {
  render() {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText primary={"Subject One"} secondary={"Created by kimi on 12/12/2018"}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Subject Two"} secondary={"Created by Rini on 12/12/2018"}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Subject three"} secondary={"Created by kimi on 12/12/2017"}/>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default NotesheetList;
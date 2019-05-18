import React, { Component } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction, ListItemText,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

class SelectOptionView extends Component {
  state = {
    items: []
  };

  addItem = () => {
    let items = this.state.items;
    items.push({ name: "unique_name", value: "Value", label: "Display Name" });
    this.setState({ items });
  };
  handleDelete = (index, event) => {
    let items = [this.state.items];
    items.slice(index, 1);
    this.setState({ items });

    this.props.onChange(items);
  };

  handleChange = (index, e) => {
    let item = this.state.items[index];
    let temp = {};
    const { value, name } = e.target;
    switch (name) {
      case "name":
        temp.name = value;
        break;
      case "value":
        temp.value = value;
        break;
      case "label":
        temp.label = value;
        break;

    }
    Object.assign(item, temp);
    this.props.onChange(this.state.items);
  };

  render() {
    const { onChange } = this.props;
    const self = this;
    return (
      <div>
        <Button onClick={this.addItem.bind(this)}>Add</Button>

        <List>
          {
            this.state.items.map(function(item, index) {
              return (
                <div key={index}>
                  <ListItem>
                    <ListItemText>
                      <TextField
                        variant={"outlined"} margin={"dense"} name={"name"} required={true}
                        onChange={self.handleChange.bind(this, index)} label={"Name"}/>
                      <TextField
                        variant={"outlined"} margin={"dense"} name={"value"} required={true}
                        onChange={self.handleChange.bind(this, index)} label={"Value"}/>
                      <TextField
                        variant={"outlined"} margin={"dense"} name={"label"} required={true}
                        onChange={self.handleChange.bind(this, index)} label={"Label"}/>
                    </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={self.handleDelete.bind(this, index)}>
                          <TrashIcon color={"secondary"}/>
                        </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })
          }
        </List>
      </div>
    );
  }
}

SelectOptionView.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SelectOptionView;
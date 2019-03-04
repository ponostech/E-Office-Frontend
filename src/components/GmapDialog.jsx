import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { GoogleMap, Marker } from "react-google-maps";
import * as PropTypes from "prop-types";

class GMapDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 90,
      long: 30
    };
  }

  handleClick = (e) => {
    const { lat, long } = this.state;
    const { onClose } = this.props;
    const { name } = e.target;
    switch (name) {
      case "confirm":
        onClose(lat, long);
        break;
      case "cancel":
        onClose(null);
        break;
      default:
        break;
    }
  };

  confirm=(e)=>{
    console.log(e)
  }

  render() {
    const { open, onClose, isMarkerShown, ...rest } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={this.confirm.bind(this)} {...rest}>
          <DialogContent>
            <GoogleMap
              {...rest}
              defaultZoom={8}
              defaultCenter={{ lat: this.state.lat, lng: this.state.long }}
            >
              {isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.long }}/>}
            </GoogleMap>

          </DialogContent>
          <DialogActions>
            <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this)}>Confirm</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
  </div>
  )
  }
}

GMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};
export default ( GMapDialog );


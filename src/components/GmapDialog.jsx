import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import * as PropTypes from "prop-types";
import { MAP_API_KEY } from "../Configuration";

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      defaultOptions={{
        scrollwheel: true
      }}

    >
      <Marker
        draggable={true}
        onDragEnd={data=>props.onDragEnd(data.latLng)}
        position={{ lat: props.lat, lng: props.lng }}/>
    </GoogleMap>
  ))
);

class GMapDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 23.728355734275432,
      lng: 92.71896203968402
    };
  }

  handleClick = (e) => {
    const { lat, lng } = this.state;
    const { onClose } = this.props;
    const { name } = e.target;
    switch (name) {
      case "confirm":
        onClose(lat, lng);
        break;
      case "close":
        onClose(lat,lng);
        break;
      default:
        break;
    }
  };

  confirm = (e) => {
    console.log(e);
  };

  render() {
    const { open, onClose, isMarkerShown, ...rest } = this.props;
    const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`;
    return (
      <Dialog open={open} onClose={this.confirm.bind(this)} {...rest} fullScreen={true}>
        <DialogContent>
          <RegularMap

            onDragEnd={latLng=>{
              console.log(latLng)
              this.setState({
                lat:latLng.lat(),
                lng:latLng.lng()
              })
            }}
            isMarkerShown={isMarkerShown}
            googleMapURL={MAP_URL}
            loadingElement={<div style={{ height: `100%` }}/>}
            containerElement={<div style={{ width: "100%", height: "100%" }}> helll </div>}
            mapElement={<div style={{ height: `100%` }}/>}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          {/*withScriptJs(*/}
          {/*withGoogleMap(*/}
          {/*<GoogleMap*/}
          {/*{...rest}*/}
          {/*defaultZoom={8}*/}
          {/*defaultCenter={{ lat: this.state.lat, lng: this.state.long }}*/}
          {/*onClick={(e)=>this.setState({lat:e.pa.x,long:e.pa.y})}*/}
          {/*>*/}
          {/*{isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.long }}/>}*/}
          {/*</GoogleMap>*/}
          {/*)*/}
          {/*)*/}


        </DialogContent>
        <DialogActions>
          <Button name={"confirm"} variant={"contained"} color={"primary"}
                  onClick={this.handleClick.bind(this)}>Confirm</Button>
          <Button name={"close"} variant={"contained"} color={"secondary"}
                  onClick={this.handleClick.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};
export default GMapDialog;


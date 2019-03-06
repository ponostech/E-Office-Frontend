import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import * as PropTypes from "prop-types";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";

const SatelliteMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={3}
      mapTypeId={"satellite"}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }}/>
    </GoogleMap>
  ))
);

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }}/>
    </GoogleMap>
  ))
);

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
    const { open, onClose, isMarkerShown,containerElement, ...rest } = this.props;
    return (
        <Dialog open={open} onClose={this.confirm.bind(this)} {...rest} fullScreen={true}>
          <DialogContent>
            <GridContainer>
              <GridItem md={12}>
                <SatelliteMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhiSrRw6VWNkaDCGJJ4-pzRxaNgUo4KAc"
                  loadingElement={<div style={{ height: `100%` }}/>}
                  containerElement={
                    containerElement
                  }
                  mapElement={<div style={{ height: `100%` }}/>}
                />
              </GridItem>
            </GridContainer>
            {/*<GoogleMap*/}
              {/*{...rest}*/}
              {/*defaultZoom={8}*/}
              {/*defaultCenter={{ lat: this.state.lat, lng: this.state.long }}*/}
            {/*>*/}
              {/*{isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.long }}/>}*/}
            {/*</GoogleMap>*/}

          </DialogContent>
          <DialogActions>
            <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this)}>Confirm</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
  )
  }
}

GMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};
export default withGoogleMap( GMapDialog );


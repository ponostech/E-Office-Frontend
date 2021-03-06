import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import * as PropTypes from "prop-types";
import { MAP_API_KEY } from "../Configuration";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import "./mapStyle.css";

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap

      defaultZoom={15}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      center={props.center}
      defaultOptions={{
        scrollwheel: true
      }}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search places"
          style={{
            zIndex: 10,
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `340px`,
            height: `42px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
      <Marker
        draggable={!props.viewMode}
        onDragEnd={data => props.onDragEnd(data.latLng)}
        position={{ lat: props.lat, lng: props.lng }}/>
    </GoogleMap>
  ))
);

const refs = {};

class GMapDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      lat: 23.728355734275432,
      lng: 92.71896203968402,
      center:{
        lat:23.728355734275432,
        lng: 92.71896203968402
      }
    };
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const lat = nextProps.lat;
  //   const lng = nextProps.lng;
  //   const center = {
  //     lat,
  //     lng
  //   };
  //   if (lat && lng) {
  //     this.setState({lat,lng,center})
  //   }
  // }

  componentDidMount() {
    const lat = this.props.lat;
    const lng = this.props.lng;
    const center = {
      lat,
      lng
    };
    if (lat && lng) {
      this.setState({lat,lng,center})
    }
  }


  confirm = (e) => {
    console.log(e);
  };
  handleCancel = (e) => {
    const { onClose } = this.props;
    onClose(null, null);
  };
  handleConfirm = (e) => {
    const { lat, lng } = this.state;
    const { onClose } = this.props;
    onClose(lat, lng);
  };
  onPlacesChanged = (data) => {
    const places = refs.searchBox.getPlaces();

    const place = places[0];
    const lat=place.geometry.location.lat();
    const lng=place.geometry.location.lng();
    const center=new window.google.maps.LatLng(lat, lng);
    this.setState({
      lat,
      lng,
      center
    });

    // const bounds = new window.google.maps.LatLngBounds();
    //
    // places.forEach(place => {
    //   if (place.geometry.viewport) {
    //     bounds.union(place.geometry.viewport);
    //   } else {
    //     bounds.extend(place.geometry.location);
    //   }
    // });
    // const nextMarkers = places.map(place => ({
    //   position: place.geometry.location
    // }));

  };

  onSearchBoxMounted = ref => {
    refs.searchBox = ref;
  };

  render() {
    const { open, onClose, isMarkerShown,viewMode, ...rest } = this.props;
    return (
      <Dialog open={open} onClose={this.confirm.bind(this)} {...rest} fullScreen={true}>
        <DialogContent>
          <RegularMap
            viewMode={viewMode}
            center={this.state.center}
            bounds={this.state.bounds}
            onPlacesChanged={this.onPlacesChanged.bind(this)}
            onSearchBoxMounted={this.onSearchBoxMounted.bind(this)}
            onDragEnd={latLng => {
              this.setState({
                lat: latLng.lat(),
                lng: latLng.lng()
              });
            }}
            isMarkerShown={isMarkerShown}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }}/>}
            containerElement={<div style={{ width: "100%", height: "100%",marginBottom:"100px" }}>  </div>}
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
          {viewMode?undefined:<Button name={"confirm"} variant={"outlined"} color={"primary"}
                                      onClick={this.handleConfirm.bind(this)}>Confirm</Button>}
          <Button name={"close"} variant={"outlined"} color={"secondary"}
                  onClick={this.handleConfirm.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
GMapDialog.defaultProps={
  viewMode:false
}
GMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired,
  lat:PropTypes.number,
  lng:PropTypes.number,
  viewMode:PropTypes.bool
};
export default GMapDialog;


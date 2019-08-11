import React, {Component} from "react";
import PropTypes from "prop-types";
import {withScriptjs} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import {MAP_API_KEY} from "../Configuration";
import {TextField} from "@material-ui/core";

const Searchbox = withScriptjs(props => (

    <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        onPlacesChanged={props.onPlacesChanged}
    >
        <TextField
            InputProps={{
                autoComplete: "off"
            }}
            {...props.textFieldProps}
        />
    </StandaloneSearchBox>
));

class AddressField extends Component {
    constructor(props) {
        super(props);
        this.searchboxRef = null;
    }

    onSearchBoxMounted = ref => {
        this.searchboxRef = ref;
    };

    onPlacesChanged = () => {
        const places = this.searchboxRef.getPlaces();
        this.props.onPlaceSelect(places[0]);
    };

    render() {
        const {textFieldProps} = this.props;


        return (
            <Searchbox
                textFieldProps={textFieldProps}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                onPlacesChanged={this.onPlacesChanged}
                onSearchBoxMounted={this.onSearchBoxMounted}
            />
        );
    }
}

AddressField.propTypes = {
    onPlaceSelect: PropTypes.func.isRequired,
    textFieldProps: PropTypes.object
};

export default AddressField;
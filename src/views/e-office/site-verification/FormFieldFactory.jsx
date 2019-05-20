import React, { Component } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField, Tooltip
} from "@material-ui/core";
import OfficeSelect from "../../../components/OfficeSelect";
import WidgetConstant from "./constant/WidgetConstant";
import AddressField from "../../../components/AddressField";
import * as HoardingApplicationFormModel from "../../model/HoardingApplicationFormModel";
import MapIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GMapDialog from "../../../components/GmapDialog";
import GridContainer from "../../../components/Grid/GridContainer";

class FormFieldFactory extends Component {
state={
openMap:false
}
  render() {
    let {index, elementConfig, validation, value, changed, elementType } = this.props;

    switch (elementType) {
      case WidgetConstant.TEXTFIELD:
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            required={validation.required}
            label={elementConfig.label}
            placeholder={elementConfig.placeholder}
            value={value}
            onChange={changed}
          />
        );
        break;

      case WidgetConstant.NUMBER:
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            inputProps={{
              min: validation.minimum,
              max: validation.maximum
            }}
            type={"number"}
            label={elementConfig.label}
            placeholder={elementConfig.placeholder}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            required={validation.required}
            value={value}
            onChange={changed}
          />
        );
        break;
        case WidgetConstant.COORDINATE:
        this.inputElement = (
          <TextField
            value={value}
            name={elementConfig.name}
            margin={"dense"}
            fullWidth={true}
            variant={"outlined"}
            required={validation.required}
            onChange={e => {
            }}
            onClick={() => this.setState({ openMap: true })}
            label={elementConfig.label}
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <Tooltip title={"Click here to see the map"}>
                    <IconButton onClick={(e) => {
                      this.setState({ openMap: true });
                    }}>
                      <MapIcon color={"action"}/>
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        );
        break;
        case WidgetConstant.ADDRESS:
        this.inputElement = (
          <AddressField
            {...this.props.elementConfig}
            textFieldProps={{

              label:elementConfig.label,
              placeholder:elementConfig.placeholder,
              variant:"outlined",
              fullWidth:true,
              margin:"dense",
              required:validation.required,
              value:value,
              onChange:e=>changed(e.target.value,index)
            }}
            onPlaceSelect={(place)=>{
              if (place) {
                let name = place.name;
                let address = place.formatted_address;
                let complete_address = address.includes(name) ? address : `${name} ${address}`;
                changed(complete_address,index)
              }
            }}
          />
        );
        break;

      case WidgetConstant.SELECT:
        this.inputElement = (
          <OfficeSelect
            {...this.props.elementConfig}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            label={elementConfig.label}
            placeholder={elementConfig.placeholder}
            required={validation.required}
            value={value}
            onChange={changed}
            options={elementConfig.options}
          />
        );
        break;
      case WidgetConstant.RADIO:
        this.inputElement = (

          <FormControl component="div">
            <FormLabel required={validation.required}>{elementConfig.label}</FormLabel>
            <RadioGroup
              row={true}
              aria-label="Gender"
              name={elementConfig.name}
              value={value}
              onChange={changed}
            >
              {elementConfig.options.map(option => (
                <FormControlLabel name={option.name} value={option.value} control={<Radio/>} label={option.label}/>
              ))}

            </RadioGroup>
          </FormControl>
        );
        break;

      default:
        this.inputElement = (
          <TextField
            {...this.props.elementConfig}
            variant={"outlined"}
            fullWidth={true}
            margin={"dense"}
            required={validation.required}
            label={elementConfig.label}
            placeholder={elementConfig.placeholder}
            value={value}
            onChange={changed}
          />
        );
        break;
    }

    return <>{this.inputElement}
      </>;
  }

}

export default FormFieldFactory;
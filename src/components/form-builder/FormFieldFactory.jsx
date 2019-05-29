import React, { Component } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField, Tooltip
} from "@material-ui/core";
import OfficeSelect from "../OfficeSelect";
import WidgetConstant from "./WidgetConstant";
import AddressField from "../AddressField";
import * as HoardingApplicationFormModel from "../../views/model/HoardingApplicationFormModel";
import MapIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GMapDialog from "../GmapDialog";
import GridContainer from "../Grid/GridContainer";
import FileUpload from "../FileUpload";
import { APPLICATION_NAME } from "../../utils/Util";
import NotesheetAttachment from "../NotesheetAttachment";

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
        case WidgetConstant.PATTERN:
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
        case WidgetConstant.CHECKBOX:
        this.inputElement = (
          <FormControlLabel
            name={elementConfig.name}
            style={{ whiteSpace: "pre-line" }}
            control={
              <Checkbox required={validation.required}
                        color={"primary"}
                        value={value}
                        onChange={changed}/>
            }
            label={elementConfig.label}/>
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

          <FormControl fullWidth={true} margin={"dense"} component="div">
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
        case WidgetConstant.FILE_UPLOAD:
        this.inputElement = (
          <FileUpload document={{id:989898,name:"file upload",mandatory:validation.required,mime:"application/pdf"}}
                      onUploadSuccess={(data) => {
                        let temp = {
                          mandatory:validation.required,
                          document_id: 989898,
                          name:"file upload",
                          path: data.location
                        };
                        changed(temp,index)

                      }}
                      onUploadFailure={(err) => console.error(err)}
                      applicationName={"site verification"}/>
        );
        break;
        case WidgetConstant.IMAGE_UPLOAD:
        this.inputElement = (
          <FormControl>
            <FormLabel htmlFor={"image"}>{elementConfig.label}</FormLabel>
            <NotesheetAttachment value={value} id={"image"} onSuccess={items=>changed(items)} acceptedFiles={"image/*"}/>
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
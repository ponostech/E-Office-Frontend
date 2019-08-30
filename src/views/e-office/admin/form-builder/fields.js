import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField
} from "@material-ui/core";
import { APPLICATION_NAME } from "../../../../utils/Util";
import OfficeFileUpload from "../../../../components/OfficeFileUpload";
import NotesheetAttachment from "../../../../components/NotesheetAttachment";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import "date-fns";
import OfficeSelect from "../../../../components/OfficeSelect";
import axios from "axios";
import { ApiRoutes } from "../../../../config/ApiRoutes";
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import { TradeService } from "../../../../services/TradeService";

export const OfficeDatePicker = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        fullWidth={true}
        required={config.validation.required}
        InputLabelProps={{ shrink: true, required: config.validation.required }}
        label={config.label}
        margin="dense"
        name={key}
        variant="outlined"
        value={value}
        onChange={val => onChange(key, val)}
        format={"dd/MM/yyyy"}
      />
    </MuiPickersUtilsProvider>
  );
};
export const OfficeTextField = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <TextField
      fullWidth={true}
      type={"text"}
      name={key}
      required={config.validation.required}
      label={config.label}
      value={value}
      placeholder={config.placeholder}
      onChange={event => onChange(key, event.target.value)}
    />
  );
};
export const OfficeNumberField = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <TextField
      fullWidth={true}
      type={"number"}
      InputProps={{
        min: config.validation.min,
        max: config.validation.max
      }}
      name={key}
      required={config.validation.required}
      label={config.label}
      value={value}
      placeholder={config.placeholder}
      onChange={event => onChange(key, event.target.value)}
    />
  );
};
export const OfficeTextArea = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <TextField
      fullWidth={true}
      type={"text"}
      multi={true}
      rows={3}
      name={key}
      required={config.validation.required}
      label={config.label}
      value={value}
      placeholder={config.placeholder}
      onChange={event => onChange(key, event.target.value)}
    />
  );
};
export const OfficeSwitch = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <FormControlLabel
      control={
        <Switch
          name={key}
          onChange={val => onChange(key, val)}
          value={value}
          checked={value}
          color="primary"
        />
      }
      label={config.label}
    />
  );
};
export const OfficeFormSelect = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <OfficeSelect
      variant={"outlined"}
      margin={"dense"}
      value={value}
      required={config.validation.required}
      fullWidth={true}
      name={key}
      onChange={val => onChange(key, val)}
      ClearAble={true}
      placeholder={config.placeholder}
      label={config.label}
      options={config.options}/>
  );
};
export const OfficeRadio = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormLabel component={"label"}>{config.label}</FormLabel>
      <RadioGroup
        name={key}
        row={true}
        value={value}
        onChange={val => onChange(key, val)}
      >
        {config.options.map(item =>
          <FormControlLabel value={item.value} label={item.label}
                            control={<Radio color={"primary"}/>}
          />
        )}

      </RadioGroup>
    </FormControl>
  );
};
export const OfficePremiseRadio = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormLabel component={"label"}>{config.label}</FormLabel>
      <RadioGroup
        name={key}
        row={true}
        value={value}
        onChange={val => onChange(key, val)}
      >
          <FormControlLabel value={"Owned"} label={"Owned"}
                            control={<Radio color={"primary"}/>}/>
          <FormControlLabel value={"Leased"} label={"Leased"}
                            control={<Radio color={"primary"}/>}/>

      </RadioGroup>
    </FormControl>
  );
};

export const OfficeCheckbox = ({ key, config, application, onChange }) => {
  let value = application[key];
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormControlLabel
        style={{ whiteSpace: "pre-line", alignItems: "flex-start" }}
        control={
          <Checkbox required={config.validation.required} checked={value} color={"primary"}
                    onChange={(val, checked) => onChange(key, checked)}/>
        }
        label={config.label}/>
    </FormControl>
  );
};

export const SiteFileUpload = ({ key, config, application, onChange }) => {
  let value = application[key] ? application[key] : {
    name: key,
    location: null,
    mime: "application/pdf",
    mandatory: config.validation.required,
    status: "ready"
  };
  return (
    <OfficeFileUpload applicationName={APPLICATION_NAME.SITE_VERIFICATION}
                      document={value}
                      onUploadSuccess={(data) => {
                        this.setState(state => {
                          let result = {
                            name: key,
                            label: config.label,
                            location: data.location
                          };
                          onChange(key, result);
                        });
                      }} onUploadFailure={(err) => {
      console.log(err);
    }}/>
  );
};


export const OfficeImageList = ({ key, config, application, onChange }) => {
  const onSuccess = (attachments) => {
    onChange(key, attachments);
  };

  return (
    <>
      <FormControl fullWidth={true} component={"div"}>
        <FormLabel component={"label"} required={config.validation.required}>{config.label}</FormLabel>
        <NotesheetAttachment value={[]} onSuccess={onSuccess}/>
      </FormControl>
    </>
  );
};

export class OfficeLocalCouncil extends React.Component  {

  constructor(props) {
    super(props);
    this.state={
      options:[]
    }
    this.localCouncilService = new LocalCouncilService();
  }

  componentDidMount() {
    this.localCouncilService.fetch(err=>console.log(err),
      options=>this.setState({options}))
      .finally(()=>console.log("local council request done"))
  }
  render() {
    const{ key, config, application, onChange }=this.props;
    const { options } = this.state;

    let value = application[key];

    return(

     <OfficeSelect
      variant={"outlined"}
      margin={"dense"}
      value={value}
      required={config.validation.required}
      fullWidth={true}
      name={key}
      onChange={val => onChange(key, val)}
      ClearAble={true}
      placeholder={config.placeholder}
      label={config.label}
      options={options}/>
    )
  }

};
export class OfficeTrade extends React.Component  {

  constructor(props) {
    super(props);
    this.state={
      options:[]
    }
    this.tradeService = new TradeService();
  }

  componentDidMount() {
    this.tradeService.all(err=>console.log(err),
      options=>this.setState({options}))
      .finally(()=>console.log("local council request done"))
  }
  render() {
    const{ key, config, application, onChange }=this.props;
    const { options } = this.state;

    let value = application[key];

    return(

     <OfficeSelect
      variant={"outlined"}
      margin={"dense"}
      value={value}
      required={config.validation.required}
      fullWidth={true}
      name={key}
      onChange={val => onChange(key, val)}
      ClearAble={true}
      placeholder={config.placeholder}
      label={config.label}
      options={options}/>
    )
  }

};
export class OfficeApplicantType extends React.Component  {

  constructor(props) {
    super(props);
    this.state={
      options:[
        {value: "proprietor", label: "Proprietor"},
        {value: "partnership", label: "Partnership"},
        {value: "private limited", label: "Private Limited"}
      ]
    }
  }
  render() {
    const{ key, config, application, onChange }=this.props;
    const { options } = this.state;

    let value = application[key];

    return(

     <OfficeSelect
      variant={"outlined"}
      margin={"dense"}
      value={value}
      required={config.validation.required}
      fullWidth={true}
      name={key}
      onChange={val => onChange(key, val)}
      ClearAble={true}
      placeholder={config.placeholder}
      label={config.label}
      options={options}/>
    )
  }

};
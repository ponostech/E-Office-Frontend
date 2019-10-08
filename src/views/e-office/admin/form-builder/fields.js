import React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Switch,
  TextField
} from "@material-ui/core";
import { APPLICATION_NAME } from "../../../../utils/Util";
import OfficeFileUpload from "../../../../components/OfficeFileUpload";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import "date-fns";
import OfficeSelect from "../../../../components/OfficeSelect";
import { LocalCouncilService } from "../../../../services/LocalCouncilService";
import { TradeService } from "../../../../services/TradeService";
import GMapDialog from "../../../../components/GmapDialog";
import PlaceIcon from "@material-ui/icons/Place";
import { AttachmentView } from "../../../../components/NotesheetAttachmentItem";

export const OfficeDatePicker = ({ field, config, value, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        fullWidth={true}
        required={config.validation.required}
        InputLabelProps={{ shrink: true, required: config.validation.required }}
        label={config.label}
        margin="dense"
        name={field}
        variant="outlined"
        value={value}
        onChange={date => {
          console.log("Date select", date);
          onChange(field, date);
        }}
        format={"dd/MM/yyyy"}
      />
    </MuiPickersUtilsProvider>
  );
};
export const OfficeTextField = ({ field, config, value, onChange }) => {
  // let value = application?application[field]:null;
  // let value=formData[field]
  return (
    <TextField
      fullWidth={true}
      type={"text"}
      name={field}
      variant={"outlined"}
      required={config.validation.required}
      label={config.label}
      value={value}
      placeholder={config.placeholder}
      onChange={event => onChange(field, event.target.value)}
    />
  );
};
export const OfficeNumberField = ({ field, config, value, onChange }) => {
  return (
    <TextField
      fullWidth={true}
      type={"number"}
      InputProps={{
        min: config.validation.min,
        max: config.validation.max
      }}
      variant={"outlined"}
      name={field}
      required={config.validation.required}
      label={config.label}
      value={value}
      placeholder={config.placeholder}
      onChange={event => onChange(field, event.target.value)}
    />
  );
};
// export const OfficeTextArea = ({ field, config, value, onChange }) => {
//   return (
//     <TextField
//       variant={"outlined"}
//       fullWidth={true}
//       type={"text"}
//       multi={true}
//       rows={3}
//       name={field}
//       required={config.validation.required}
//       label={config.label}
//       value={value}
//       placeholder={config.placeholder}
//       onChange={event => onChange(field, event.target.value)}
//     />
//   );
// };
export const OfficeSwitch = ({ field, config, value, onChange }) => {
  return (
    <FormControlLabel

      control={
        <Switch
          required={config.validation.required}
          name={field}
          onChange={event => onChange(field, event.target.checked)}
          value={value}
          checked={value}
          color="primary"
        />
      }
      label={config.label}
    />
  );
};
export const OfficeFormSelect = ({ field, config, value, onChange }) => {
  return (
    <OfficeSelect
      variant={"outlined"}
      margin={"dense"}
      value={value}
      required={config.validation.required}
      fullWidth={true}
      name={field}
      onChange={val => onChange(field, val)}
      ClearAble={true}
      placeholder={config.placeholder}
      label={config.label}
      options={config.options}/>
  );
};
export const OfficeRadio = ({ field, config, value, onChange }) => {
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormLabel component={"label"}>{config.label}</FormLabel>
      <RadioGroup
        name={field}
        row={true}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
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
export const OfficePremiseRadio = ({ field, config, value, onChange }) => {
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormLabel component={"label"}>{config.label}</FormLabel>
      <RadioGroup
        name={field}
        row={true}
        value={value}
        onChange={val => onChange(field, val)}
      >
        <FormControlLabel value={"Owned"} label={"Owned"}
                          control={<Radio color={"primary"}/>}/>
        <FormControlLabel value={"Leased"} label={"Leased"}
                          control={<Radio color={"primary"}/>}/>

      </RadioGroup>
    </FormControl>
  );
};

export const OfficeCheckbox = ({ field, config, value, onChange }) => {
  return (
    <FormControl component={"div"} fullWidth={true} margin={"dense"}>
      <FormControlLabel
        style={{ whiteSpace: "pre-line", alignItems: "flex-start" }}
        control={
          <Checkbox required={config.validation.required} checked={value} color={"primary"}
                    onChange={(val, checked) => onChange(field, checked)}/>
        }
        label={config.label}/>
    </FormControl>
  );
};

export const SiteFileUpload = ({ field, config, value, onChange }) => {
  value = value ? value : {
    name: field,
    location: null,
    mime: "application/pdf",
    mandatory: config.validation.required,
    status: "ready"
  };
  return (
    <OfficeFileUpload applicationName={APPLICATION_NAME.SITE_VERIFICATION}
                      document={value}
                      onUploadSuccess={(data) => {
                        onChange(field, data.location);
                      }} onUploadFailure={(err) => {
      console.log(err);
    }}/>
  );
};


export const OfficeImageList = ({ field, config, value, onChange }) => {
  const onSuccess = (attachments) => {
    onChange(field, attachments);
  };

  return (
    <>
      <FormControl fullWidth={true} component={"div"}>
        <FormLabel component={"label"} required={config.validation.required}>{config.label}</FormLabel>
        <AttachmentView acceptedFiles={"image/*"} onSuccess={onSuccess} attachments={value}/>
      </FormControl>
    </>
  );
};

export class OfficeLocalCouncil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.localCouncilService = new LocalCouncilService();
  }

  componentDidMount() {
    this.localCouncilService.fetch(err => console.log(err),
      options => this.setState({ options }))
      .finally(() => console.log("local council request done"));
  }

  render() {
    const { field, config, value, onChange } = this.props;
    const { options } = this.state;

    return (

      <OfficeSelect
        variant={"outlined"}
        margin={"dense"}
        value={value}
        required={config.validation.required}
        fullWidth={true}
        name={field}
        onChange={val => onChange(field, val)}
        ClearAble={true}
        placeholder={config.placeholder}
        label={config.label}
        options={options}/>
    );
  }

}

export class OfficeTrade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.tradeService = new TradeService();
  }

  componentDidMount() {
    this.tradeService.all(err => console.log(err),
      options => this.setState({ options }))
      .finally(() => console.log("local council request done"));
  }

  render() {
    const { field, config, value, onChange } = this.props;
    const { options } = this.state;

    return (

      <OfficeSelect
        variant={"outlined"}
        margin={"dense"}
        value={value}
        required={config.validation.required}
        fullWidth={true}
        name={field}
        onChange={val => onChange(field, val)}
        ClearAble={true}
        placeholder={config.placeholder}
        label={config.label}
        options={options}/>
    );
  }

}

export class OfficeApplicantType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "proprietor", label: "Proprietor" },
        { value: "partnership", label: "Partnership" },
        { value: "private limited", label: "Private Limited" }
      ]
    };
  }

  render() {
    const { field, config, value, onChange } = this.props;
    const { options } = this.state;

    return (

      <OfficeSelect
        variant={"outlined"}
        margin={"dense"}
        value={value}
        required={config.validation.required}
        fullWidth={true}
        name={field}
        onChange={val => onChange(field, val)}
        ClearAble={true}
        placeholder={config.placeholder}
        label={config.label}
        options={options}/>
    );
  }

}

export class OfficeCoordinate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMap: false
    };
  }

  setCoordinate = (latitude, longitude) => {
    const { field, onChange } = this.props;
    onChange(field, { latitude, longitude });
    this.setState({ openMap: false });
  };

  render() {
    const { field, config, value, onChange } = this.props;
    const { openMap } = this.state;
    let str = value ? `Latitude: ${value.latitude} , Longitude: ${value.longitude} ` : "";

    return (

      <>
        <TextField
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position={"end"}>
                <Button color={"default"} variant={"outlined"} onClick={(e) => this.setState({ openMap: true })}>
                  <PlaceIcon/>
                </Button>
              </InputAdornment>
            )
          }}
          variant={"outlined"}
          margin={"dense"}
          value={str}
          required={config.validation.required}
          fullWidth={true}
          name={field}
          onClick={e => this.setState({ openMap: true })}
          ClearAble={true}
          placeholder={config.placeholder}
          label={config.label}/>

        <GMapDialog open={openMap} isMarkerShown={true} onClose={this.setCoordinate}/>
      </>
    );
  }

}
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, TextField } from "@material-ui/core";
import React from "react";
import OfficeSelect from "../components/OfficeSelect";
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox'

const defaultRadioValues=[
  {value:"0",lable:'label 1'},
  {value:"1",lable:'label 2'}
]

export default class FormControlUtils {

  static Input(name,value, label,required,error,helperText,margin,onChange,fullWidth,...rest) {
      return <TextField
        variant={"standard"}
        value={value}
      name={name}
      required={required}
      error={error}
      helperText={helperText}
      margin={margin}
      onChange={onChange}
        fullWidth={fullWidth}
        {...rest}
      />
  }
  static TextArea(name,value, label,required,error,helperText,margin,onChange,fullWidth,...rest) {
      return <TextField
        variant={"standard"}
        value={value}
        rows={30}
        multiline={true}
      name={name}
      required={required}
      error={error}
      helperText={helperText}
      margin={margin}
      onChange={onChange}
        fullWidth={fullWidth}
        {...rest}
      />
  }
  static Select(name,value, label,required,error,helperText,margin,options,onChange,fullWidth,...rest) {
      return <OfficeSelect
        variant={"standard"}
        name={name}
      value={value}
      required={required}
      error={error}
      helperText={helperText}
      margin={margin}
      options={options}
      onChange={onChange}
        fullWidth={fullWidth}
        {...rest}
      />
  }
  static Radio(name,value, label,onChange,fullWidth,values=defaultRadioValues,...rest) {
      return <FormControl fullWidth={fullWidth} margin={"dense"}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            defaultValue={value}
            value={value}
            name={name}
            row={true}
            onChange={onChange}
            {...rest}
          >
            {values.forEach(item=>{
              return <FormControlLabel value={item.value} control={<Radio/>} label={item.label}/>
            })}
          </RadioGroup>
      </FormControl>
  }
  static Switch(name,value, label,onChange,...rest) {
      return <FormControl margin={"dense"}>
        <FormControlLabel onChange={onChange}
                          name={name}
                          control={
                            <Switch
                              {...rest}
                              value={value}
                              checked={value}
                              required={rest}/>
                          }
                          label={label}/>
      </FormControl>
  }
  static NumberInput(name,value, label,required,error,helperText,margin,onChange,fullWidth,...rest) {
    return <TextField
      variant={"standard"}
      fullWidth={fullWidth}
      type={"number"}
      value={value}
      name={name}
      required={required}
      error={error}
      helperText={helperText}
      margin={margin}
      onChange={onChange}
      {...rest}
    />
  }
  static AddressField(name,value, label,required,error,helperText,margin,onChange,fullWidth,onPlaceChanged,...rest) {
    return <StandaloneSearchBox
      // bounds={bounds}
      onPlacesChanged={onPlaceChanged}
    >
      <TextField
        variant={"standard"}
        value={value}
        name={name}
        required={required}
        error={error}
        helperText={helperText}
        margin={margin}
        onChange={onChange}
        {...rest}
      />
    </StandaloneSearchBox>
  }
};
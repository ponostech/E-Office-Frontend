import { FILLABLE_TYPE, WIDGET_TYPE } from "./constant";
import { FormControl, Icon, IconButton, InputAdornment, TextField } from "@material-ui/core";
import {
  OfficeCheckbox,
  OfficeDatePicker, OfficeFormSelect,
  OfficeImageList,
  OfficeLocalCouncil,
  OfficeRadio, OfficeSwitch,
  OfficeTextField,
  SiteFileUpload
} from "./fields";
import React from "react";

export const getControl=(key, config,application,onWidgetValueChange)=>{
    let value=application[key];
    switch (config.type) {
      case WIDGET_TYPE.TEXT_FIELD:
        return <>
          <OfficeTextField onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.RADIO:
        return <>
          <OfficeRadio onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.SELECT:
        return <>
          <OfficeFormSelect onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.CHECKBOX:
        return <>
          <OfficeCheckbox onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.SWITCH:
        return <>
          <OfficeSwitch onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.DATE_PICKER:
        return <>
          <OfficeDatePicker onChange={val=>onWidgetValueChange(key,val)} config={config} key={key} application={application}/>
        </>
      case WIDGET_TYPE.FILE_UPLOAD:
        return <FormControl component={"div"}>
          <SiteFileUpload onChange={onWidgetValueChange} config={config} key={key} application={application}/>
        </FormControl>
      case WIDGET_TYPE.IMAGE_LIST:
        return <>
          <OfficeImageList application={null} key={key} config={config} onChange={onWidgetValueChange}/>
        </>
      case FILLABLE_TYPE.LOCAL_COUNCIL:
        return <>
          <OfficeLocalCouncil application={{local_council:{value:"Zarkawt",label:"Zarkawt"}}} key={key} config={config} onChange={onWidgetValueChange}/>
        </>
      case FILLABLE_TYPE.TRADE:
        return <>
          <OfficeLocalCouncil application={{local_council:{value:"Zarkawt",label:"Zarkawt"}}} key={key} config={config} onChange={onWidgetValueChange}/>
        </>

      case "select":
        return <p>select</p>;
      default:
        return <TextField
          type={"text"}
          name={key}
          required={config.validation.required}
          label={config.label}
          value={value}
          placeholder={config.placeholder}
          onChange={event => onWidgetValueChange(key, event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position={"end"}>

              </InputAdornment>
            )
          }}
        />;

    }
}
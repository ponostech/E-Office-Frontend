import { FILLABLE_TYPE, WIDGET_TYPE } from "./constant";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import {
  OfficeCheckbox,
  OfficeDatePicker,
  OfficeFormSelect,
  OfficeImageList,
  OfficeLocalCouncil,
  OfficePremiseRadio,
  OfficeRadio,
  OfficeSwitch,
  OfficeTextField, OfficeTrade,
  SiteFileUpload
} from "./fields";
import React from "react";

export const
  getControl = (key, config,formData, application, onWidgetValueChange) => {
    let value = application[key];
    formData[key]=value;
    switch (config.type) {
      case WIDGET_TYPE.TEXT_FIELD:
        return <>
          <OfficeTextField formData={formData} onChange={onWidgetValueChange} config={config} field={key} application={application}/>
        </>;
      case WIDGET_TYPE.RADIO:
        return <>
          <OfficeRadio onChange={onWidgetValueChange} config={config} field={key} application={application}/>
        </>;
      case WIDGET_TYPE.SELECT:
        return <>
          <OfficeFormSelect onChange={onWidgetValueChange} config={config} field={key} application={application}/>
        </>;
      case WIDGET_TYPE.CHECKBOX:
        return <>
          <OfficeCheckbox onChange={onWidgetValueChange} config={config} field={key} application={application}/>
        </>;
      case WIDGET_TYPE.SWITCH:
        return <>
          <OfficeSwitch onChange={onWidgetValueChange} config={config} field={key} application={application}/>
        </>;
      case WIDGET_TYPE.DATE_PICKER:
        return <>
          <OfficeDatePicker onChange={val => onWidgetValueChange(key, val)} config={config} field={key}
                            application={application}/>
        </>;
      case WIDGET_TYPE.FILE_UPLOAD:
        return <>
          <FormControl component={"div"}>
            <SiteFileUpload onChange={onWidgetValueChange} config={config} field={key} application={application}/>
          </FormControl>;
        </>;
      case WIDGET_TYPE.IMAGE_LIST:
        return <>
          <OfficeImageList application={null} field={key} config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.LOCAL_COUNCIL:
        return <>
          <OfficeLocalCouncil application={{ local_council: { value: "Zarkawt", label: "Zarkawt" } }} field={key}
                              config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.TRADE:
        return <>
          <OfficeTrade application={{ local_council: { value: "Zarkawt", label: "Zarkawt" } }} field={key}
                              config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.TEXT_FIELD:
        return <OfficeTextField formData={formData} application={null} onChange={onWidgetValueChange} field={key} config={config}/>;
      case FILLABLE_TYPE.DATE:
        return <OfficeDatePicker config={config} field={key} onChange={onWidgetValueChange} application={null}/>;
      case FILLABLE_TYPE.PASSPORT:
        return <SiteFileUpload application={null} onChange={onWidgetValueChange} field={key} config={config}/>;

      case FILLABLE_TYPE.PREMISED:
        return <OfficePremiseRadio config={config} field={key} onChange={onWidgetValueChange} application={null}/>;

      default:
        return null

    }
  };
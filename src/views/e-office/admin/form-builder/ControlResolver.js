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
  getControl = (key, config,formData, onWidgetValueChange) => {
    let value = formData[key];
    switch (config.type) {
      case WIDGET_TYPE.TEXT_FIELD:
        return <>
          <OfficeTextField value={formData[key]}  onChange={onWidgetValueChange} config={config} field={key} />
        </>;
      case WIDGET_TYPE.RADIO:
        return <>
          <OfficeRadio onChange={onWidgetValueChange} config={config} field={key}  value={value} />
        </>;
      case WIDGET_TYPE.SELECT:
        return <>
          <OfficeFormSelect onChange={onWidgetValueChange} config={config} field={key} value={value}/>
        </>;
      case WIDGET_TYPE.CHECKBOX:
        return <>
          <OfficeCheckbox onChange={onWidgetValueChange} config={config} field={key} value={value}/>
        </>;
      case WIDGET_TYPE.SWITCH:
        return <>
          <OfficeSwitch onChange={onWidgetValueChange} config={config} field={key} value={value}/>
        </>;
      case WIDGET_TYPE.DATE_PICKER:
        return <>
          <OfficeDatePicker onChange={val => onWidgetValueChange(key, val)} config={config} field={key}
                           value={value}/>
        </>;
      case WIDGET_TYPE.FILE_UPLOAD:
        return <>
          <FormControl component={"div"}>
            <SiteFileUpload onChange={onWidgetValueChange} config={config} field={key} value={value}/>
          </FormControl>;
        </>;
      case WIDGET_TYPE.IMAGE_LIST:
        return <>
          <OfficeImageList value={value} field={key} config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.LOCAL_COUNCIL:
        return <>
          <OfficeLocalCouncil value={value} field={key}
                              config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.TRADE:
        return <>
          <OfficeTrade value={value} field={key}
                              config={config} onChange={onWidgetValueChange}/>
        </>;
      case FILLABLE_TYPE.TEXT_FIELD:
        return <OfficeTextField value={value}  onChange={onWidgetValueChange} field={key} config={config}/>;
      case FILLABLE_TYPE.DATE:
        return <OfficeDatePicker config={config} field={key} onChange={onWidgetValueChange} value={value}/>;
      case FILLABLE_TYPE.PASSPORT:
        return <SiteFileUpload value={value} onChange={onWidgetValueChange} field={key} config={config}/>;

      case FILLABLE_TYPE.PREMISED:
        return <OfficePremiseRadio config={config} field={key} onChange={onWidgetValueChange} value={value}/>;

      default:
        return null

    }
  };
import React, { Component } from "react";
import { Icon, IconButton, InputAdornment, TextField } from "@material-ui/core";

const Field=({application,key,config,onChange,formData})=>{

  let value=application?application[key]:null;
  formData[key] = value;
  const getWidget = (key, config) => {
    switch (config) {
      case "radio":
        return <p>radio</p>;
      case "select":
        return <p>select</p>;
      default:
        return <TextField
          type={"text"}
          name={key}
          required={config.validation.required}
          error={config.validation.error}
          helperText={config.validation.errorText}
          label={config.label}
          value={formData[key]}
          defaultValue={config.defaultValue}
          onChange={event => onChange(key, event.target.value)}
        />;
    }
  };
  return(
    <>
      {getWidget(key,config)}
      </>
  )
}

class SiteVerificationCreateDialog extends Component {
  constructor(props) {
    super(props);
    this.state={

      standardWidgetList:{},
      fillableWidgetList:{},
      formData:{}
    }
  }
  onChange=(key,value)=>{
    const { formData } = this.state;
    let temp = formData;
    temp[key]=value
    this.setState({formData:temp})
  }

  render() {
    const { standardWidgetList,formData } = this.state;
    const { application } = this.state;
    return (
      <>
        {Object.entries(standardWidgetList).map((key,value)=>
        <>
          <Field formData={formData} onChange={this.onChange(key,value)} config={value} key={key}/>
          </>
        )}
        {Object.entries(standardWidgetList).map((key,value)=>
          <>
            <Field application={application} formData={formData} onChange={this.onChange(key,value)} config={value} key={key}/>
          </>
        )}
      </>
    );
  }
}

export default SiteVerificationCreateDialog;
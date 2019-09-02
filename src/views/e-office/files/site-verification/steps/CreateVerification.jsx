import React, { Component } from "reactn";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import WidgetConstant from "../../../../../components/form-builder/WidgetConstant";
import GridItem from "../../../../../components/Grid/GridItem";
import FormFieldFactory from "../../../../../components/form-builder/FormFieldFactory";
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LoadingView from "../../../../common/LoadingView";
import PropTypes from "prop-types";
import { getControl } from "../../../admin/form-builder/ControlResolver";

class CreateVerification extends Component {
  siteVerification = new SiteVerificationService();
  state = {
    title: "",
    subTitle: "",
    formElements:[],
    loading:true
  };

  componentDidMount() {
    this.siteVerification.getTemplate("shop", errorMessage => this.setState({ errorMessage }), template => {
      this.setState({
        title: template.data.title,
        subTitle: template.data.subTitle,
        formElements: template.data.formElements
      });
    })
      .finally(() => this.setState({ loading: false }));
  }

  checkValidity(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = Boolean(value);
    } else if (validation.pattern) {
      isValid = value.match(validation.pattern);
    }

    return isValid;
  }

  createSiteVerification = () => {
    const { file } = this.props;
    const formData = [];
    const elements = this.state.formElements;
    let valid = true;
    elements.forEach(function(element, index) {
      if (!element.valid) {
        valid = false;
      }
      let data={
        name:element.elementConfig.label,
        value:element.value.value ? element.value.value : element.value
      };
      formData.push(data)
    });
    if (!valid) {
      this.setGlobal({ errorMsg: "Please fill all the required field" });
    } else {
      let url = "site-verifications/" + file.id;
      let template = {
        formElements: this.state.formElements
      };
      this.props.onCreateSiteVerification({
        formData,template
      });
    }
  };

  inputChangedHandler = (event, key) => {
    const newElements = [
      ...this.state.formElements
    ];

    let element = newElements[key];
    if (element.elementType === WidgetConstant.SELECT) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.CHECKBOX) {
      element.value = event.target.checked;
    } else if (element.elementType === WidgetConstant.ADDRESS) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.FILE_UPLOAD) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.IMAGE_UPLOAD) {
      element.value = event;
    } else {
      element.value = event.target.value;
    }
    element.valid = this.checkValidity(element.value, element.validation);

    this.setState({ formElements: newElements });
  };
  onChange=(key,value)=>{

  }

  generateForm=()=>{
    const { formElements } = this.state;
    const { application } = this.props;
    let view=<p>No site verification</p>
    view=Object.entries(formElements).map(([key, config])=>
      <>
        <GridItem key={key} md={6}>
          {getControl(key,config,application,this.onChange)}
        </GridItem>
      </>
    )
  }
  render() {
    const { formElements, loading } = this.state;
    const { onNext, file, onBack } = this.props;

    let form = (<p>No site verification is generated</p>);
    if (formElements) {
      form = (
        <>
          {formElements.map((element, index) => (
            <GridItem key={index} md={6}>

              <FormFieldFactory
                key={index}
                elementType={element.elementType}
                elementConfig={element.elementConfig}
                validation={element.validation}
                value={element.value}
                changed={event => this.inputChangedHandler(event, index)}
              />
            </GridItem>
          ))}

        </>
      );
    }
    return (
      <Card>
        <CardHeader title={"FILE NO: " + file.number} subheader={"SITE VERIFICATION OF" + file.subject}/>
        <Divider component={"li"}/>
        <CardContent>
          <Grid container={true} justify={"flex-start"} spacing={3}>
            {loading ? <LoadingView/> : form}
          </Grid>
        </CardContent>
        <Divider component={"li"}/>
        <CardActions>
          <Button href={"#"} variant={"outlined"} onClick={event => this.createSiteVerification()}
                  color={"primary"}> Create</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button href={"#"} variant={"outlined"} color={"secondary"}
                  onClick={e => onBack()}> Back</Button>
        </CardActions>
      </Card>
    );
  }
}

CreateVerification.propTypes = {
  file: PropTypes.object.isRequired,
  onCreateSiteVerification: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default CreateVerification;
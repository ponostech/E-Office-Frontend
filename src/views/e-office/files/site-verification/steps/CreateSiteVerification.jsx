import React, { Component } from "reactn";
import { SiteVerificationService } from "../../../../../services/SiteVerificationService";
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LoadingView from "../../../../common/LoadingView";
import PropTypes from "prop-types";
import { getControl } from "../../../admin/form-builder/ControlResolver";

class CreateSiteVerification extends Component {
  siteVerification = new SiteVerificationService();
  state = {
    title: "",
    subTitle: "",
    formElements: [],
    loading: true,
    formData: {}
  };

  componentDidMount() {
    const { application } = this.props;

    this.siteVerification.getTemplate("shop", errorMessage => this.setState({ errorMessage }), template => {
      let formData = {};
      for (let [key, value] of Object.entries(template.data.formElements)) {
        formData[key] = null;
      }
      let data = Object.assign(formData, application);
      this.setState({
        formElements: template.data.formElements,
        formData: data
      });
    })
      .finally(() => this.setState({ loading: false }));
  }

  validateInput = () => {
    const { formData, formElements } = this.state;
    let validRequired = false;
    let validMinMax = false;
    let validPattern = false;
    Object.entries(formElements).forEach(([key, config]) => {
      const { required, pattern, min, max } = config.validation;
      const value = formData[key];
      if (value) {
        if (required === Boolean(value)) {
          validRequired = true;
        }
        if (value.length > min && value.length < max) {
          validMinMax = true;
        }
        if (pattern && value.match(pattern)) {
          validPattern = true;
        }
      }
    });
    return validPattern && validMinMax && validRequired;
  };

  createSiteVerification = () => {
    const { formData, formElements } = this.state;
    const { file } = this.props;
    let valid = this.validateInput();

    if (!valid) {
      this.setGlobal({ errorMsg: "Validation:There is an error" });
    } else {
      let url = "site-verifications/" + file.id;

      this.props.onCreateSiteVerification({
        formData, formElements
      });
    }
  };
  onChange = (key, value) => {
    console.log("key", key);
    console.log("value", value);
    const { formData, formElements } = this.state;
    let temp = formData;
    temp[key] = value;
    this.setState({ formData: temp });
  };

  generateForm = () => {
    const { formElements, formData } = this.state;
    let view = <p>No site verification</p>;

    view = Object.keys(formElements).map((key, index) => {
        return <Grid item={true} key={index} md={6}>
          {getControl(key, formElements[key], formData, this.onChange)}
        </Grid>;
      }
    );
    return view;
  };

  render() {
    const { formElements, loading } = this.state;
    const { onNext, file, onBack } = this.props;

    let form = this.generateForm();
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

CreateSiteVerification.propTypes = {
  file: PropTypes.object.isRequired,
  onCreateSiteVerification: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
export default CreateSiteVerification;
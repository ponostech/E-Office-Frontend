import React, { Component } from "react";
import GridItem from "../Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton } from "@material-ui/core";
import FormFieldFactory from "./FormFieldFactory";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import OfficeSelect from "../OfficeSelect";
import GridContainer from "../Grid/GridContainer";
import { SiteVerificationService } from "../../services/SiteVerificationService";
import OfficeSnackbar from "../OfficeSnackbar";
import SubmitDialog from "../SubmitDialog";
import { withRouter } from "react-router-dom";

const options = [
  { value: "hoarding", label: "Hoarding site verification" },
  { value: "kiosk", label: "Kiosk site verification" },
  { value: "shop", label: "Shop site verification" },
  { value: "hotel", label: "Hotel site verification" }
];

class DynamicFormPreview extends Component {

  siteVerificationService = new SiteVerificationService();

  state = {
    title: "Title",
    subTitle: "Subtitle",
    formElements: [],

    selectedType: { value: "hoarding", label: "Hoarding site verification" },

    errorMessage: "",
    successMessage: "",
    submit:false
  };
  submitHandler = event => {

    let type = this.state.selectedType.value;
    let formElements = [];
    this.state.formElements.forEach(item => {
      formElements.push(item.config);
    });
    let data = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      formElements: formElements
    };
    this.setState({ submit: true });
    this.siteVerificationService.createTemplate(type, data,
      errorMessage => this.setState({ errorMessage }),
      successMessage => {
        this.setState({ successMessage,formElements:[] })
        this.props.clear();
    })
      .finally(() => this.setState({ submit: false }));
  };

  removeItem = (index, e) => {
    let formElements = this.state.formElements;
    formElements.splice(index, 1);
    this.setState({ formElements });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formElements: nextProps.formElements
    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(inputIdentifier);
  };

  render() {
    const { formElements } = this.state;

    let form = (
      <>
        {formElements.map((element, index) => (
          <>
            <GridItem md={5}>

              <FormFieldFactory
                key={element.key}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                validation={element.config.validation}
                value={element.config.value}
                changed={event => this.inputChangedHandler(event, element.key)}
              />
            </GridItem>
            <GridItem md={1}>
              <IconButton onClick={this.removeItem.bind(this, index)}>
                <TrashIcon color={"secondary"}/>
              </IconButton>
            </GridItem>
          </>
        ))}

      </>
    );
    return (
      <Card>
        <CardHeader contentEditable={true} onChange={event => console.log(event)} title={"title"}
                    subheader={"subheader"} action={
          <OfficeSelect
            label={"Type of site verification"}
            variant={"outlined"}
            margin={"dense"}
            value={this.state.selectedType}
            onChange={val => this.setState({ selectedType: val })}
            options={options}
          />
        }/>
        <Divider/>
        <CardContent>
          <GridContainer style={{ height: "60vh" }} justify={"flex-start"} alignItems={"flex-start"}>

            {form}

          </GridContainer>
        </CardContent>
        <Divider/>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button onClick={this.submitHandler} variant={"outlined"} color={"primary"}>Save</Button>
          <Button onClick={e => this.setState({ formElements: [] })} variant={"outlined"}
                  color={"secondary"}>Reset</Button>
        </CardActions>

        <SubmitDialog open={this.state.submit} title={"Site verification"} text={"Submitting ..."}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage} open={Boolean(this.state.errorMessage)}
                        onClose={e => this.setState({ errorMessage: "" })}/>
        <OfficeSnackbar variant={"success"} message={this.state.successMessage}
                        open={Boolean(this.state.successMessage)} onClose={e => this.setState({ successMessage: "" })}/>
      </Card>
    );
  };
}

export default withRouter(DynamicFormPreview);
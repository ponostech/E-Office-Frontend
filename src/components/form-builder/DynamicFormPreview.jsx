import React, { Component } from "react";
import GridItem from "../Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton } from "@material-ui/core";
import FormFieldFactory from "./FormFieldFactory";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import OfficeSelect from "../OfficeSelect";
import GridContainer from "../Grid/GridContainer";

const options= [
  { value: "hoarding", label: "Hoarding site verification" },
  { value: "kiosk", label: "Kiosk site verification" },
  { value: "shop", label: "Shop site verification" },
  { value: "hotel", label: "Hotel site verification" }
]
class DynamicFormPreview extends Component {

  state = {
    title: "",
    subTitle: "",
    formElements: [],

    selectedType:{value:"hoarding", label:"Hoarding site verification"},

  };
  submitHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.formElements) {
      formData[key] = this.state.formElements[key].value;
    }
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
        <CardHeader contentEditable={true} onChange={event => console.log(event)} title={"title"} subheader={"subheader"} action={
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
          <GridContainer justify={"flex-start"} alignItems={"flex-start"}>

          {form}

          </GridContainer>
        </CardContent>
        <Divider/>
        <CardActions style={{justifyContent:"flex-end"}}>
          <Button onClick={this.submitHandler} variant={"outlined"} color={"primary"}>Save</Button>
          <Button onClick={e => this.setState({ formElements: [] })} variant={"outlined"}
                  color={"secondary"}>Reset</Button>
        </CardActions>
      </Card>
    )
  };
}

export default DynamicFormPreview;
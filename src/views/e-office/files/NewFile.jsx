import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import { NewFileViewModel } from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";

class NewFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileNo: "",
      subject: "",
      dealer: null,
      category: null,
      classification: null,
      remark: "",
      prevRef: null,
      nextRef: null,

      classifications: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        { value: "three", label: "Three" }
      ],
      categories: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        { value: "three", label: "Three" }
      ], dealers: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        { value: "three", label: "Three" }
      ]
    };
  }

  handleChange = (e) => {
    console.log(e)
    const{name,value}=e.target;

        this.setState({[name]:value});
  };
  handleSelect = (identifier, selectedValue) => {
    console.log(identifier)
    this.setState({
      [identifier]: selectedValue.value
    });
  };


  render() {
    return (
      <GridContainer justify={"center"}>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader title={NewFileViewModel.TITLE}/>
            <CardContent>
              <TextField
                required={true}
                margin={"dense"}
                label={NewFileViewModel.FILENO_LABEL}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                name={"fileNo"} fullWidth={true}/>
              <TextField
                required={true}
                margin={"dense"}
                label={NewFileViewModel.SUBJECT_LABEL}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                name={"subject"}
                fullWidth={true}/>

              <OfficeSelect
                required={true}
                label={NewFileViewModel.DEALER_LABEL}
                name={"dealer"}
                isClearable={true}
                value={this.state.dealer}
                options={this.state.dealers}
                onChange={this.handleSelect.bind(this)}/>
              <OfficeSelect
                label={NewFileViewModel.CATEGORY_LABEL}
                isClearable={true}
                name={"category"}
                value={this.state.category}
                options={this.state.categories}
                onChange={this.handleSelect.bind(this)}/>
              <OfficeSelect
                value={this.state.classification}
                label={NewFileViewModel.CLASSIFICATION_LABEL}
                name={"classification"}
                isClearable={true}
                options={this.state.classifications}
                onChange={this.handleSelect.bind(this)}/>

              <TextField
                margin={"dense"}
                label={NewFileViewModel.REMARK_LABEL}
                name={"remark"}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                fullWidth={true}
                rows={3}
                multiline={true}/>
              <TextField
                margin={"dense"}
                label={NewFileViewModel.PREVIOUS_LABEL}
                name={"prevRef"}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                fullWidth={true}
                rows={3}
                multiline={true}/>
                <TextField
                  margin={"dense"}
                  label={NewFileViewModel.NEXT_LABEL}
                name={"nextRef"}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                fullWidth={true}
                rows={3}
                multiline={true}/>
            </CardContent>
            <CardActions>
              <Button variant={"outlined"} color={"primary"}>{NewFileViewModel.PRIMARY_BTN_TEXT}</Button>
              <Button variant={"outlined"} color={"secondary"}>{NewFileViewModel.SECONDARY_BTN_TEXT}</Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default NewFile;
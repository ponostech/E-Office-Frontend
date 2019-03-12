import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import { NewFileViewModel } from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";

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

      fileNoError: "",
      subjectError: "",

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
      ],

      submit: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelect = (value, identifier) => {
    switch (identifier.name) {
      case "category":
        this.setState({ category: value });
        break;
      case "classification":
        this.setState({ classification: value });
        break;
      case "dealer":
        this.setState({ dealer: value });
        break;
      default:
        break;

    }
  };

  validateBlur = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "fileNo":
        value.length === 0 ? this.setState({ fileNoError: NewFileViewModel.REQUIRED_FILENO }) : this.setState({ fileNoError: "" });
        break;
      case "subject":
        value.length === 0 ? this.setState({ subjectError: NewFileViewModel.REQUIRED_SUBJECT }) : this.setState({ subjectError: "" });
        break;
    }
  };

  submit = (e) => {
    const { history } = this.props;

    history.push(OfficeRoutes.FILE_DETAIL);
    // let valid = this.state.fileNoError.length !== 0 || this.state.subjectError.length !== 0;
    // console.log(valid);
    // if (valid) {
    //   const data = {};
    //   this.setState({ submit: true });
    //   // axios.post(ApiRoutes.CREATE_FILE, data)
    //   //   .then(res=>{
    //   //
    //   //   })
    //   //   .catch(err=>{
    //   //
    //   //   })
    //   //   .then(()=>{
    //   //     this.setState({submit:false})
    //   //   })
    //
    // }
  };

  render() {
    return (
      <GridContainer justify={"center"}>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader title={NewFileViewModel.TITLE} subheader={NewFileViewModel.SUBTITLE}/>
            <CardContent>
              <TextField
                error={Boolean(this.state.fileNoError)}
                helperText={this.state.fileNoError}
                onBlur={this.validateBlur.bind(this)}
                required={true}
                margin={"dense"}
                label={NewFileViewModel.FILENO_LABEL}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                name={"fileNo"} fullWidth={true}/>
              <TextField
                required={true}
                error={Boolean(this.state.subjectError)}
                helperText={this.state.subjectError}
                onBlur={this.validateBlur.bind(this)}
                margin={"dense"}
                label={NewFileViewModel.SUBJECT_LABEL}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                name={"subject"}
                fullWidth={true}/>

              <OfficeSelect
                margin={"dense"}
                variant={"outlined"}
                value={this.state.dealer}
                fullWidth={true}
                required={true}
                label={NewFileViewModel.DEALER_LABEL}
                name={"dealer"}
                isClearable={true}
                options={this.state.dealers}
                onChange={this.handleSelect.bind(this)}/>
              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                value={this.state.category}
                label={NewFileViewModel.CATEGORY_LABEL}
                isClearable={true}
                name={"category"}
                options={this.state.categories}
                onChange={this.handleSelect.bind(this)}/>


              <OfficeSelect
                variant={"outlined"}
                margin={"dense"}
                value={this.state.classification}
                fullWidth={true}
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
                fullWidth={true}/>
              <TextField
                margin={"dense"}
                label={NewFileViewModel.NEXT_LABEL}
                name={"nextRef"}
                variant={"outlined"}
                onChange={this.handleChange.bind(this)}
                fullWidth={true}/>
            </CardContent>
            <CardActions>
              <Button disabled={this.state.submit} variant={"outlined"}
                      color={"primary"} onClick={this.submit.bind(this)}>{NewFileViewModel.PRIMARY_BTN_TEXT}</Button>
              <Button variant={"outlined"} color={"secondary"}>{NewFileViewModel.SECONDARY_BTN_TEXT}</Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default NewFile;
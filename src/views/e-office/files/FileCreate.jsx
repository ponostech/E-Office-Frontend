import React, {Component} from "reactn";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {NewFileViewModel} from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";
import Grid from "@material-ui/core/Grid";

class FileCreate extends Component {
  state = {
    fileNo: "",
    subject: "",
    dealingId: undefined,
    category: undefined,
    classification: null,
    remark: "",
    prevRef: null,
    nextRef: null,

    fileNoError: "",
    subjectError: "",
    dealingError: "",
    categoryError: "",

    classifications: [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ],
    categories: [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ],
    dealers: [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ],

    submit: false
  };

  componentDidMount() {
    document.title = "e-AMC | New File Forms";
    this.setGlobal({loading: true})
    this.setGlobal({loading: false})
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSelectBlur = (identifier, value) => {
    switch (identifier) {
      case "dealingId":
        Boolean(value) ? this.setState({dealingError: "Dealing hand is required"}) : this.setState({dealingError: ""});
        break;
      case "category":
        Boolean(value) ? this.setState({categoryError: "Branch is required"}) : this.setState({categoryError: ""});
        break;
      default:
        break;
    }
  };

  handleSelect = (value, identifier) => {
    switch (identifier.name) {
      case "category":
        this.setState({category: value});
        break;
      case "classification":
        this.setState({classification: value});
        break;
      case "dealingId":
        this.setState({dealingId: value});
        break;
      case "groupHead":
        this.setState({dealingId: value});
        break;
      default:
        break;
    }
  };

  validateBlur = (e) => {
    const {value, name} = e.target;
    switch (name) {
      case "fileNo":
        value.length === 0 ? this.setState({fileNoError: NewFileViewModel.REQUIRED_FILENO}) : this.setState({fileNoError: ""});
        break;
      case "subject":
        value.length === 0 ? this.setState({subjectError: NewFileViewModel.REQUIRED_SUBJECT}) : this.setState({subjectError: ""});
        break;
      default:
        break
    }
  };

  submit = (e) => {
    const {history} = this.props;
    // history.push(OfficeRoutes.FILE_DETAIL);
  };

  render() {
    return (
        <GridContainer justify={"flex-start"}>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title={NewFileViewModel.TITLE} subheader={NewFileViewModel.SUBTITLE}/>
              <CardContent>
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.groupHead}
                        label={"Group Head"}
                        isClearable={true}
                        name={"category"}
                        options={this.state.groupHead}
                        error={Boolean(this.state.groupHeadError)}
                        helperText={this.state.categoryError}
                        onBlur={this.handleSelectBlur.bind(this, "groupHead")}
                        onChange={this.handleSelect.bind(this, "groupHead")}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.category}
                        label={"Main Head"}
                        isClearable={true}
                        name={"category"}
                        options={this.state.categories}
                        error={Boolean(this.state.categoryError)}
                        helperText={this.state.categoryError}
                        onBlur={this.handleSelectBlur.bind(this, "category")}
                        onChange={this.handleSelect}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.category}
                        label={"Sub Head"}
                        isClearable={true}
                        name={"category"}
                        options={this.state.categories}
                        error={Boolean(this.state.categoryError)}
                        helperText={this.state.categoryError}
                        onBlur={this.handleSelectBlur.bind(this, "category")}
                        onChange={this.handleSelect}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required={true}
                        error={Boolean(this.state.subjectError)}
                        helperText={this.state.subjectError}
                        onBlur={this.validateBlur.bind(this)}
                        margin={"dense"}
                        label={NewFileViewModel.SUBJECT_LABEL}
                        variant={"outlined"}
                        onChange={this.handleChange}
                        name={"subject"}
                        fullWidth={true}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <OfficeSelect
                        margin={"dense"}
                        variant={"outlined"}
                        value={this.state.dealingId}
                        fullWidth={true}
                        required={true}
                        label={NewFileViewModel.DEALER_LABEL}
                        name={"dealingId"}
                        isClearable={true}
                        error={Boolean(this.state.dealingError)}
                        helperText={this.state.dealingError}
                        onBlur={this.handleSelectBlur.bind(this, "dealingId")}
                        options={this.state.dealers}
                        onChange={this.handleSelect}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.category}
                        label={NewFileViewModel.CATEGORY_LABEL}
                        isClearable={true}
                        name={"category"}
                        options={this.state.categories}
                        error={Boolean(this.state.categoryError)}
                        helperText={this.state.categoryError}
                        onBlur={this.handleSelectBlur.bind(this, "category")}
                        onChange={this.handleSelect}/>
                  </Grid>
                  <Grid item xs={12}>
                    <OfficeSelect
                        variant={"outlined"}
                        margin={"dense"}
                        value={this.state.classification}
                        fullWidth={true}
                        label={NewFileViewModel.CLASSIFICATION_LABEL}
                        name={"classification"}
                        isClearable={true}
                        options={this.state.classifications}
                        onChange={this.handleSelect}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        margin={"dense"}
                        label={NewFileViewModel.REMARK_LABEL}
                        name={"remark"}
                        variant={"outlined"}
                        onChange={this.handleChange}
                        fullWidth={true}
                        rows={3}
                        multiline={true}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        margin={"dense"}
                        label={NewFileViewModel.PREVIOUS_LABEL}
                        name={"prevRef"}
                        variant={"outlined"}
                        onChange={this.handleChange}
                        fullWidth={true}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        margin={"dense"}
                        label={NewFileViewModel.NEXT_LABEL}
                        name={"nextRef"}
                        variant={"outlined"}
                        onChange={this.handleChange}
                        fullWidth={true}/>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions style={{justifyContent: "flex-end"}}>
                <Button variant="contained" color="primary" onClick={this.submit}>Save
                </Button>
                {" "}
                <Button style={{margin: 10}} variant="contained" color="secondary">
                  Clear
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

export default FileCreate;
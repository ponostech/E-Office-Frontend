import React, {Component} from "reactn";
import axios from 'axios'
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {NewFileViewModel} from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import Grid from "@material-ui/core/Grid";

class FileCreate extends Component {
  state = {
    groupHead: '',
    mainHead: '',
    subHead: '',
    subject: '',
    dealingId: null,
    category: undefined,
    classification: null,
    remark: "",
    references: null,

    fileNoError: "",
    subjectError: "",
    dealingError: "",
    categoryError: "",

    groupHeadOptions: [],
    mainHeadOptions: [],
    subHeadOptions: [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ],

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
    this.getFileIndices()
  }

  getFileIndices = () => {
    this.getGroup()
        .then(res => {
          if (res.data.status) this.successGroup(res.data);
          else this.setGlobal({errorMsg: res.data.messages})
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}))
  }

  getGroup = () => axios.get('file-index/group-heads');

  getMain = (id) => {
    this.setGlobal({loading: true})
    this.setState({mainHead: '', subHead: ''})
    axios.get('file-index/main-heads/' + id)
        .then(res => {
          if (res.data.status) this.successMain(res.data)
          else this.setGlobal({errorMsg: res.data.messages})
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}))
  }

  getSub = (id) => {
    this.setGlobal({loading: true})
    this.setState({subHead: ''})
    axios.get('file-index/sub-heads/' + id)
        .then(res => {
          if (res.data.status) this.successSub(res.data)
          else this.setGlobal({errorMsg: res.data.messages})
        })
        .catch(err => this.setGlobal({errorMsg: err.toString()}))
        .then(() => this.setGlobal({loading: false}))
  }

  successGroup = ({data}) => this.setState({groupHeadOptions: data.group_heads})

  successMain = ({data}) => this.setState({mainHeadOptions: data.main_heads})

  successSub = ({data}) => this.setState({subHeadOptions: data.sub_heads})

  handleChange = ({name, value}) => this.setState({[name]: value})

  handleSelectBlur = (identifier, value) => {
    if (identifier === "dealingId")
      Boolean(value) ? this.setState({dealingError: "Dealing hand is required"}) : this.setState({dealingError: ""});
    else if (identifier === "category")
      Boolean(value) ? this.setState({categoryError: "Branch is required"}) : this.setState({categoryError: ""});
  };

  handleSelect = (name, value) => {
    this.setState({[name]: value})
    if (name === 'groupHead') this.getMain(value.id)
    if (name === 'mainHead') this.getSub(value.id)
  }

  validateBlur = ({value, name}) => {
    if (name === "fileNo")
      value.length === 0 ? this.setState({fileNoError: NewFileViewModel.REQUIRED_FILENO}) : this.setState({fileNoError: ""});
    else if (name === "subject")
      value.length === 0 ? this.setState({subjectError: NewFileViewModel.REQUIRED_SUBJECT}) : this.setState({subjectError: ""});
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
                        name={"group_head"}
                        options={this.state.groupHeadOptions}
                        error={Boolean(this.state.groupHeadError)}
                        helperText={this.state.groupHeadError}
                        onBlur={this.handleSelectBlur.bind(this, "groupHead")}
                        onChange={this.handleSelect.bind(this, "groupHead")}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.mainHead}
                        label={"Main Head"}
                        isClearable={true}
                        name={"category"}
                        options={this.state.mainHeadOptions}
                        error={Boolean(this.state.mainHeadError)}
                        helperText={this.state.mainHeadError}
                        onBlur={this.handleSelectBlur.bind(this, "mainHead")}
                        onChange={this.handleSelect.bind(this, "mainHead")}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <OfficeSelect
                        required={true}
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        value={this.state.subHead}
                        label={"Sub Head"}
                        isClearable={true}
                        name={"sub_head"}
                        options={this.state.subHeadOptions}
                        error={Boolean(this.state.subHeadError)}
                        helperText={this.state.subHeadError}
                        onBlur={this.handleSelectBlur.bind(this, "subHead")}
                        onChange={this.handleSelect.bind(this, "subHead")}/>
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
                        value={this.state.subject}
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
                        onChange={this.handleSelect.bind(this, "dealingId")}/>
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
                  <Grid item xs={12}>
                    <TextField
                        margin={"dense"}
                        label={NewFileViewModel.PREVIOUS_LABEL}
                        name={"references"}
                        variant={"outlined"}
                        onChange={this.handleChange}
                        fullWidth={true}/>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions style={{justifyContent: "flex-end"}}>
                <Button variant="outlined" disabled={this.global.loading} color="primary"
                        onClick={this.submit}>Create</Button>
                {" "}
                <Button style={{margin: 10}} variant="outlined" color="secondary">Clear</Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

export default FileCreate;
import React, { Component } from "reactn";
import axios from "axios";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import { NewFileViewModel } from "../../model/NewFileViewModel";
import OfficeSelect from "../../../components/OfficeSelect";
import Grid from "@material-ui/core/Grid";
import { FileService } from "../../../services/FileService";
import SubmitDialog from "../../../components/SubmitDialog";
import { DESK, FILE_ACTIVE_LIST, FILE_DETAIL } from "../../../config/routes-constant/OfficeRoutes";
import { ApiRoutes } from "../../../config/ApiRoutes";
import {withRouter} from "react-router-dom"

class FileCreate extends Component {
  fileService = new FileService();
  state = {
    groupHead: "",
    mainHead: "",
    subHead: "",
    subject: "",
    branch: "",
    classification: "",
    remark: "",
    references: undefined,

    groupHeadError: "",
    mainHeadError: "",
    subHeadError: "",
    subjectError: "",
    branchError: "",

    groupHeadOptions: [],
    mainHeadOptions: [],
    subHeadOptions: [],
    classifications: [],
    branches: [],
    files:[],
    submit: false
  };

  componentDidMount() {
    document.title = "E-AMC | Create new File";
    this.getBranch();
    this.getClassifications();
    this.getFiles();
    this.setGlobal({ loading: true });
    this.getFileIndices();
  }

  getFileIndices = () => {
    this.getGroup()
      .then(res => {
        if (res.data.status) this.successGroup(res.data);
        else this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  getFiles=()=>axios.get(ApiRoutes.FILE,{params:{status:"all"}})
    .then(res=>{
      let temp=[];
      if (res.data.status) {
        res.data.data.files.map(f=>{
          temp.push({
            id:f.id,
            value:f.id,
            label:f.number
          })
        })
      }
      this.setState({files:temp});
    })
    .catch(err=>this.setGlobal({errorMsg:err.toString()}))

  getGroup = () => axios.get("file-index/group-heads");

  getMain = (id) => {
    this.setGlobal({ loading: true });
    this.setState({ mainHead: "", subHead: "" });
    axios.get("file-index/main-heads/" + id)
      .then(res => {
        if (res.data.status) this.successMain(res.data);
        else this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  getSub = (id) => {
    this.setGlobal({ loading: true });
    this.setState({ subHead: "" });
    axios.get("file-index/sub-heads/" + id)
      .then(res => {
        if (res.data.status) this.successSub(res.data);
        else this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  getBranch = () => {
    this.setGlobal({ loading: true });
    axios.get("setting/branches")
      .then(res => {
        if (res.data.status) this.setState({ branches: res.data.data.branches });
        else this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  getClassifications = () => {
    this.setGlobal({ loading: true });
    axios.get("setting/classifications")
      .then(res => {
        if (res.data.status) this.setState({ classifications: res.data.data.classifications });
        else this.setGlobal({ errorMsg: res.data.messages });
      })
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };


  successGroup = ({ data }) => this.setState({ groupHeadOptions: data.group_heads });

  successMain = ({ data }) => this.setState({ mainHeadOptions: data.main_heads });

  successSub = ({ data }) => this.setState({ subHeadOptions: data.sub_heads });

  handleBlur = (identifier, value) => {
    switch (identifier) {
      case "groupHead":
        !Boolean(this.state.groupHead) ? this.setState({ groupHeadError: "Group head is required" }) : this.setState({ groupHeadError: "" });
        break;
      case "mainHead":
        !Boolean(this.state.mainHead) ? this.setState({ mainHeadError: "Main head is required" }) : this.setState({ mainHeadError: "" });
        break;
      case "subHead":
        !Boolean(this.state.subHead) ? this.setState({ subHeadError: "Sub head is required" }) : this.setState({ subHeadError: "" });
        break;
      case "subject":
        !Boolean(this.state.subject) ? this.setState({ subjectError: "Group head is required" }) : this.setState({ subjectError: "" });
        break;
      case "branch":
        !Boolean(this.state.branch) ? this.setState({ branchError: "Branch is required" }) : this.setState({ branchError: "" });
        break;
      default:
        break;

    }
  };

  handleChange = (name, value) => {
      this.setState({ [name]: value });
      switch (name) {
        case "groupHead":
          Boolean(value)?this.getMain(value.id):this.setState({mainHeadOptions:[]});
          break;
        case "mainHead":
          Boolean(value)?this.getSub(value.id):this.setState({subHeadOptions:[]});
          break;
        default:
          break;
      }
  };

  doSubmit = () => {
    const { groupHead, mainHead, subHead, subject, classification, branch, remark, references } = this.state;
    const file={
      group_head:Boolean(groupHead)? groupHead.value:null,
      main_head:Boolean(mainHead)?mainHead.value:null,
      sub_head:Boolean(subHead)?subHead.value:null,
      subject,
      classification:classification?classification.value:null,
      branch:branch.value,
      short_name:branch.short_name,
      remark,
      references:Boolean(references)?references.map(ref=>ref.value):null
    }

    this.setState({ submit: true });
    this.fileService.create(file, errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.fileCreateSuccess(successMsg))
      .finally(() => this.setState({ submit: false }));
  };

  fileCreateSuccess = (successMsg) => {
    this.setGlobal({ successMsg })
    this.props.history.push(DESK)
  }

  handleClick = (e) => {
    const invalid = !Boolean(this.state.groupHead) || !Boolean(this.state.mainHead) || !Boolean(this.state.subHead) ||
      !Boolean(this.state.subject) || !Boolean(this.state.branch);
    const { history } = this.props;

    if (invalid)
      this.setGlobal({ errorMsg: "Please fill all the required field" });
    else{
      this.doSubmit();
      history.push(FILE_DETAIL);
    }

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
                    name={"groupHead"}
                    options={this.state.groupHeadOptions}
                    error={Boolean(this.state.groupHeadError)}
                    helperText={this.state.groupHeadError}
                    onBlur={this.handleBlur.bind(this, "groupHead")}
                    onChange={val=>this.handleChange("groupHead", val)}/>
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
                    name={"mainHead"}
                    options={this.state.mainHeadOptions}
                    error={Boolean(this.state.mainHeadError)}
                    helperText={this.state.mainHeadError}
                    onBlur={this.handleBlur.bind(this, "mainHead")}
                    onChange={val=>this.handleChange("mainHead",val)}/>
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
                    name={"subHead"}
                    options={this.state.subHeadOptions}
                    error={Boolean(this.state.subHeadError)}
                    helperText={this.state.subHeadError}
                    onBlur={this.handleBlur.bind(this, "subHead")}
                    onChange={val=>this.handleChange("subHead",val)}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    error={Boolean(this.state.subjectError)}
                    helperText={this.state.subjectError}
                    margin={"dense"}
                    label={NewFileViewModel.SUBJECT_LABEL}
                    variant={"outlined"}
                    onChange={event => this.handleChange("subject",event.target.value)}
                    onBlur={this.handleBlur.bind(this, "subject")}
                    name={"subject"}
                    value={this.state.subject}
                    fullWidth={true}/>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <OfficeSelect
                    required={true}
                    variant={"outlined"}
                    margin={"dense"}
                    fullWidth={true}
                    value={this.state.branch}
                    label={NewFileViewModel.CATEGORY_LABEL}
                    isClearable={true}
                    name={"branch"}
                    options={this.state.branches}
                    error={Boolean(this.state.branchError)}
                    helperText={this.state.branchError}
                    onBlur={this.handleBlur.bind(this, "branch")}
                    onChange={val=>this.handleChange("branch",val)}/>
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
                    onChange={val=>this.handleChange( "classification",val)}/>
                </Grid>
                <Grid item xs={12}>
                  <OfficeSelect
                    isMulti={true}
                    value={this.state.references}
                    label={"File Reference(s)"}
                    name={"references"}
                    variant={"outlined"}
                    onChange={val=>this.handleChange("references",val)}
                    options={this.state.files}
                    fullWidth={true}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin={"dense"}
                    label={NewFileViewModel.REMARK_LABEL}
                    name={"remark"}
                    variant={"outlined"}
                    onChange={event => this.handleChange( "remark",event.target.value)}
                    fullWidth={true}
                    rows={3}
                    value={this.state.remark}
                    multiline={true}/>
                </Grid>

              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                disabled={!Boolean(this.state.groupHead) || !Boolean(this.state.mainHead) || !Boolean(this.state.subHead) ||
                !Boolean(this.state.subject) || !Boolean(this.state.branch)}
                href={"#"} variant="outlined" color="primary"
                      onClick={this.handleClick.bind("submit",this)}>Create</Button>
              {" "}
              <Button onClick={e=>window.location.reload()} href={"#"} style={{ margin: 10 }} variant="outlined" color="secondary">Reset</Button>
            </CardActions>
          </Card>
        </GridItem>

        <SubmitDialog open={this.state.submit} text={"Please wait..."} title={"Create General File"}/>
      </GridContainer>
    );
  }
}

export default withRouter(FileCreate);
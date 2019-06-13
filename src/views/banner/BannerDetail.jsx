import "date-fns";
import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import AddIcon from "@material-ui/icons/AddCircle";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";
import moment from "moment";
import OfficeSnackbar from "../../components/OfficeSnackbar";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import OfficeSelect from "../../components/OfficeSelect";
import FileUpload from "../../components/FileUpload";
import { APPLICATION_NAME } from "../../utils/Util";
import Card from "../../components/Card/Card";


const style = {
  item: {
    padding: "6px !important"
  }
};

class BannerDetail extends Component {

  fileRef=React.createRef();
  state = {
    length: "",
    height: "",
    localCouncil: undefined,
    path: null,
    from: new Date(),
    to: new Date(),

    lengthError: "",
    heightError: "",
    localCouncilError: "",
    fromError: "",
    toError: "",

    detailList: [],
    localCouncils: [],

    valid: false,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ localCouncils: nextProps.localCouncils });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.handleBlur(e);
  };

  handleSelect = (id, val) => {
    this.setState({ localCouncil: val });
  };
  handleSelectBlur = (val) => {
    if (this.state.localCouncil) {
      this.setState({ localCouncilError: "" });
    } else {
      this.setState({ localCouncilError: "Local council is required" });
    }
  };
  getBannerDetails = () => {
    return this.state.detailList;
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "length":
        value.length === 0 ? this.setState({ lengthError: "Length is required" }) : this.setState({ lengthError: "" });
        break;
      case "height":
        value.length === 0 ? this.setState({ heightError: "Height is required" }) : this.setState({ heightError: "" });
        break;
      case "from":
        value.length === 0 ? this.setState({ fromError: "From field is required" }) : this.setState({ fromError: "" });
        break;
      case "to":
        value.length === 0 ? this.setState({ toError: "To field is required" }) : this.setState({ toError: "" });
        break;
    }
  };

  handleFromChange = fromDate => {
    this.setState({ "from": fromDate });
  };

  handleToChange = toDate => {
    this.setState({ "to": toDate });
  };

  handleAdd = (e) => {
    const { onDetailAdd } = this.props;
    const { length, height, localCouncil,path, from, to } = this.state;

    const fromDate = moment(from);
    const toDate = moment(to);

    if (fromDate > toDate) {
      this.setState({ errorMessage: "From date can't be greater than To date" });
      return;
    }

    let temp = {
      length, height, localCouncil: localCouncil.label,path, from, to
    };
    let list = this.state.detailList;
    list.push(temp);
    this.setState({ detailList: list });

    onDetailAdd(temp);
    this.clear();

  };

  handleRemove = (index, e) => {
    const { onRemoveDetail } = this.props;

    let list = this.state.detailList;
    let result = list.filter((item, i) => {
      if (index !== i) {
        return item;
      }
    });
    this.setState({ detailList: result });
    onRemoveDetail(index);
  };
  clear = () => {
    this.setState({
      length: "",
      height: "",
      localCouncil: null,
      from: new Date(),
      to: new Date(),
      path:null
    });
    this.fileRef.current.doReset()
  };

  doReset = () => {
    this.clear();
    this.setState({ details: [] });
  };

  formatDate(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card raised={true} style={{padding:16}}>
          <Grid container={true}>
            <GridItem className={classes.item} sm={12} md={3}>
              <TextField name={"length"}
                         InputProps={{
                           inputProps: {
                             min: 0
                           }
                         }}
                         type={"number"}
                         fullWidth={true}
                         required={true}
                         error={!!this.state.lengthError}
                         helperText={this.state.lengthError}
                         label={"Length (Feet)"}
                         variant={"outlined"}
                         value={this.state.length}
                         onBlur={this.handleBlur.bind(this)}
                         onChange={this.handleChange.bind(this)}
                         margin={"dense"}
              />
            </GridItem>

            <GridItem className={classes.item} style={{ padding: "4px !important" }} sm={12} md={3}>
              <TextField name={"height"}
                         InputProps={{
                           inputProps: {
                             min: 0
                           }
                         }}
                         type={"number"}
                         fullWidth={true}
                         required={true}
                         error={!!this.state.heightError}
                         helperText={this.state.heightError}
                         label={"Height (Feet)"}
                         variant={"outlined"}
                         value={this.state.height}
                         onBlur={this.handleBlur.bind(this)}
                         onChange={this.handleChange.bind(this)}
                         margin={"dense"}
              />
            </GridItem>

            <GridItem className={classes.item} sm={12} md={6}>
              <OfficeSelect
                value={this.state.localCouncil}
                label={"Local Council"}
                name={"localCouncil"}
                variant={"outlined"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                error={Boolean(this.state.localCouncilError)}
                helperText={this.state.localCouncilError}
                onBlur={this.handleSelectBlur.bind(this, "localCouncil")}
                onChange={this.handleSelect.bind(this, "localCouncil")}
                options={this.props.localCouncils}/>
            </GridItem>

            <GridItem className={classes.item} sm={12} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth={true}
                  error={!!this.state.fromError}
                  helperText={this.state.fromError}
                  margin="dense"
                  name={"from"}
                  variant="outlined"
                  label="From"
                  value={this.state.from}
                  onChange={this.handleFromChange}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>

            </GridItem>
            <GridItem className={classes.item} sm={12} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth={true}
                  error={!!this.state.toError}
                  helperText={this.state.toError}
                  margin="dense"
                  variant="outlined"
                  label="To"
                  value={this.state.to}
                  onChange={this.handleToChange}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>
              {/*<TextField name={"to"}
                       fullWidth={true}
                       type={"date"}
                       required={true}
                       error={!!this.state.toError}
                       helperText={this.state.toError}
                       label={"To"}
                       InputLabelProps={{
                         shrink: true
                       }}
                       variant={"outlined"}
                       value={this.state.to}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />*/}
            </GridItem>
            <GridItem className={classes.root} xs={12} sm={12} md={5}>
              <FileUpload
                ref={this.fileRef}
                applicationName={APPLICATION_NAME.BANNER}
                          document={{
                            id: 1,
                            name: "Photo of Banner design",
                            mandatory: 1,
                            mime: "image/*"
                          }}
                          onUploadSuccess={(data) => {
                            this.setState({
                              path: data.location
                            });
                          }} onUploadFailure={(err) => {
                console.log(err);
              }}/>
            </GridItem>
            <GridItem className={classes.item} sm={12} md={1}>
              <Button variant={"contained"} fullWidth={true}
                disabled={this.state.length.length === 0
                || this.state.height.length === 0
                || this.state.path===null
                || this.state.localCouncil === null
                || !Boolean(this.state.from)
                || !Boolean(this.state.to)
                } onClick={this.handleAdd.bind(this)} color={"primary"}>
                <AddIcon fontSize={"large"} color={"white"}/>
              </Button>
            </GridItem>
          </Grid>
        </Card>


        <GridContainer>
          <Divider/>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Divider style={{ marginTop: 10 }}/>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Length</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Local Council</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Design</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.detailList.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.length}</TableCell>
                        <TableCell>{item.height}</TableCell>
                        <TableCell>{item.localCouncil}</TableCell>
                        <TableCell>{moment(item.from).format("Do MMM YYYY")}</TableCell>
                        <TableCell>{moment(item.to).format("Do MMM YYYY")}</TableCell>
                        <TableCell>
                        <IconButton href={"#"} onClick={e=>window.open(item.path)}>
                          <ImageIcon color={"primary"}/>
                        </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton href={"#"} onClick={this.handleRemove.bind(this, index)}>
                            <DeleteIcon color={"error"}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>

          </GridItem>
          <OfficeSnackbar message={this.state.errorMessage} variant={"error"}
                          open={Boolean(this.state.errorMessage)}
                          onClose={(e) => this.setState({ errorMessage: "" })}/>
        </GridContainer>
      </>
    );
  }
}

BannerDetail.propTypes = {
  onRemoveDetail: PropTypes.func.isRequired,
  onDetailAdd: PropTypes.func.isRequired
};

export default withStyles(style)(BannerDetail);
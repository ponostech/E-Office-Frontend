import 'date-fns';
import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import { Divider, Grid, IconButton, List, ListItem, TextField } from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import AddIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import withStyles from "@material-ui/core/es/styles/withStyles"
import PropTypes from "prop-types";
import moment from "moment";
import OfficeSnackbar from "../../components/OfficeSnackbar";
import AddressField from "../../components/AddressField";


import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';


const style={
  item:{
    padding:"6px !important"
  }
}

class BannerDetail extends Component {

  state = {
    length: "",
    height: "",
    locations: "",
    from: new Date(),
    to: "",

    lengthError: "",
    heightError: "",
    locationsError: "",
    fromError: "",
    toError: "",

    detailList: [],

    valid: false,
    errorMessage:""
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
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
      case "locations":
        value.length === 0 ? this.setState({ locationsError: "Locations is required" }) : this.setState({ locationsError: "" });
        break;
      case "from":
        value.length === 0 ? this.setState({ fromError: "From field is required" }) : this.setState({ fromError: "" });
        break;
      case "to":
        value.length === 0 ? this.setState({ toError: "To field is required" }) : this.setState({ toError: "" });
        break;
    }
  };

  handleAdd = (e) => {
    const { onDetailAdd } = this.props;
    const { length, height, locations, from, to } = this.state;

    const fromDate = moment(from);
    const toDate = moment(to);

    console.log(fromDate);
    console.log(toDate);

    if (fromDate > toDate) {
      this.setState({errorMessage:"From date can't be greater than To date"})
      return
    }

    this.clear();
    let temp = {
      length, height, locations, from, to
    };
    let list = this.state.detailList;
    list.push(temp);
    this.setState({ detailList: list });

    onDetailAdd(temp)
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
    onRemoveDetail(index)
  };
  clear = () => {
    this.setState({
      length: "",
      height: "",
      locations: "",
      from: "",
      to: ""
    });
  };

  doReset = () => {
    this.clear();
    this.setState({ details: [] });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container={true}>
          <GridItem className={classes.item} sm={12} md={2}>
            <TextField name={"length"}
                       InputProps={{
                         inputProps:{
                           min:0
                         }
                       }}
                       type={"number"}
                       fullWidth={true}
                       required={true}
                       error={!!this.state.lengthError}
                       helperText={this.state.lengthError}
                       label={"Length (Meter)"}
                       variant={"outlined"}
                       value={this.state.length}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />
          </GridItem>

          <GridItem className={classes.item} style={{ padding: "4px !important" }} sm={12} md={2}>
            <TextField name={"height"}
                       InputProps={{
                         inputProps:{
                           min:0
                         }
                       }}
                       type={"number"}
                       fullWidth={true}
                       required={true}
                       error={!!this.state.heightError}
                       helperText={this.state.heightError}
                       label={"Height (Meter)"}
                       variant={"outlined"}
                       value={this.state.height}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />
          </GridItem>

          <GridItem className={classes.item} sm={12} md={3}>
            <AddressField
              name={"locations"}
              textFieldProps={{
                name:"locations",
                fullWidth:true,
                required:true,
                placeholder:"Locations",
                error:!!this.state.locationsError,
                helperText:this.state.locationsError,
                label:"Location",
                variant:"outlined",
                value:this.state.locations,
                onBlur:this.handleBlur.bind(this),
                onChange:this.handleChange.bind(this),
                margin:"dense",
              }}
              onPlaceSelect={(place) => {
                if (place) {
                  let name = place.name;
                  let address = place.formatted_address;
                  let complete_address = address.includes(name) ? address : `${name} ${address}`;
                  this.setState({ locations: complete_address });
                }
              }}/>
          </GridItem>

          <GridItem className={classes.item} sm={12} md={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                  error={!!this.state.fromError}
                  helperText={this.state.fromError}
                  margin="dense"
                  variant="outlined"
                  label="From"
                  value={this.state.from}
                  onBlur={this.handleBlur.bind(this)}
                  onChange={this.handleChange.bind(this)}
              />
            </MuiPickersUtilsProvider>
            {/*<TextField name={"from"}
                       fullWidth={true}
                       type={"Date"}
                       required={true}
                       error={!!this.state.fromError}
                       helperText={this.state.fromError}
                       label={"From"}
                       variant={"outlined"}
                       InputLabelProps={{
                         shrink: true
                       }}
                       value={this.state.from}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />*/}
          </GridItem>
          <GridItem className={classes.item} sm={12} md={2}>
            <TextField name={"to"}
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
            />
          </GridItem>
          <GridItem className={classes.item} sm={12} md={1}>
            <IconButton disabled={this.state.length.length===0 || this.state.height.length===0 || this.state.locations.length===0 || this.state.from.length===0 || this.state.to.length===0
            } onClick={this.handleAdd.bind(this)} color={"primary"}>
              <AddIcon fontSize={"large"} color={"inherit"}/>
            </IconButton>
          </GridItem>
        </Grid>

        <GridContainer>
          <Divider/>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Divider style={{ marginTop: 10 }}/>
            <List style={{ padding: "4px" }}>
              {this.state.detailList.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <GridContainer>
                      <GridItem className={classes.item} xs={12} sm={12} md={2}>
                        <TextField margin={"dense"} fullWidth={true} variant={"outlined"} disabled={true} value={item.length}
                                   label={"Length"}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={2}>
                        <TextField margin={"dense"} fullWidth={true} variant={"outlined"} disabled={true} value={item.height}
                                   label={"Height"}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={3}>
                        <TextField margin={"dense"}  fullWidth={true} variant={"outlined"} disabled={true} value={item.locations}
                                   label={"Location"}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={2}>
                        <TextField margin={"dense"} fullWidth={true} variant={"outlined"} disabled={true} value={item.from}
                                   label={"From"}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={2}>
                        <TextField margin={"dense"} fullWidth={true} variant={"outlined"} disabled={true} value={item.to} label={"To"}/>
                      </GridItem>
                      <GridItem className={classes.item} xs={12} sm={12} md={1}>
                        <IconButton onClick={this.handleRemove.bind(this, index)}>
                          <DeleteIcon fontSize={"large"} color={"error"}/>
                        </IconButton>
                      </GridItem>
                    </GridContainer>

                  </ListItem>
                );
              })}
            </List>
          </GridItem>
          <OfficeSnackbar message={this.state.errorMessage} variant={"error"} open={Boolean(this.state.errorMessage)} onClose={(e)=>this.setState({errorMessage:""})}/>
        </GridContainer>
      </>
    );
  }
}
BannerDetail.propTypes={
  onRemoveDetail:PropTypes.func.isRequired,
  onDetailAdd:PropTypes.func.isRequired,
}

export default withStyles(style)(BannerDetail);
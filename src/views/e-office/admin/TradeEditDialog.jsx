import React, { Component } from "react";
import {
  Button, Card, CardActions, CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip
} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/es/styles/withStyles";

const style = {
  item: {
    padding: "10px 15px !important"
  }
};
class TradeEditDialog extends Component {

  state = {
    id: "",
    name: "",
    rate: 0,
    fla: "0",

    nameError: "",
    rateError: ""
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { trade } = nextProps;
    if (trade) {
      this.setState({
        id: trade.id,
        name: trade.name,
        rate: trade.rate,
        fla: String(trade.fla)
      });
    }
  }

  handleRadio = (e) => {
    const { value } = e.target;
    this.setState({ fla: value });
  };
  close = () => {
    this.props.onClose(null);
  };
  handleEdit = (e) => {
    const { id,name, rate, fla, nameError, rateError } = this.state;
    const { onClose } = this.props;
    if (!name || !rate) {
      this.setState({errorMessage:"Please fill the required field"});
    }else{
      onClose({id,name,rate,fla});
    }

  };
  handleRequired = (e) => {
    switch (e.target.name) {
      case "name":
        this.state.name ? this.setState({ nameError: "" }) : this.setState({ nameError: "Name is required" });
        break;
      case "rate":
        this.state.rate ? this.setState({ rateError: "" }) : this.setState({ rateError: "Rate is required" });
        break;
    }

  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  render() {
    const { open, onClose,classes } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
          <CardHeader title={"Edit Trade"} action={
            <>
              <Tooltip title={"Close"}>
                <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
              </Tooltip>
            </>
          }/>

        <Divider/>
        <DialogContent>
          <GridContainer justify={"center"}>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField variant={"outlined"}
                         name={"name"}
                         value={this.state.name}
                         required={true}
                         fullWidth={true}
                         onBlur={this.handleRequired.bind(this)}
                         onChange={this.handleChange.bind(this)}
                         error={Boolean(this.state.nameError)}
                         helperText={this.state.nameError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <TextField variant={"outlined"}
                         name={"rate"}
                         required={true}
                         type={"number"}
                         value={this.state.rate}
                         fullWidth={true}
                         onBlur={this.handleRequired.bind(this)}
                         onChange={this.handleChange.bind(this)}
                         error={Boolean(this.state.rateError)}
                         helperText={this.state.rateError}
              />
            </GridItem>
            <GridItem className={classes.item} xs={12} sm={12} md={12}>
              <FormControl fullWidth={true} margin={"dense"}>
                <FormLabel>Required Food Licensing Authority Permit?</FormLabel>
                <RadioGroup
                  defaultValue={"0"}
                  value={this.state.fla}
                  name={"fla"}
                  row={true}
                  onChange={this.handleRadio.bind(this)}
                >
                  <FormControlLabel value={"0"} control={<Radio color={"primary"}/>}
                                    label={"Yes"}/>
                  <FormControlLabel value={"1"} control={<Radio color={"primary"}/>}
                                    label={"No"}/>
                </RadioGroup>
              </FormControl>
            </GridItem>
          </GridContainer>

        </DialogContent>

        <Divider/>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={this.handleEdit.bind(this)}>Update</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.close.bind(this)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(style)(TradeEditDialog);
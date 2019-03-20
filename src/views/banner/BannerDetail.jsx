import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
  Tooltip
} from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import AddIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/DeleteForever";

class BannerDetail extends Component {

  state = {
    length: "",
    height: "",
    locations: "",
    from: "",
    to: "",

    lengthError: "",
    heightError: "",
    locationsError: "",
    fromError: "",
    toError: "",

    detailList:[],

    invalid: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]:value
    })

   this.setValidity()
  };

  getBannerDetails=()=>{
    return this.state.detailList;
  }
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

    const invalid=Boolean(this.state.lengthError) ||
    Boolean(this.state.heightError) ||
    Boolean(this.state.locationsError) ||
    Boolean(this.state.fromError) ||
    Boolean(this.state.toError) || this.state.prestine;

    if (invalid) {
      return
    }
    const { length, height, locations, from, to } = this.state;
    let temp = {
      length, height, locations, from, to
    };
    let list = this.state.detailList;
    list.push(temp);
    this.setState({ detailList: list });
    this.setState({
      length:'',
      height:'',
      locations:'',
      from:'',
      to:'',
      invalid:true
    })
  };

  handleRemove = (index,e) => {
    let list = this.state.detailList;
    let result = list.filter((item, i) => {
      console.log(index);
      console.log("i val "+i)
      if (index !== i) {
        return item;
      }
    });
    this.setState({ detailList: result });

  };

  setValidity=()=>{
    const invalid= Boolean(this.state.lengthError) ||
      Boolean(this.state.heightError) ||
      Boolean(this.state.locationsError) ||
      Boolean(this.state.fromError) ||
      Boolean(this.state.toError)

    this.setState({invalid})
  }
  render() {
    return (
      <>
        <Grid   container={true} spacing={0}>
          <GridItem  sm={12} md={2}>
            <TextField name={"length"}
                       type={"number"}
                       fullWidth={true}
                       required={true}
                       error={!!this.state.lengthError}
                       helperText={this.state.lengthError}
                       label={"Length"}
                       variant={"outlined"}
                       value={this.state.length}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />
          </GridItem>

          <GridItem style={{padding:"4px"}}  sm={12} md={2}>
            <TextField name={"height"}
                       type={"number"}
                       fullWidth={true}
                       required={true}
                       error={!!this.state.heightError}
                       helperText={this.state.heightError}
                       label={"Height"}
                       variant={"outlined"}
                       value={this.state.height}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />
          </GridItem>

          <GridItem style={{padding:4}}  sm={12} md={3}>
            <TextField name={"locations"}
                       fullWidth={true}
                       required={true}
                       error={!!this.state.locationsError}
                       helperText={this.state.locationsError}
                       label={"Location"}
                       variant={"outlined"}
                       value={this.state.locations}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       margin={"dense"}
            />
          </GridItem>

          <GridItem style={{padding:4}}  sm={12} md={2}>
            <TextField name={"from"}
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
            />
          </GridItem>
          <GridItem style={{padding:4}}  sm={12} md={2}>
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
          <GridItem style={{padding:4}}  sm={12} md={1}>
            <Tooltip title={"Click here to add"}>
              <IconButton  disabled={this.state.invalid
              } onClick={this.handleAdd.bind(this)} color={"primary"}>
                <AddIcon fontSize={"large"} color={"inherit"}/>
              </IconButton>
            </Tooltip>
          </GridItem>
        </Grid>

        <GridContainer>
          <Divider/>
        </GridContainer>
        <GridContainer>
         <GridItem xs={12} sm={12} md={12}>
           <Divider style={{marginTop:10}}/>
           <List style={{padding:"4px"}}>
             {this.state.detailList.map((item,index)=>{
               return (
                 <ListItem key={index}>
                   <GridContainer>
                     <GridItem xs={12} sm={12} md={2}>
                     <TextField margin={"dense"} variant={"outlined"} disabled={true} value={item.length} label={"Length"}/>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2}>
                     <TextField margin={"dense"} variant={"outlined"} disabled={true} value={item.height} label={"Height"}/>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={3}>
                     <TextField margin={"dense"} variant={"outlined"} disabled={true} value={item.locations} label={"Location"}/>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2}>
                     <TextField margin={"dense"} variant={"outlined"} disabled={true} value={item.from} label={"From"}/>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2}>
                     <TextField margin={"dense"} variant={"outlined"} disabled={true} value={item.to} label={"To"}/>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={1}>
                       <IconButton onClick={this.handleRemove.bind(this,index)}>
                         <DeleteIcon fontSize={"large"} color={"error"}/>
                       </IconButton>
                     </GridItem>
                   </GridContainer>

                 </ListItem>
               );
             })}
           </List>
         </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default BannerDetail;
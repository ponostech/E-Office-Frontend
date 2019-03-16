import React, { Component } from "react";
import { Button, Divider, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import OfficeSelect from "../../../components/OfficeSelect";


const DetailEntry = (props) => {
  return <div>
    <GridContainer>

      <GridItem xs={12} sm={12} md={6}>
        <TextField type={"Date"} InputLabelProps={{ shrink: true }} name={"receive_date"} label={"Receive Date"}
                   variant={"outlined"} margin={"dense"} required={true} fullWidth={true}/>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <TextField type={"Date"} InputLabelProps={{ shrink: true }} name={"letter_date"} label={"Letter Date"}
                   variant={"outlined"} margin={"dense"} required={true} fullWidth={true}/>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <OfficeSelect name={"deliveryMode"} label={"Delivery Mode"} variant={"outlined"} margin={"dense"}
                      required={true} fullWidth={true}/>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <OfficeSelect name={"Type"} label={"Type"} variant={"outlined"} margin={"dense"} required={true}
                      fullWidth={true} options={
          [
            { value: 1, label: "One" },
            { value: 2, label: "Two" },
            { value: 3, label: "Three" }
          ]
        }/>

      </GridItem>
    </GridContainer>

  </div>;
};
const CommunicationEntry = (props) => {
  return <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <OfficeSelect name={"communication"} label={"From"} variant={"outlined"} margin={"dense"} required={true}
                      fullWidth={true} options={
          [
            { value: 1, label: "One" },
            { value: 2, label: "Two" },
            { value: 3, label: "Three" }
          ]
        }/>
      </GridItem>


    </GridContainer>
  </div>;
};

const AddressEntry = (props) => {
  return <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <TextField name={"subject"} label={"Subject"} variant={"outlined"} margin={"dense"} required={true}
                 fullWidth={true}/>
    </GridItem>
    <GridItem xs={12} sm={12} md={12}>
      <OfficeSelect name={"category"} label={"Category"} variant={"outlined"} margin={"dense"} required={true}
                    fullWidth={true} options={
        [
          { value: 1, label: "One" },
          { value: 2, label: "Two" },
          { value: 3, label: "Three" }
        ]
      }/>
    </GridItem>
    <GridItem xs={12} sm={12} md={12}>
      <TextField name={"remark"} label={"Remark"} variant={"outlined"} margin={"dense"} required={true}
                 fullWidth={true} multiline={true} rows={3}/>
    </GridItem>
  </GridContainer>;

};

class ReceiptDetailEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Paper style={{ padding: 20 }}>
        <Typography style={{ margin: 10 }} variant={"headline"}>Receipt Info</Typography>
        <Tabs style={{ background: "white" }} indicatorColor={"primary"} variant={"standard"} value={value}
              onChange={this.handleTabChange.bind(this)}>
          <Tab value={0} label="Receipt Detail"/>
          <Tab value={1} label="Communication"/>
          <Tab value={2} label="Category"/>
        </Tabs>
        {value === 0 && <DetailEntry>Receipt Detail</DetailEntry>}
        {value === 1 && <CommunicationEntry>Communication</CommunicationEntry>}
        {value === 2 && <AddressEntry> Category</AddressEntry>}
        <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
        <Button variant={"contained"} color={"primary"}>Save</Button>
        <Button variant={"contained"} color={"secondary"}>Reset</Button>
      </Paper>
    );
  }
}

export default ReceiptDetailEntry;
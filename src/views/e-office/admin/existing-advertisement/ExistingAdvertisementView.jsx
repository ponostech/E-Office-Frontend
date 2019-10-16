import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import ExistingKioskList from "./ExistingKioskList";
import ExistingHoardingList from "./ExistingHoardingList";
import HoardingDialog from "./HoardingDialog";

class ExistingAdvertisementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "hoarding"
    };
  }

  componentDidMount() {
    this.setGlobal({loading:false})
  }

  createHoarding=(hoarding)=>{

  }

  displayError=(errorMsg)=>this.setGlobal({errorMsg})

  onHoardingEdit=(hoarding)=>{

  }
  onHoardingDelete=(Hoarding)=>{

  }
  onKioskEdit=(kiosk)=>{

  }
  onKioskDelete=(kiosk)=>{

  }
  openCreate=()=>{
    const{tabValue}=this.state;
    if (tabValue==="hoarding") {
      this.setState({openHoarding:true})
    }else{
      alert("kiosk")
    }
  }
  render() {
    const { tabValue ,openHoarding} = this.state;

    return (
        <Card>
            <AppBar style={{marginTop:65}} color={"inherit"}>
              <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                  Existing Advertisement
                </Typography>
                <Button onClick={e=>this.openCreate()} variant={"outlined"} href={"#"} color="primary">
                  New Advertisement
                </Button>
              </Toolbar>
              <Tabs
                component={"div"}
                value={tabValue}
                onChange={(event, val) => this.setState({ tabValue: val })}
                aria-label="Disabled tabs example"
              >
                <Tab href={"#"} label="Hoarding" value={"hoarding"}/>
                <Tab href={"#"} label="Kiosk" value={"kiosk"}/>
              </Tabs>
            </AppBar>
          <CardContent style={{marginTop:25}}>

          {tabValue === "hoarding" && <ExistingHoardingList onError={this.displayError} onEdit={this.onKioskEdit} onDelete={this.onKioskDelete}/>}
            {tabValue === "kiosk" && <ExistingKioskList onError={this.displayError} onDelete={this.onHoardingDelete} onEdit={this.onHoardingEdit}/>}
          </CardContent>

          <HoardingDialog onClose={()=>this.setState({openHoarding:false})} open={openHoarding} onCreate={this.createHoarding}/>
        </Card>
    );
  }
}

export default ExistingAdvertisementView;
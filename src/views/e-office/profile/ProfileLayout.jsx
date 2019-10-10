import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import NavPills from "../../../components/NavPills/NavPills";
import UserIcon from "@material-ui/icons/VerifiedUser";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/es/Typography/Typography";
import BasicProfile from "./BasicProfile";
import ChangePassword from "../../advertiser/profile/ChangePassword";
import StaffSignature from "./StaffSignature";
import Grid from "@material-ui/core/Grid";

class ProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state={
      tabValue:0
    }
  }

  render() {
    return (
      <Grid container={true} justify={"flex-start"} >
        <Grid item={true} xs={12} sm={12} md={6}>
          <Card>
            <CardContent>
              <CardHeader style={{textAlign:"center"}} title={"My Account"} subheader={"Click update button to update your profile"}/>
                  <NavPills
                    active={this.state.tabValue}
                    changeTabValue={(tabValue)=>this.setState({tabValue})}
                    alignCenter={true}
                    tabs={[
                      {
                        value: 0,
                        onTabClick:(tabValue=>this.setState({tabValue})),
                        tabButton: "Profile",
                        tabIcon: UserIcon,
                        tabContent: (<BasicProfile/>)
                      }, {
                        value: 1,
                        onTabClick:(tabValue=>this.setState({tabValue})),
                        tabButton: "Change Password",
                        tabIcon: UserIcon,
                        tabContent: (<ChangePassword/>)
                      }, {
                        value: 2,
                        onTabClick:(tabValue=>this.setState({tabValue})),
                        tabButton: "Signature",
                        tabIcon: NotificationIcon,
                        tabContent: (<StaffSignature/>)
                      }
                    ]}
                  />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default ProfileLayout;
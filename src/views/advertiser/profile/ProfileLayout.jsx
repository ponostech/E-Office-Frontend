import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import NavPills from "../../../components/NavPills/NavPills";
import UserIcon from "@material-ui/icons/VerifiedUser";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import Profile from "./Profile";
import NotesheetList from "../../e-office/files/notesheet/NotesheetList";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import ChangePassword from "./ChangePassword";

class ProfileLayout extends Component {
  render() {
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={6}>
         <Card>
           <CardHeader title={"Update Profile"}/>
           <CardContent>
             <NavPills
               horizontal={{
                 tabsGrid: { xs: 12, sm: 12, md: 2 },
                 contentGrid: { xs: 12, sm: 12, md: 10 }
               }}
               tabs={[
                 {
                   tabButton: "Basic Info",
                   tabIcon:UserIcon,
                   tabContent:(<Profile/>)
                 }, {
                   tabButton: "Change Password",
                   tabIcon:UserIcon,
                   tabContent:(<ChangePassword/>)
                 },{
                   tabButton: "Notification",
                   tabIcon:NotificationIcon,
                   tabContent:(<NotesheetList/>)
                 }
               ]}
             />
           </CardContent>
         </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default ProfileLayout;
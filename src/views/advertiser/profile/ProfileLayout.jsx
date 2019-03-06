import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import NavPills from "../../../components/NavPills/NavPills";
import UserIcon from "@material-ui/icons/VerifiedUser";
import NotificationIcon from "@material-ui/icons/NotificationImportant";

class ProfileLayout extends Component {
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <NavPills
            direction={"vertical"}
            alignCenter={true}
            tabs={[
              {
                tabButton: "Update Profile",
                tabIcon:UserIcon,
                tabContent:(<ProfileLayout/>)
              },{
                tabButton: "Notification",
                tabIcon:NotificationIcon,
                tabContent:(<ProfileLayout/>)
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default ProfileLayout;
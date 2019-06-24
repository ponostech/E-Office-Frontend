import React, {Component} from "reactn";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import NavPills from "../../../components/NavPills/NavPills";
import UserIcon from "@material-ui/icons/VerifiedUser";
import Profile from "./Profile";
import {Card, CardContent} from "@material-ui/core";
import ChangePassword from "./ChangePassword";
import Typography from "@material-ui/core/es/Typography/Typography";
import AdvertiserLicense from "./AdvertiserLicense";

class ProfileLayout extends Component {

    componentDidMount() {
        this.setGlobal({loading:false})
    }

    render() {
        return (
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardContent>
                            <GridContainer justify={"center"}>
                                <Typography variant={"headline"}>Update profile</Typography>
                                <GridItem xs={12} sm={12} md={12}>
                                    <NavPills
                                        horizontal={{
                                            tabsGrid: {xs: 12, sm: 12, md: 2},
                                            contentGrid: {xs: 12, sm: 12, md: 10}
                                        }}
                                        tabs={[
                                            {
                                                tabButton: "Basic Info",
                                                tabIcon: UserIcon,
                                                tabContent: (<Profile/>)
                                            }, {
                                                tabButton: "Change Password",
                                                tabIcon: UserIcon,
                                                tabContent: (<ChangePassword/>)
                                            },{
                                                tabButton: "License",
                                                tabIcon: UserIcon,
                                                tabContent: (<AdvertiserLicense/>)
                                            }
                                        ]}
                                    />
                                </GridItem>
                            </GridContainer>

                        </CardContent>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default ProfileLayout;
import React from 'react';

import {IconButton, Typography} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Button from "../../CustomButtons/Button";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";

import UserIcon from "@material-ui/icons/AccountCircleRounded";
import SettingIcon from "@material-ui/icons/Settings";

const menu = (props) => {
    const {routes, history} = props;

    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <IconButton>
                    <HomeIcon onClick={props.linkClick.bind(this, routes.E_OFFICE)}/>
                </IconButton>

                <Button variant={"contained"}
                        color={"primary"}
                        onClick={props.linkClick.bind(this, routes.DESK)}
                >
                    Desk
                </Button>

                <CustomDropdown
                    dropdownList={[
                        {title: "Create New", link: routes.NEW_FILE},
                        {title: "List Created", link: routes.CREATED_FILES},
                        {title: "List Sent", link: routes.SENT_FILE},
                        {title: "Archived", link: routes.CLOSE_FILE},
                        {title: "Single File", link: routes.FILE_DETAIL},
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"File"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    dropdownList={[
                        {title: "Create New", link: routes.NEW_RECEIPT},
                        {title: "List Created", link: routes.CREATED_RECEIPT},
                        {title: "List Sent", link: routes.SENT_RECEIPT},
                        {title: "List Closed", link: routes.CLOSE_RECEIPT},
                        {title: "Single Receipt", link: routes.RECEIPT_DETAIL},
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Receipt"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    dropdownList={[
                        {title: "OBPAS", link: routes.OBPAS},
                        {title: "Hoarding", link: routes.HOARDINGS},
                        {title: "Shop Licensing", link: routes.SHOP_LICENSES},
                        {title: "Kiosk", link: routes.KIOSKS},
                        {title: "Banners", link: routes.BANNERS},
                        {title: "Advertiser", link: routes.ADVERTISERS},
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Application"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    dropdownList={[
                        {title: "Report One", link: routes.OBPAS},
                        {title: "Report Two", link: routes.OBPAS}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Report"}
                    buttonProps={{color: "transparent"}}/>

            </div>

            <div style={{display: "flex", alignItems: "center"}}>
                <Typography variant={"caption"} color={"textSecondary"}>Hello Username</Typography>
                <IconButton>
                    <UserIcon/>
                </IconButton>
                <IconButton onClick={() => {
                    history.push(routes.SETTING);
                }}>
                    <SettingIcon/>
                </IconButton>
            </div>
            {/*<div style={{display: "flex", alignItems: "center"}}>
                <IconButton>
                    <HomeIcon onClick={props.linkClick.bind(this, '/home')} />
                </IconButton>

                <Button variant={"contained"} color={"primary"} onClick={(e) => {
                    history.push(OfficeRoutes.DESK)
                }}> Desk</Button>

                <CustomDropdown
                    onClick={this.handleFile.bind(this)}
                    dropdownList={["Create New", "List Created", "List Sent", "All files"]}
                    buttonText={"File"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    onClick={this.handleReceipt.bind(this)}
                    dropdownList={["Create New", "List Created", "List Sent"]}
                    buttonText={"Receipt"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    onClick={this.handleApplication.bind(this)}
                    dropdownList={["OBPAS", "Hoarding", "Shop Licensing", "Kiosk", "Banners", "Advertiser"]}
                    buttonText={"Application"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    onClick={this.handleReport.bind(this)}
                    dropdownList={["Report one", "Report two"]}
                    buttonText={"Report"}
                    buttonProps={{color: "transparent"}}/>

                <Button style={{background: "transparent", color: "black"}} onClick={(e) => {
                }} simple={true}> DSC</Button>

                <Button style={{background: "transparent", color: "black"}} onClick={(e) => {
                    history.push(OfficeRoutes.ADVERTISERS)
                }} simple={true}> Advertisers</Button>
            </div>

            <div style={{display: "flex", alignItems: "center"}}>
                <Typography variant={"caption"} color={"textSecondary"}>Hello Username</Typography>
                <IconButton onClick={this.handleUser.bind(this)}>
                    <UserIcon/>
                </IconButton>
                <IconButton onClick={() => {
                    history.push(OfficeRoutes.SETTING);
                }}>
                    <SettingIcon/>
                </IconButton>
            </div>*/}
        </>
    )
};

export default menu;
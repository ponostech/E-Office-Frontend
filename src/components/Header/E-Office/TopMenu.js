import React from 'react';
import {NavLink} from "react-router-dom";

import {IconButton, Typography} from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import {Folder} from "@material-ui/icons";

const menu = (props) => {
    const {routes} = props;
    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <NavLink to={routes.HOME}><IconButton color="alert"><Icon>apps</Icon></IconButton></NavLink>
                <NavLink to={routes.E_OFFICE}><IconButton color="secondary"><Icon>home</Icon></IconButton></NavLink>
                <NavLink to={routes.DESK}><IconButton color="primary"><Icon>inbox</Icon></IconButton></NavLink>
                <CustomDropdown
                    buttonIcon={Folder}
                    buttonProps={{
                        round: true,
                        style: { marginBottom: "0" },
                        color: "primary"
                    }}
                    dropdownList={[
                        {title: "Create New", link: routes.NEW_FILE},
                        {title: "List Created", link: routes.CREATED_FILES},
                        {title: "List Sent", link: routes.SENT_FILE},
                        {title: "Archived", link: routes.CLOSE_FILE},
                        {title: "Single File", link: routes.FILE_DETAIL},
                    ]}
                    linkClick={props.linkClick}
                    buttonText={""}
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
                <IconButton><Icon>account_circle_rounded</Icon></IconButton>
                <NavLink to={routes.SETTING}><IconButton><Icon>settings</Icon></IconButton></NavLink>
            </div>
        </>
    )
};

export default menu;
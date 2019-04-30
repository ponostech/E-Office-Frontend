import React from "react";
import {NavLink} from "react-router-dom";

import {IconButton, Typography} from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";

const menu = (props) => {
    const {routes} = props;
    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <NavLink to={routes.HOME}><IconButton color="primary"><Icon>apps</Icon></IconButton></NavLink>
                <NavLink to={routes.DESK}><IconButton color="primary"><Icon>inbox</Icon></IconButton></NavLink>
                <CustomDropdown

                    dropdownList={[
                        {title: "Create New", link: routes.NEW_FILE},
                        {title: "List Created", link: routes.CREATED_FILES},
                        {title: "List Sent", link: routes.SENT_FILE},
                        {title: "Archived", link: routes.CLOSE_FILE}
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
                        {title: "Single Receipt", link: routes.RECEIPT_DETAIL}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Receipt"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.NEW_HOARDINGS},
                        {title: "Under Process", link: routes.UNDER_PROCESS_HOARDINGS},
                        {title: "Approved List", link: routes.APPROVED_HOARDING},
                        {title: "Reject List", link: routes.REJECTED_HOARDING}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Hoarding"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.NEW_KIOSKS},
                        {title: "Under Process", link: routes.UNDER_PROCESS_KIOSKS},
                        {title: "Approved List", link: routes.APPROVED_KIOSKS},
                        {title: "Reject List", link: routes.REJECTED_KIOSKS}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Kiosk"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.ADVERTISERS},
                        {title: "Under Process", link: routes.HOARDINGS},
                        {title: "Approved List", link: routes.SHOP_LICENSES},
                        {title: "Reject List", link: routes.SHOP_LICENSES}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Advertiser"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.NEW_BANNER},
                        {title: "Under Process", link: routes.UNDER_PROCESS_BANNER},
                        {title: "Approved List", link: routes.APPROVED_BANNER},
                        {title: "Reject List", link: routes.REJECTED_BANNER}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Banner"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.NEW_SHOPLICENSE},
                        {title: "Under Process", link: routes.UNDER_PROCESS_SHOPLICENSE},
                        {title: "Approved List", link: routes.APPROVED_SHOPLICENSE},
                        {title: "Reject List", link: routes.REJECTED_SHOPLICENSE}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Shop License"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Application", link: routes.NEW_SHOPLICENSE},
                        {title: "Under Process", link: routes.UNDER_PROCESS_SHOPLICENSE},
                        {title: "Approved List", link: routes.APPROVED_SHOPLICENSE},
                        {title: "Reject List", link: routes.REJECTED_SHOPLICENSE}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Hotel & Lodging"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "New Trade", link: routes.NEW_TRADE},
                        {title: "List Trade", link: routes.HOARDINGS},
                        {title: "New Staff", link: routes.STAFF_REGISTRATION},
                        {title: "List Staff", link: routes.STAFF_LIST},

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Admin Control"}
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
                <Typography variant={"caption"} color={"textSecondary"}>Hello {localStorage.getItem('name')}</Typography>
                <IconButton><Icon>account_circle_rounded</Icon></IconButton>
                <NavLink to={routes.SETTING}><IconButton><Icon>settings</Icon></IconButton></NavLink>
            </div>
        </>
    );
};

export default menu;
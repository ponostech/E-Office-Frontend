import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import {LoginService} from "../../../services/LoginService";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";

const menu = (props) => {
  const {history} = props;
  const currentUser = JSON.parse(localStorage.getItem('current_user'));

  return (
      <>
        <div style={{display: "flex", alignItems: "center"}}>
          <NavLink to={OfficeRoutes.DESK}><IconButton color="primary"><Icon>inbox</Icon></IconButton></NavLink>
          <CustomDropdown
              dropdownList={[
                {title: "Create New", link: OfficeRoutes.NEW_FILE},
                // {title: "List Created By You", link: OfficeRoutes.CREATED_FILES},
                // {title: "List Sent by You", link: OfficeRoutes.SENT_FILE},
                {title: "List New", link: OfficeRoutes.FILE_IN_ACTIVE_LIST},
                {title: "List Closed", link: OfficeRoutes.FILE_CLOSED_LIST},
                {title: "List Archived", link: OfficeRoutes.FILE_ARCHIVED_LIST},
                {title: "List Active", link: OfficeRoutes.FILE_ACTIVE_LIST},
              ]}
              linkClick={props.linkClick}
              buttonText={"File"}
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Create New", link: OfficeRoutes.NEW_RECEIPT},
                {title: "List Created", link: OfficeRoutes.CREATED_RECEIPT},
                {title: "List Sent", link: OfficeRoutes.SENT_RECEIPT},
                {title: "List Closed", link: OfficeRoutes.CLOSE_RECEIPT},
                {title: "Single Receipt", link: OfficeRoutes.RECEIPT_DETAIL}
              ]}
              linkClick={props.linkClick}
              buttonText={"Receipt"}
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Advertiser", link: OfficeRoutes.ADVERTISER_NEW_LIST},
                {title: "Hoarding", link: OfficeRoutes.NEW_HOARDINGS},
                {title: "Kiosks", link: OfficeRoutes.NEW_KIOSKS},
                {title: "Banner", link: OfficeRoutes.NEW_BANNER},
                {title: "Shop", link: OfficeRoutes.NEW_SHOPLICENSE},
                {title: "Hotel & Lodging", link: OfficeRoutes.NEW_HOTELLICENSE},
              ]}
              linkClick={props.linkClick}
              buttonText="New Application"
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.ADVERTISER_IN_PROCESS_LIST},
                {title: "Approved List", link: OfficeRoutes.ADVERTISER_APPROVE_LIST},
                {title: "Rejected List", link: OfficeRoutes.ADVERTISER_REJECT_LIST},
                {title: "Cancelled List", link: OfficeRoutes.ADVERTISER_CANCEL_LIST}
              ]}
              linkClick={props.linkClick}
              buttonText={"Advertiser"}
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOARDINGS},
                {title: "Approved List", link: OfficeRoutes.APPROVED_HOARDINGS},
                {title: "Reject List", link: OfficeRoutes.REJECTED_HOARDINGS}
              ]}
              linkClick={props.linkClick}
              buttonText={"Hoarding"}
              buttonProps={{color: "transparent"}}/>
          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_KIOSKS},
                {title: "Approved List", link: OfficeRoutes.APPROVED_KIOSKS},
                {title: "Reject List", link: OfficeRoutes.REJECTED_KIOSKS}

              ]}
              linkClick={props.linkClick}
              buttonText={"Kiosk"}
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_BANNER},
                {title: "Approved List", link: OfficeRoutes.APPROVED_BANNER},
                {title: "Reject List", link: OfficeRoutes.REJECTED_BANNER}

              ]}
              linkClick={props.linkClick}
              buttonText={"Banner"}
              buttonProps={{color: "transparent"}}/>
          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_SHOPLICENSE},
                {title: "Approved List", link: OfficeRoutes.APPROVED_SHOPLICENSE},
                {title: "Reject List", link: OfficeRoutes.REJECTED_SHOPLICENSE}

              ]}
              linkClick={props.linkClick}
              buttonText={"Shop"}
              buttonProps={{color: "transparent"}}/>
          <CustomDropdown
              dropdownList={[
                {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOTELLICENSE},
                {title: "Approved List", link: OfficeRoutes.APPROVED_HOTELLICENSE},
                {title: "Reject List", link: OfficeRoutes.REJECTED_HOTELLICENSE}

              ]}
              linkClick={props.linkClick}
              buttonText={"Hotel & Lodging"}
              buttonProps={{color: "transparent"}}/>

          {/*<CustomDropdown
                    dropdownList={[
                        {title: "New Trade", link: OfficeRoutes.TRADE_NEW},
                        {title: "List Trade", link: OfficeRoutes.TRADE_LIST},
                        {title: "New Staff", link: OfficeRoutes.STAFF_REGISTRATION},
                        {title: "List Staff", link: OfficeRoutes.STAFF_LIST}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Admin Control"}
                    buttonProps={{color: "transparent"}}/>*/}

          <CustomDropdown
              dropdownList={[
                {title: "Report One", link: OfficeRoutes.OBPAS},
                {title: "Report Two", link: OfficeRoutes.OBPAS}
              ]}
              linkClick={props.linkClick}
              buttonText={"MIS"}
              buttonProps={{color: "transparent"}}/>
        </div>


        <div style={{display: "flex", alignItems: "center"}}>
          <Typography variant={"caption"}
                      color={"textSecondary"}>Hello {currentUser.staff.name} ({currentUser.staff.designation})</Typography>
          <IconButton><Icon>account_circle_rounded</Icon></IconButton>
          <NavLink to={OfficeRoutes.SETTING}><IconButton><Icon>settings</Icon></IconButton></NavLink>

          <Tooltip title={"Click here to log user out"}>
            <IconButton style={{color: "red"}} onClick={
              () => {
                new LoginService()
                    .logout(errorMessage => console.log(errorMessage), successMessage => history.push(OfficeRoutes.HOME))
                    .finally(() => console.log("log out request has been made"));
              }
            }>
              <Icon>power_settings_new</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </>
  );
};

export default withRouter(menu);
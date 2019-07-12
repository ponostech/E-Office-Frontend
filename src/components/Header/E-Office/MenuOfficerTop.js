import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";
import MenuRight from './RightMenu'

const menu = (props) => {
  const newAppsText = <span style={{color: 'red'}}>New</span>;
  return (
      <>
        <div style={{display: "flex", alignItems: "center"}}>
          <NavLink to={OfficeRoutes.DESK}><IconButton color="primary"><Icon>inbox</Icon></IconButton></NavLink>
          <NavLink to={OfficeRoutes.CHALLAN_LIST}><IconButton color="primary"><Icon>account_balance_wallet</Icon></IconButton></NavLink>

          <CustomDropdown
              dropdownList={[
                {title: "Create New", link: OfficeRoutes.NEW_FILE},
                // {title: "List Created By You", link: OfficeRoutes.CREATED_FILES},
                // {title: "List Sent by You", link: OfficeRoutes.SENT_FILE},
                {title: "List New", link: OfficeRoutes.FILE_IN_ACTIVE_LIST},
                {title: "List Active", link: OfficeRoutes.FILE_ACTIVE_LIST},
                {title: "List Closed", link: OfficeRoutes.FILE_CLOSED_LIST},
                {title: "List Archived", link: OfficeRoutes.FILE_ARCHIVED_LIST},
              ]}
              linkClick={props.linkClick}
              buttonText={"File"}
              buttonProps={{color: "transparent"}}/>

          <CustomDropdown
              dropdownList={[
                {title: "Create New", link: OfficeRoutes.NEW_RECEIPT},
                {title: "List New", link: OfficeRoutes.RECEIPT_NEW_LIST},
                {title: "List Attached", link: OfficeRoutes.RECEIPT_ATTACHED_LIST},
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
              buttonText={newAppsText}
              buttonProps={{color: "transparent"}}/>

          {/*<CustomDropdown
              dropdownList={[
                {title: "New Hoarding Proposal", link: OfficeRoutes.ADVERTISER_NEW_LIST},
                {title: "Under Process Hoarding Proposal", link: OfficeRoutes.ADVERTISER_NEW_LIST},
                {title: "Approved Hoarding Proposal", link: OfficeRoutes.ADVERTISER_NEW_LIST},
                {title: "Rejected Hoarding Proposal", link: OfficeRoutes.ADVERTISER_NEW_LIST},
                {title: "New Kiosk Proposal", link: OfficeRoutes.NEW_HOARDINGS},
                {title: "Under Process Kiosk Proposal", link: OfficeRoutes.NEW_HOARDINGS},
                {title: "Approved Kiosk Proposal", link: OfficeRoutes.NEW_HOARDINGS},
                {title: "Rejected Kiosk Proposal", link: OfficeRoutes.NEW_HOARDINGS},
              ]}
              linkClick={props.linkClick}
              buttonText="Proposal"
              buttonProps={{color: "transparent"}}/>*/}

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
        <MenuRight/>
      </>
  );
};

export default withRouter(menu);
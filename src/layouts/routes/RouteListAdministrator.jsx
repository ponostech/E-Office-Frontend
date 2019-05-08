import React from 'react';

import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import {Route, withRouter} from "react-router-dom";
import ReceiptStore from "../../views/e-office/receipt/ReceiptStore";
import FileStore from "../../views/e-office/files/FileStore";
import ReceiptShow from "../../views/e-office/receipt/ReceiptShow";
import ReceiptList from "../../views/e-office/receipt/ReceiptList";
import ReceiptSentList from "../../views/e-office/receipt/ReceiptSentList";
import ShopNewList from "../../views/e-office/applications/shop-license/ShopNewList";
import HoardingApplications from "../../views/e-office/applications/hoarding/HoardingApplications";
import Settings from "../../views/e-office/settings/Setting";
import FileDetail from "../../views/e-office/files/details/FileDetail";
import FileCreatedList from "../../views/e-office/files/FileCreatedList";
import FileSentList from "../../views/e-office/files/FileSentList";
import FileActiveList from "../../views/e-office/files/FileActiveList";
import FileInActiveList from "../../views/e-office/files/FileNewList";
import FileClosedList from "../../views/e-office/files/FileClosedList";
import FileArchivedList from "../../views/e-office/files/FileArchivedList";
import HoardingDetails from "../../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../../views/e-office/desk/DeskView";
import TradeNew from "../../views/e-office/admin/TradeNew";
import UnderProcessHoarding from "../../views/e-office/applications/hoarding/HoardingUnderProcessList";
import RejectedHoardingApplications from "../../views/e-office/applications/hoarding/HoardingRejectedList";
import ApprovedHoarding from "../../views/e-office/applications/hoarding/HoardingApprovedList";
import NewKioskApplications from "../../views/e-office/applications/kiosk/KioskNewList";
import UnderProcessKiosks from "../../views/e-office/applications/kiosk/KioskUnderProcessList";
import ApprovedKiosks from "../../views/e-office/applications/kiosk/KioskApprovedList";
import RejectedKiosks from "../../views/e-office/applications/kiosk/KioskRejectedList";
import NewBannerApplications from "../../views/e-office/applications/banners/BannerNewList";
import UnderProcessBanner from "../../views/e-office/applications/banners/BannerUnderProcessList";
import BannerGrantedList from "../../views/e-office/applications/banners/BannerApprovedList";
import BannerRejectedList from "../../views/e-office/applications/banners/BannerRejectedList";
import UnderProcessShopLicense from "../../views/e-office/applications/shop-license/UnderProcessShopLicense";
import ApprovedShopLicense from "../../views/e-office/applications/shop-license/ApprovedShopLicense";
import RejectedShopLicense from "../../views/e-office/applications/shop-license/RejectedShopLicense";
import AdvertiserNewList from "../../views/e-office/applications/advertisers/AdvertiserNewList";
import AdvertiserInProcessList from "../../views/e-office/applications/advertisers/AdvertiserInProcessList";
import StaffList from "../../views/e-office/staff/StaffList";
import StaffRegistration from "../../views/e-office/staff/StaffRegistration";
import HotelUnderProcessList from "../../views/e-office/applications/hotel/HotelUnderProcessList";
import HotelApprovedList from "../../views/e-office/applications/hotel/HotelApprovedList";
import HotelRejectedList from "../../views/e-office/applications/hotel/HotelRejectedList";
import HotelNewList from "../../views/e-office/applications/hotel/HotelNewList";
import AdvertiserApprovedList from "../../views/e-office/applications/advertisers/AdvertiserApprovedList";
import AdvertiserRejectedList from "../../views/e-office/applications/advertisers/AdvertiserRejectedList";
import AdvertiserCanceledList from "../../views/e-office/applications/advertisers/AdvertiserCanceledList";
import TradeList from "../../views/e-office/admin/TradeList";
import DashboardAdmin from "../../views/e-office/admin/DashboardAdmin";

const routes = (props) => {
    return (
        <>
            <Route exact path={OfficeRoutes.E_OFFICE} render={e => <DashboardAdmin doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.DESK} render={e => <DeskView doLoad={props.doLoad}/>}/>

            {/*Receipt*/}
            <Route exact path={OfficeRoutes.NEW_RECEIPT} component={ReceiptStore}/>
            <Route exact path={OfficeRoutes.RECEIPT_DETAIL} component={ReceiptShow}/>
            <Route exact path={OfficeRoutes.CREATED_RECEIPT} component={ReceiptList}/>
            <Route exact path={OfficeRoutes.SENT_RECEIPT} component={ReceiptSentList}/>

            {/*File*/}
            <Route exact path={OfficeRoutes.NEW_FILE} render={e => <FileStore doLoad={props.doLoad}/>}/>
            <Route path={OfficeRoutes.FILE_DETAIL}
                   render={(e) => <FileDetail {...props} doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.CREATED_FILES} component={FileCreatedList}/>
            <Route exact path={OfficeRoutes.SENT_FILE} component={FileSentList}/>
            <Route exact path={OfficeRoutes.FILE_ACTIVE_LIST}
                   render={e => <FileActiveList {...props} doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.FILE_IN_ACTIVE_LIST}
                   render={e => <FileInActiveList {...props} doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.FILE_CLOSED_LIST}
                   render={e => <FileClosedList {...props} doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.FILE_ARCHIVED_LIST}
                   render={e => <FileArchivedList {...props} doLoad={props.doLoad}/>}/>

            {/*OBPAS*/}
            <Route exact path={OfficeRoutes.OBPAS} component={FileStore}/>

            {/*Advertiser*/}
            <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>
            <Route exact path={OfficeRoutes.ADVERTISER_NEW_LIST}
                   render={e => <AdvertiserNewList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.ADVERTISER_IN_PROCESS_LIST}
                   render={e => <AdvertiserInProcessList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.ADVERTISER_APPROVE_LIST}
                   render={e => <AdvertiserApprovedList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.ADVERTISER_REJECT_LIST}
                   render={e => <AdvertiserRejectedList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.ADVERTISER_CANCEL_LIST}
                   render={e => <AdvertiserCanceledList doLoad={props.doLoad}/>}/>

            {/*Hoarding*/}
            <Route exact path={OfficeRoutes.NEW_HOARDINGS}
                   render={e => <HoardingApplications doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.UNDER_PROCESS_HOARDINGS}
                   render={e => <UnderProcessHoarding doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.REJECTED_HOARDINGS}
                   render={e => <RejectedHoardingApplications doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.APPROVED_HOARDINGS}
                   render={e => <ApprovedHoarding doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>

            {/*Kiosk*/}
            <Route exact path={OfficeRoutes.NEW_KIOSKS}
                   render={e => <NewKioskApplications doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.UNDER_PROCESS_KIOSKS}
                   render={e => <UnderProcessKiosks doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.APPROVED_KIOSKS}
                   render={e => <ApprovedKiosks doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.REJECTED_KIOSKS}
                   render={e => <RejectedKiosks doLoad={props.doLoad}/>}/>

            {/*Banner*/}
            <Route exact path={OfficeRoutes.NEW_BANNER}
                   render={e => <NewBannerApplications doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.UNDER_PROCESS_BANNER}
                   render={e => <UnderProcessBanner doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.APPROVED_BANNER}
                   render={e => <BannerGrantedList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.REJECTED_BANNER}
                   render={e => <BannerRejectedList doLoad={props.doLoad}/>}/>


            {/*Shop Licensing*/}
            <Route exact path={OfficeRoutes.NEW_SHOPLICENSE}
                   render={e => <ShopNewList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.UNDER_PROCESS_SHOPLICENSE}
                   render={e => <UnderProcessShopLicense doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.APPROVED_SHOPLICENSE}
                   render={e => <ApprovedShopLicense doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.REJECTED_SHOPLICENSE}
                   render={e => <RejectedShopLicense doLoad={props.doLoad}/>}/>

            {/*Shop Licensing*/}
            <Route exact path={OfficeRoutes.NEW_HOTELLICENSE}
                   render={e => <HotelNewList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.UNDER_PROCESS_HOTELLICENSE}
                   render={e => <HotelUnderProcessList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.APPROVED_HOTELLICENSE}
                   render={e => <HotelApprovedList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.REJECTED_HOTELLICENSE}
                   render={e => <HotelRejectedList doLoad={props.doLoad}/>}/>
            {/*Admin*/}
            <Route exact path={OfficeRoutes.TRADE_NEW}
                   render={e => <TradeNew doLoad={props.doLoad}/>}/>
            {/*Admin*/}
            <Route exact path={OfficeRoutes.TRADE_LIST}
                   render={e => <TradeList doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.STAFF_REGISTRATION}
                   render={e => <StaffRegistration doLoad={props.doLoad}/>}/>
            <Route exact path={OfficeRoutes.STAFF_LIST}
                   render={e => <StaffList doLoad={props.doLoad}/>}/>
            <Route path={OfficeRoutes.SETTING} component={Settings}/>
        </>
    )
};

export default withRouter(routes);
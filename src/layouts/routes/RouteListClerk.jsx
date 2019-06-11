import React from 'react';

import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import {Route, withRouter} from "react-router-dom";
import ReceiptCreate from "../../views/e-office/receipt/ReceiptCreate";
import FileCreate from "../../views/e-office/files/FileCreate";
import ReceiptShow from "../../views/e-office/receipt/ReceiptShow";
import ReceiptList from "../../views/e-office/receipt/ReceiptList";
import ReceiptSentList from "../../views/e-office/receipt/ReceiptSentList";
import ShopNewList from "../../views/e-office/applications/shop-license/ShopNewList";
import HoardingApplications from "../../views/e-office/applications/hoarding/HoardingNewList";
import FileDetail from "../../views/e-office/files/details/FileView";
import FileCreatedList from "../../views/e-office/files/FileCreatedList";
import FileSentList from "../../views/e-office/files/FileSentList";
import FileActiveList from "../../views/e-office/files/FileActiveList";
import FileInActiveList from "../../views/e-office/files/FileNewList";
import FileClosedList from "../../views/e-office/files/FileClosedList";
import FileArchivedList from "../../views/e-office/files/FileArchivedList";
import HoardingDetails from "../../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../../views/e-office/desk/DeskView";
import NewKioskApplications from "../../views/e-office/applications/kiosk/KioskNewList";
import NewBannerApplications from "../../views/e-office/applications/banners/BannerNewList";
import AdvertiserNewList from "../../views/e-office/applications/advertisers/AdvertiserNewList";
import HotelNewList from "../../views/e-office/applications/hotel/HotelNewList";
import ReceiptNewList from "../../views/e-office/receipt/ReceiptNewList";
import ReceiptEdit from "../../views/e-office/receipt/ReceiptEdit";
import ReceiptAttachedList from "../../views/e-office/receipt/ReceiptAttachedList";

const routes = (props) => {
    return (
        <>
            <Route exact path={OfficeRoutes.DESK} render={e => <DeskView/>}/>

            {/*Receipt*/}
            <Route exact path={OfficeRoutes.NEW_RECEIPT} component={ReceiptCreate}/>
            <Route exact path={OfficeRoutes.EDIT_RECEIPT(":id")} component={ReceiptEdit}/>
            <Route exact path={OfficeRoutes.RECEIPT_NEW_LIST} component={ReceiptNewList}/>
            <Route exact path={OfficeRoutes.RECEIPT_ATTACHED_LIST} component={ReceiptAttachedList}/>

            {/*File*/}
            <Route exact path={OfficeRoutes.NEW_FILE} render={e => <FileCreate/>}/>
            <Route path={OfficeRoutes.FILE_DETAIL} render={(e) => <FileDetail {...props}/>}/>
            <Route exact path={OfficeRoutes.CREATED_FILES} component={FileCreatedList}/>
            <Route exact path={OfficeRoutes.SENT_FILE} component={FileSentList}/>
            <Route exact path={OfficeRoutes.FILE_ACTIVE_LIST} render={e => <FileActiveList {...props}/>}/>
            <Route exact path={OfficeRoutes.FILE_IN_ACTIVE_LIST} render={e => <FileInActiveList {...props}/>}/>
            <Route exact path={OfficeRoutes.FILE_CLOSED_LIST} render={e => <FileClosedList {...props}/>}/>
            <Route exact path={OfficeRoutes.FILE_ARCHIVED_LIST} render={e => <FileArchivedList {...props}/>}/>

            {/*Advertiser*/}
            <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>
            <Route exact path={OfficeRoutes.ADVERTISER_NEW_LIST} render={e => <AdvertiserNewList/>}/>

            {/*Hoarding*/}
            <Route exact path={OfficeRoutes.NEW_HOARDINGS} render={e => <HoardingApplications/>}/>
            <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>

            {/*Kiosk*/}
            <Route exact path={OfficeRoutes.NEW_KIOSKS} render={e => <NewKioskApplications/>}/>

            {/*Banner*/}
            <Route exact path={OfficeRoutes.NEW_BANNER} render={e => <NewBannerApplications/>}/>

            {/*Shop Licensing*/}
            <Route exact path={OfficeRoutes.NEW_SHOPLICENSE} render={e => <ShopNewList/>}/>

            {/*Shop Licensing*/}
            <Route exact path={OfficeRoutes.NEW_HOTELLICENSE} render={e => <HotelNewList/>}/>
        </>
    )
};

export default withRouter(routes);
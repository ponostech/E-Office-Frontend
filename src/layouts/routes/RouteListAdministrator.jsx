import React from "react";
import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import { Route, withRouter } from "react-router-dom";
import ReceiptCreate from "../../views/e-office/receipt/ReceiptCreate";
import FileCreate from "../../views/e-office/files/FileCreate";
import ShopNewList from "../../views/e-office/applications/shop-license/ShopNewList";
import HoardingApplications from "../../views/e-office/applications/hoarding/HoardingNewList";
import Settings from "../../views/e-office/settings/Setting";
import FileView from "../../views/e-office/files/details/FileView";
import FileCreatedList from "../../views/e-office/files/FileCreatedList";
import FileSentList from "../../views/e-office/files/FileSentList";
import FileActiveList from "../../views/e-office/files/FileActiveList";
import FileNewList from "../../views/e-office/files/FileNewList";
import FileClosedList from "../../views/e-office/files/FileClosedList";
import FileArchivedList from "../../views/e-office/files/FileArchivedList";
import HoardingDetails from "../../views/e-office/applications/hoarding/HoardingDetails";
import AdvertiserDetails from "../../views/e-office/applications/advertisers/AdvertiserDetails";
import DeskView from "../../views/e-office/desk/DeskView";
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
import BannerCancelledList from "../../views/e-office/applications/banners/BannerCancelledList";
import UnderProcessShopLicense from "../../views/e-office/applications/shop-license/ShopInProcessList";
import ApprovedShopLicense from "../../views/e-office/applications/shop-license/ShopApprovedList";
import RejectedShopLicense from "../../views/e-office/applications/shop-license/ShopRejectedList";
import ShopCancelledList from "../../views/e-office/applications/shop-license/ShopCancelledList";
import AdvertiserNewList from "../../views/e-office/applications/advertisers/AdvertiserNewList";
import AdvertiserInProcessList from "../../views/e-office/applications/advertisers/AdvertiserInProcessList";
import StaffList from "../../views/e-office/staff/StaffList";
import StaffRegistration from "../../views/e-office/staff/StaffRegistration";
import HotelUnderProcessList from "../../views/e-office/applications/hotel/HotelInProcessList";
import HotelApprovedList from "../../views/e-office/applications/hotel/HotelApprovedList";
import HotelRejectedList from "../../views/e-office/applications/hotel/HotelRejectedList";
import HotelCancelledList from "../../views/e-office/applications/hotel/HotelCancelledList";
import HotelNewList from "../../views/e-office/applications/hotel/HotelNewList";
import AdvertiserApprovedList from "../../views/e-office/applications/advertisers/AdvertiserApprovedList";
import AdvertiserRejectedList from "../../views/e-office/applications/advertisers/AdvertiserRejectedList";
import AdvertiserCanceledList from "../../views/e-office/applications/advertisers/AdvertiserCanceledList";
import TradeList from "../../views/e-office/admin/trades/TradeList";
import DashboardAdmin from "../../views/e-office/admin/DashboardAdmin";
import LicenseTemplate from "../../views/e-office/admin/templates/LicenseTemplate";
import CancelTemplate from "../../views/e-office/admin/templates/CancelTemplate";
import RejectTemplate from "../../views/e-office/admin/templates/RejectTemplate";
import FormBuilderContainer from "../../components/form-builder/FormBuilderContainer";
import SiteVerificationFormList from "../../views/e-office/site-verification/SiteVerificationFormList";
import EditSiteVerificationTemplate from "../../components/form-builder/EditSiteVerificationTemplate";
import ReceiptNewList from "../../views/e-office/receipt/ReceiptNewList";
import ReceiptEdit from "../../views/e-office/receipt/ReceiptEdit";
import ReceiptAttachedList from "../../views/e-office/receipt/ReceiptAttachedList";
import HoardingCancelledList from "../../views/e-office/applications/hoarding/HoardingCancelledList";
import KioskCancelledList from "../../views/e-office/applications/kiosk/KioskCancelledList";
import FileHeadTemplates from "../../views/e-office/admin/e-file/FileHeadTemplates";
import AdvertisementRateView from "../../views/e-office/admin/rates/AdvertisementRateView";
import ShopUnpaidList from "../../views/e-office/applications/shop-license/ShopUnpaidList";
import ChallanContainer from "../../views/e-office/challan/ChallanContainer";

const routes = (props) => {
  return (
    <>
      <Route exact path={OfficeRoutes.E_OFFICE} render={e => <DashboardAdmin/>}/>
      <Route exact path={OfficeRoutes.DESK} render={e => <DeskView/>}/>

      {/*Receipt*/}
      <Route exact path={OfficeRoutes.NEW_RECEIPT} component={ReceiptCreate}/>
      <Route exact path={OfficeRoutes.EDIT_RECEIPT(":id")} component={ReceiptEdit}/>
      <Route exact path={OfficeRoutes.RECEIPT_NEW_LIST} component={ReceiptNewList}/>
      <Route exact path={OfficeRoutes.RECEIPT_ATTACHED_LIST} component={ReceiptAttachedList}/>


      {/*File*/}
      <Route exact path={OfficeRoutes.NEW_FILE} render={e => <FileCreate/>}/>
      <Route path={OfficeRoutes.FILE_DETAIL} render={(e) => <FileView {...props}/>}/>
      <Route exact path={OfficeRoutes.CREATED_FILES} component={FileCreatedList}/>
      <Route exact path={OfficeRoutes.SENT_FILE} component={FileSentList}/>
      <Route exact path={OfficeRoutes.FILE_ACTIVE_LIST} render={e => <FileActiveList {...props}/>}/>
      <Route exact path={OfficeRoutes.FILE_IN_ACTIVE_LIST} render={e => <FileNewList {...props}/>}/>
      <Route exact path={OfficeRoutes.FILE_CLOSED_LIST} render={e => <FileClosedList {...props}/>}/>
      <Route exact path={OfficeRoutes.FILE_ARCHIVED_LIST} render={e => <FileArchivedList {...props}/>}/>

      {/*OBPAS*/}
      <Route exact path={OfficeRoutes.OBPAS} component={FileCreate}/>

      {/*Advertiser*/}
      <Route exact path={OfficeRoutes.ADVERTISER_DETAIL} component={AdvertiserDetails}/>
      <Route exact path={OfficeRoutes.ADVERTISER_NEW_LIST} render={e => <AdvertiserNewList/>}/>
      <Route exact path={OfficeRoutes.ADVERTISER_IN_PROCESS_LIST} render={e => <AdvertiserInProcessList/>}/>
      <Route exact path={OfficeRoutes.ADVERTISER_APPROVE_LIST} render={e => <AdvertiserApprovedList/>}/>
      <Route exact path={OfficeRoutes.ADVERTISER_REJECT_LIST} render={e => <AdvertiserRejectedList/>}/>
      <Route exact path={OfficeRoutes.ADVERTISER_CANCEL_LIST} render={e => <AdvertiserCanceledList/>}/>

      {/*Hoarding*/}
      <Route exact path={OfficeRoutes.NEW_HOARDINGS} render={e => <HoardingApplications/>}/>
      <Route exact path={OfficeRoutes.UNDER_PROCESS_HOARDINGS} render={e => <UnderProcessHoarding/>}/>
      <Route exact path={OfficeRoutes.REJECTED_HOARDINGS} render={e => <RejectedHoardingApplications/>}/>
      <Route exact path={OfficeRoutes.APPROVED_HOARDINGS} render={e => <ApprovedHoarding/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_HOARDINGS} render={e => <HoardingCancelledList/>}/>
      <Route exact path={OfficeRoutes.HOARDING_DETAILS} component={HoardingDetails}/>

      {/*Kiosk*/}
      <Route exact path={OfficeRoutes.NEW_KIOSKS} render={e => <NewKioskApplications/>}/>
      <Route exact path={OfficeRoutes.UNDER_PROCESS_KIOSKS} render={e => <UnderProcessKiosks/>}/>
      <Route exact path={OfficeRoutes.APPROVED_KIOSKS} render={e => <ApprovedKiosks/>}/>
      <Route exact path={OfficeRoutes.REJECTED_KIOSKS} render={e => <RejectedKiosks/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_KIOSKS} render={e => <KioskCancelledList/>}/>

      {/*Banner*/}
      <Route exact path={OfficeRoutes.NEW_BANNER} render={e => <NewBannerApplications/>}/>
      <Route exact path={OfficeRoutes.UNDER_PROCESS_BANNER} render={e => <UnderProcessBanner/>}/>
      <Route exact path={OfficeRoutes.APPROVED_BANNER} render={e => <BannerGrantedList/>}/>
      <Route exact path={OfficeRoutes.REJECTED_BANNER} render={e => <BannerRejectedList/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_BANNER} render={e => <BannerCancelledList/>}/>

      {/*Shop Licensing*/}
      <Route exact path={OfficeRoutes.UNPAID_SHOPLICENSE} render={e => <ShopUnpaidList/>}/>
      <Route exact path={OfficeRoutes.NEW_SHOPLICENSE} render={e => <ShopNewList/>}/>
      <Route exact path={OfficeRoutes.UNDER_PROCESS_SHOPLICENSE} render={e => <UnderProcessShopLicense/>}/>
      <Route exact path={OfficeRoutes.APPROVED_SHOPLICENSE} render={e => <ApprovedShopLicense/>}/>
      <Route exact path={OfficeRoutes.REJECTED_SHOPLICENSE} render={e => <RejectedShopLicense/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_SHOPLICENSE} render={e => <ShopCancelledList/>}/>

      {/*hotel Licensing*/}
      <Route exact path={OfficeRoutes.NEW_HOTELLICENSE} render={e => <HotelNewList/>}/>
      <Route exact path={OfficeRoutes.UNDER_PROCESS_HOTELLICENSE} render={e => <HotelUnderProcessList/>}/>
      <Route exact path={OfficeRoutes.APPROVED_HOTELLICENSE} render={e => <HotelApprovedList/>}/>
      <Route exact path={OfficeRoutes.REJECTED_HOTELLICENSE} render={e => <HotelRejectedList/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_HOTELLICENSE} render={e => <HotelCancelledList/>}/>

      {/*Admin*/}
      <Route exact path={OfficeRoutes.TRADE_LIST} render={e => <TradeList/>}/>
      <Route exact path={OfficeRoutes.STAFF_REGISTRATION} render={e => <StaffRegistration/>}/>
      <Route exact path={OfficeRoutes.STAFF_LIST} render={e => <StaffList/>}/>
      <Route exact path={OfficeRoutes.RATE_LIST} render={e => <AdvertisementRateView/>}/>
      <Route exact path={OfficeRoutes.FILE_HEAD} render={e => <FileHeadTemplates/>}/>

      {/*site verification*/}
      <Route exact path={OfficeRoutes.SITE_VERIFICATION + "/:module/edit"}
             render={e => <EditSiteVerificationTemplate/>}/>
      <Route exact path={OfficeRoutes.SITE_VERIFICATION_LIST} render={e => <SiteVerificationFormList/>}/>
      <Route exact path={OfficeRoutes.SITE_VERIFICATION} render={e => <FormBuilderContainer/>}/>

        {/*template*/}
      {/*<Route exact path={OfficeRoutes.PERMIT_TEMPLATE} render={e => <PermitTemplates/>}/>*/}
      <Route exact path={OfficeRoutes.LICENSE_TEMPLATE} render={e => <LicenseTemplate/>}/>
      <Route exact path={OfficeRoutes.REJECTED_TEMPLATE} render={e => <RejectTemplate/>}/>
      <Route exact path={OfficeRoutes.CANCELLED_TEMPLATE} render={e => <CancelTemplate/>}/>

        {/*Challan*/}
      <Route exact path={OfficeRoutes.CHALLAN_LIST} render={e => <ChallanContainer/>}/>

      <Route path={OfficeRoutes.SETTING} component={Settings}/>
    </>
  );
};

export default withRouter(routes);
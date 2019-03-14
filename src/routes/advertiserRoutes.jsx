// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import Dashboard from "../views/advertiser/Dashboard";
import { OfficeRoutes } from "../config/routes-constant/OfficeRoutes";
import KioskLists from "../views/advertiser/kiosk/lists/KioskLists";
import HoardingList from "../views/advertiser/hoarding/HoardingList";


var dashRoutes = [
  {
    path: OfficeRoutes.ADVERTISER_DASHBOARD,
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: OfficeRoutes.ADVERTISER_HOARDING,
    name: "Hoarding",
    icon: VerifiedUser,
    component: HoardingList
  }, {
    path: OfficeRoutes.ADVERTISER_KIOSK,
    name: "Kiosk",
    icon: VerifiedUser,
    component: KioskLists
  },

  // {
  //   collapse: true,
  //   path: "/admin/shopping-license",
  //   name: "Shopping License",
  //   state: "openShopping",
  //   icon: VerifiedUser,
  //   views: [
  //     {
  //       path: "/admin/shopping-license/online",
  //       name: "Shopping License",
  //       mini: "LC",
  //       component: LicenseContainer
  //     },
  //     {
  //       path: "/admin/hoarding-license/online",
  //       name: "Hoarding License",
  //       mini: "CR",
  //       component: HaordingLicenseContainer
  //     }
  //   ]
  // },
  // {
  //   path: "/admin/hoarding-applications",
  //   name: "Advertisement",
  //   icon: DashboardIcon,
  //   component: HoardingContainers
  // },
  // {
  //   collapse: true,
  //   path: "/hoarding-pps",
  //   name: "Shopping License",
  //   state: "openShopping",
  //   icon: VerifiedUser,
  //   views: [
  //     {
  //       path: "/shopping-license/online",
  //       name: "Shopping License",
  //       mini: "LC",
  //       component: LicenseContainer
  //     },
  //     {
  //       path: "/hoarding-license/online",
  //       name: "Hoarding License",
  //       mini: "CR",
  //       component: HaordingLicenseContainer
  //     },

  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "-page",
  //   name: "Pages",
  //   state: "openPages",
  //   icon: Image,
  //   views: pages
  // },
  // {
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: Apps,
  //   views: [
  //     {
  //       path: "/components/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons
  //     },
  //     {
  //       path: "/components/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem
  //     },
  //     {
  //       path: "/components/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels
  //     },
  //     {
  //       path: "/components/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert
  //     },
  //     {
  //       path: "/components/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications
  //     },
  //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
  //     {
  //       path: "/components/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: "content_paste",
  //   views: [
  //     {
  //       path: "/forms/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms
  //     },
  //     {
  //       path: "/forms/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms
  //     },
  //     {
  //       path: "/forms/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms
  //     },
  //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: GridOn,
  //   views: [
  //     {
  //       path: "/tables/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables
  //     },
  //     {
  //       path: "/tables/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables
  //     },
  //     {
  //       path: "/tables/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: Place,
  //   views: [
  //     {
  //       path: "/maps/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps
  //     },
  //     {
  //       path: "/maps/full-screen-maps",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap
  //     },
  //     {
  //       path: "/maps/vector-maps",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap
  //     }
  //   ]
  // },
  // { path: "/widgets", name: "Widgets", icon: WidgetsIcon, component: Widgets },
  // { path: "/charts", name: "Charts", icon: Timeline, component: Charts },
  // { path: "/calendar", name: "Calendar", icon: DateRange, component: Calendar },
  { redirect: true, path: "/advertiser", pathTo: OfficeRoutes.ADVERTISER_DASHBOARD, name: "Dashboard" }
];
export default dashRoutes;

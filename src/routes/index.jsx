import LandingPage from "../layouts/LayoutLanding";
import OfficeDashboard from "../layouts/LayoutOffice";
import AdvertiserDashboard from "../layouts/LayoutAdvertiser";

var indexRoutes = [
    {path: '/dashboard/advertiser', name: 'Advertiser Dashboard', component: AdvertiserDashboard},
    {path: '/e-office', name: 'e-Office Dashboard', component: OfficeDashboard},
    {path: '/', name: 'e-Office Landing', component: LandingPage},
];

export default indexRoutes;

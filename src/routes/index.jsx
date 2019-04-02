import LandingPage from "../layouts/LandingPage";
import OfficeDashboard from "../layouts/OfficeDashboard";
import AdvertiserDashboard from "../layouts/AdvertiserDashboard";

var indexRoutes = [
    {path: '/dashboard/advertiser', name: 'Advertiser Dashboard', component: AdvertiserDashboard},
    {path: '/e-office', name: 'e-Office Dashboard', component: OfficeDashboard},
    {path: '/', name: 'e-Office Landing', component: LandingPage},
];

export default indexRoutes;

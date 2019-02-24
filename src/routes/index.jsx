import LandingPage from "../layouts/LandingPage";
import OfficeDashboard from "../layouts/OfficeDashboard";

var indexRoutes = [
  {path: '/e-office', name: 'e-Office Dashboard', component: OfficeDashboard },
  {path: '/', name: 'e-Office', component: LandingPage },
];

export default indexRoutes;

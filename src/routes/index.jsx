import LandingPage from "../layouts/LandingPage";
import OfficeDashboard from "../layouts/OfficeDashboard";

var indexRoutes = [
  {path: '/e-office', name:'E-office', component:OfficeDashboard },
  {path: '/', name:'LandingPage', component:LandingPage},
];

export default indexRoutes;

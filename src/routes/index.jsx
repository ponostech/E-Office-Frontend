import LandingPage from "../layouts/LandingPage";
import OfficeDashboard from "../layouts/OfficeDashboard";

var indexRoutes = [
  {path: '/e-office', name:'e-Office', component: OfficeDashboard },
  {path: '/', name:'AMC - e-Office', component: LandingPage },
];

export default indexRoutes;

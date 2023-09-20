import config from "../config";

import HomePage from "../pages/Home";
import AccPage from "../pages/Account";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import MoviePage from "../pages/Movie";
import TvPage from "../pages/Tv";
import PeoplePage from "../pages/People";
import SearchPage from "../pages/Search";
import DetailsPage from "../pages/Details";
import PlayerPage from "../pages/Player";
import GenrePage from "../pages/Genre";

const PublicRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.login, component: LoginPage, layout: "notFooter" },
  { path: config.routes.signup, component: SignupPage, layout: "notFooter" },
  { path: config.routes.account, component: AccPage, layout: "notFooter" },
  { path: config.routes.movie, component: MoviePage },
  { path: config.routes.tv, component: TvPage },
  { path: config.routes.person, component: PeoplePage },
  { path: config.routes.search, component: SearchPage },
  { path: config.routes.details, component: DetailsPage },
  { path: config.routes.player, component: PlayerPage },
  { path: config.routes.genre, component: GenrePage },
];

export { PublicRoutes };
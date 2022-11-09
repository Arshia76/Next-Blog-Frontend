import LOADER from './Gif/Loader.gif';

import SEARCH_IMG from './Images/search.png';
import LOGO_IMG from './Images/logo.png';

import SEARCH_SVG from './Svg/search.svg';

class Resource {
  static Images = {
    SEARCH_IMG,
    LOGO_IMG,
  };

  static Gif = {
    LOADER,
  };

  static Svg = {
    SEARCH_SVG,
  };

  static Routes = {
    HOME: '/',
    ABOUT: '/about',
    PROFILE: '/profile',
    BLOG: '/blog',
    AUTH: '/auth',
  };
}

export default Resource;

import {DrawerNavigator} from 'react-navigation';
import SideBar from './sidebar';
import Likes from './likes';
import Home from './home';

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    Likes: { screen: Likes },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: SideBar
  }
);

export default DrawerExample;

import React from 'react';
import { ImageBackground, Image } from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
} from 'native-base';
import styles from './style';
const drawerCover = require('../../img/drawer-cover.png');
const drawerImage = require('../../img/sidebar-sh.png');
const router = [
  {
    name: 'Today Featured',
    route: 'Home',
    icon: 'md-swap',
  },
  {
    name: 'My Likes',
    route: 'Likes',
    icon: 'md-heart-outline',
  }
];

const SideBar = ({navigation}) => (
  <Container>
    <Content
      bounces={false}
      style={{flex: 1, backgroundColor: '#fff', top: -1}}
    >
      <ImageBackground source={drawerCover} style={styles.drawerCover}>
        <Image square style={styles.drawerImage} source={drawerImage} />
      </ImageBackground>
      <List
        dataArray={router}
        renderRow={router =>
          <ListItem
            button
            noBorder
            onPress={() => navigation.navigate(router.route)}
          >
            <Left>
              <Icon
                active
                name={router.icon}
                style={{color: '#777', fontSize: 26, width: 30}}
              />
              <Text style={styles.text}>{router.name}</Text>
            </Left>
          </ListItem>}
      />

    </Content>
  </Container>
);

export default SideBar;

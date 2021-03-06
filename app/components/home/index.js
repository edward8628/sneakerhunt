// import Expo from 'expo';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import Page from '../page';
import Swiper from './swiper';
import config from '../../config';
import { getItems } from '../../server';

class Home extends React.Component {
  state = {
    loading: true,
    posts: [],
    itemNumberCurrent: 0,
    itemNumberTotal: 0
  };
  session = null;
  liked = null;

  saveSession = () => {
    AsyncStorage.setItem('session', JSON.stringify(this.session));
  }

  resetSession = (date) => {
    this.session = {
      date: date,
      swiped: [] // not implemented with shift because the order & the number of posts could change
    }

    this.saveSession()
  }

  //todo, loading new image is slow
  async componentDidMount() {
    try {
      const posts = await getItems()//fetch(config.LATEST_ENDPOINT);
      const session = await AsyncStorage.getItem('session');
      const liked = await AsyncStorage.getItem('liked');

      if (!posts || posts.length === 0) {
        throw new Error('No posts');
      }

      if (session === null) {
        this.resetSession(posts[0].date);
      } else {
        this.session = JSON.parse(session);

        if (this.session.date !== posts[0].date) { // new day => new session
          this.resetSession(posts[0].date);
        }
      }

      if (liked === null) {
        this.liked = {news: [], archived: []};
      } else {
        this.liked = JSON.parse(liked);
      }

      // Expo.Amplitude.logEventWithProperties('Swiper.Load', {
      //   itemNumberCurrent: this.session.swiped.length + 1,
      //   itemNumberTotal: posts.length
      // });

      this.setState({
        posts: posts.filter(p => this.session.swiped.indexOf(p.id) === -1),
        loading: false,
        itemNumberCurrent: this.session.swiped.length + 1,
        itemNumberTotal: posts.length
      });

    } catch(error) {
      Toast.show({
        text: 'Verify your internet connection and retry',
        position: 'bottom',
        buttonText: 'OKAY'
      })
    }
  }

  onSwipe = (o) => {
    this.session.swiped.push(o.id);
    this.saveSession();

    if (this.state.posts.indexOf(o) === this.state.posts.length - 1) {
      this.setState({posts: []});
    } else {
      this.setState({itemNumberCurrent: this.state.itemNumberCurrent + 1});
    }
  }

  onSwipeLeft = (o) => {
    // Expo.Amplitude.logEventWithProperties('Swiper.Swipe', {
    //   direction: 'left',
    //   productId: o.id
    // });
    this.onSwipe(o);
  }

  onSwipeRight = (o) => {
    // Expo.Amplitude.logEventWithProperties('Swiper.Swipe', {
    //   direction: 'right',
    //   productId: o.id
    // });
    this.onSwipe(o);
    this.liked.news.push(o);
    AsyncStorage.setItem('liked', JSON.stringify(this.liked));
  }

  renderSwiper() {
    const nextDay = (new Date(`${this.session.date}T07:15:00Z`)).getTime() + 24 * 60 * 60 * 1000;

    return (
      <Swiper
        itemNumberCurrent={this.state.itemNumberCurrent}
        itemNumberTotal={this.state.itemNumberTotal}
        items={this.state.posts}
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
        nextTime={nextDay}
        onPressLikes={() => {
          // Expo.Amplitude.logEvent('Swiper.LikePress');
          this.props.navigation.navigate('Likes');
        }}
        onTimeout={() => {
          /* TODO reload */
          // Expo.Amplitude.logEvent('Swiper.Tiemout');
        }}
        />
    );
  }

  render() {
    return (
      <Page title="Today Featured" navigation={this.props.navigation} loading={this.state.loading}>
        {this.state.loading ? null : this.renderSwiper()}
      </Page>
    );

  }
}

export default Home;

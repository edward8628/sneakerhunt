/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import App from './app/components/App';

type Props = {};
export default class Shape extends Component<Props> {
  render() {
    return (
      <App />
    );
  }
}

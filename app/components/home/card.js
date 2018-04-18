import React from 'react';
import { Image } from 'react-native';
import Thumb from '../Thumb';
import {
  Badge,
  Card,
  CardItem,
  Text,
  Left,
  Body
} from 'native-base';

const ProductCard = ({
  name,
  image,
  thumbnail,
  topics=[]
}) => (
  <Card style={{elevation: 3}}>
    <CardItem>
      <Left>
        <Thumb uri={thumbnail}/>
        <Body>
          <Text>{name}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem cardBody style={{margin: 0}}>
      <Image
        style={{
          resizeMode: 'contain',
          width: null,
          flex: 1,
          height: 250
        }}
        source={{uri: image}}
      />
    </CardItem>
    <CardItem style={{flexWrap: 'wrap'}}>
      {topics.map(({name, id}) => (
        <Badge key={id} style={{
            backgroundColor: '#f8f8f8',
            marginRight: 5,
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#e8e8e8'}}>
          <Text style={{color: '#999'}}>{name.toUpperCase()}</Text>
        </Badge>
      ))}
    </CardItem>
  </Card>
);

export default ProductCard;

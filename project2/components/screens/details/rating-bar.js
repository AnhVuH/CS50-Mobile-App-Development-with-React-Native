import React from 'react';
import {Text,ScrollView,Image,View} from 'react-native';
import RatingBar from './rating-bar'



export default class DetailsScreen extends React.Component{
  render(){
    const movie = this.props.navigation.getParam('movie');
    return(
      <ScrollView>
        <Image
          style = {{width:200, height:200}}
          source ={{uri: movie.Poster}}
        />
        <Text>{movie.Title} -{movie.Runtime}</Text>
        <Text>Rated:{movie.Rated}</Text>
        <Text>Actors:{movie.Actors}</Text>
        <Text>{movie.Plot}</Text>
        <RatingBar ratings ={movie.Ratings}/>
      </ScrollView>
    );
  }
}

import React from 'react';
import {Text,ScrollView,Image,StyleSheet,View} from 'react-native';
import createRateBar from './rating-bar'



export default class DetailsScreen extends React.Component{
  render(){
    // console.log(this.props.navigation.getParam('movie'))
    const movie = this.props.navigation.getParam('movie');
    const imdb = createRateBar(movie.Ratings[0].Value);
    const tomatoes = createRateBar(movie.Ratings[1].Value);

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

        <Text>Internet Movie Database(imdb):{movie.Ratings[0].Value}</Text>
        <View style={styles.bar}>
          <View style ={imdb.rateBar}></View>
          <View style ={styles.blank}></View>
        </View>

        <Text>Rotten Tomatoes:{movie.Ratings[1].Value}</Text>
        <View style={styles.bar}>
          <View style ={tomatoes.rateBar}></View>
          <View style ={styles.blank}></View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create(
  {
    bar:{
      flex:1,
      flexDirection: 'row',
      height:20,
      },
    blank:{backgroundColor:'white'}
  }
);

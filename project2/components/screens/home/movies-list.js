import React from 'react';
import{FlatList,Text,Image,TouchableOpacity,View,StyleSheet} from 'react-native';
import {getDetails} from '../../api/getDetails'

export default class MoviesList extends React.Component{
  handlePress(id){
    getDetails(id)
    .then(responseJSON=>{

      this.props.navigation.navigate('Details',{movie: responseJSON})
    })  ;
  }

  _renderItem =
        ({item})=>{ // destructuring item of each component in List
          // console.log(item)
            return(
              <TouchableOpacity onPress ={()=>this.handlePress(item.key)}>
                <View style ={styles.movie}>
                  <Image
                    style={{ width:100, height:100 }}
                    source ={{ uri:item.movie.Poster }}
                  />
                  <View style = {styles.title}>
                      <Text>{item.movie.Title}</Text>
                      <Text>({item.movie.Type})</Text>
                      <Text>{item.movie.Year}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );

        }

  render(){
    // console.log(this.props.movies)
    if(this.props.movies.length>0)
      return(
            <FlatList
            // data ={this.props.movies}
            //add key for each component
              data ={this.props.movies.map(movie=>({movie, key:movie.imdbID}))}

              renderItem = {this._renderItem}
            />
      );
    else
      return <Text> No Result </Text>
  }
}
const styles = StyleSheet.create(
  {
    movie:{
      flex: 1,
      flexDirection: 'row',
      margin: 5
    },
    title:{
      flex:1,
      margin:15
    }
  }
);

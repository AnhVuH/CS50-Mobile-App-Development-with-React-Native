import React from 'react';
import {Text, View,TextInput,StyleSheet} from 'react-native';
import MoviesList from './movies-list'
import {getMoviesFromAPI} from '../../api/getMovies'


export default class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      text:'place holder',
      movies:[]
    }
  }

  componentDidUpdate(prevProps,prevStates){
    if(this.state.text != prevStates.text){
      this.getMovies();
    }
  }
  getMovies= ()=> {
    getMoviesFromAPI(this.state.text)
    .then(movies=>this.setState({movies:movies}))
  }


  render(){
    return  (
      <View style ={styles.container}>
        <Text style= {styles.title}>Home</Text>
        <View style = {styles.inputBorder}><TextInput onChangeText ={(text)=>this.setState({text})}/></View>
        <MoviesList movies ={this.state.movies} navigation ={this.props.navigation}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  title:{
    fontSize:30,
  },
  inputBorder:{
    height:30,
    borderWidth:2,
    borderColor: '#00b300',
    borderRadius:5,
  },

})

import React from 'react';
import {Text, View,TextInput,StyleSheet} from 'react-native';
import MoviesList from './movies-list'


export default class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      text:'placer holder',
      movies:[]
    }
    this.getMovieFromAPI = this.getMovieFromAPI.bind(this);
  }

  componentDidUpdate(prevProps,prevStates){
    if(this.state.text != prevStates.text){
      this.getMovieFromAPI(this.state.text);
    }
  }

  getMovieFromAPI(text){
    console.log('fetching');
    return fetch(`http://www.omdbapi.com/?s=${text}&apikey=62fcdfc3`)
          .then((response)=>{
            // console.log(typeof response._bodyInit);
            let bodyInit = JSON.parse(response._bodyInit);
            //  console.log(bodyInit);
            if(bodyInit.Response!="False")
              return fetch(response.url)
          })
          .then((responseJson)=>{
              if(responseJson){
                let moviesList = JSON.parse(responseJson._bodyInit).Search
              // console.log(moviesList)
                this.setState({movies:moviesList})
              }
              else{
                this.setState({movies:[]})
              }
          })
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

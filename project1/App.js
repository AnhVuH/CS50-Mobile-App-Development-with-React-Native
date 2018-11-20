import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Expo from 'expo';
import PropTypes from 'prop-types';
import Vibration from './utils/vibrate.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Clock />
      </View>
    );
  }
}

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        workTime: {mins:25, secs:0},
        breakTime:{mins:5, secs:0},

        workState:true,
        running :true,
        currentTime:25*60,
    }
  this.countDown = this.countDown.bind(this);
  this.handleRunning = this.handleRunning.bind(this);
  this.handleReset = this.handleReset.bind(this);
  this.handleSetTime = this.handleSetTime.bind(this);

  }
  componentDidMount(){
    setInterval(this.countDown,1000);
  }

  countDown(){
   this.setState(prevState=>{
     if(prevState.currentTime >1 && this.state.running)
        return {currentTime: prevState.currentTime-1} ;
      else if(this.state.running){
        if(prevState.workState){
          // console.log(this.state.workTime)
          Vibration()
          return {workState: false, currentTime: prevState.breakTime.mins*60 + prevState.breakTime.secs};
        }
        else{
          // console.log(this.state.breakTime)
          Vibration()
          return {workState: true, currentTime: prevState.workTime.mins*60 +prevState.workTime.secs};
        }
      }
     });
  }

  handleRunning(){
    this.setState({running: !this.state.running})
  }

  handleReset(){
    this.setState({
      running:false,
      currentTime: this.state.workState ? this.state.workTime.mins*60 + this.state.workTime.secs : this.state.breakTime.mins*60 + this.state.breakTime.secs
    })
  }
  handleSetTime(nameState,timeInput){
    // console.log(parseInt(timeInput/60));
    if(nameState==="Work Time"){
      this.setState(
        ()=>{
          if(this.state.workState)
            return {running: false, workTime:{mins:parseInt(timeInput/60), secs: timeInput%60}, currentTime: timeInput}
          else
            return {workTime:{mins:parseInt(timeInput/60), secs: timeInput%60}}
          }
        );
    }
    else if(nameState==="Break Time"){
      this.setState(
        () =>{
          if(!this.state.workState)
            return { running: false, breakTime:{mins:parseInt(timeInput/60), secs: timeInput%60},currentTime: timeInput}
          else
            return {breakTime:{mins:parseInt(timeInput/60), secs: timeInput%60}}
          }
        );
    }
  }

  render(){
    return (
      <View style = {styles.clock}>
      <Text style ={styles.status}>{this.state.workState ? "Work Timer": "Break Timer"}</Text>
      <Display time = {this.state.currentTime}/>
      <View style = {styles.buttonGroup}>
      <StartPauseButton runState ={this.state.running} onChangeRunState={this.handleRunning}/>
      <ResetButton runState ={this.state.running} onReset={this.handleReset}/>
      </View>
      <InputTime name ="Work Time" time ={this.state.workTime} onSetTime= {this.handleSetTime}/>
      <InputTime name = "Break Time" time ={this.state.breakTime}  onSetTime= {this.handleSetTime}/>
      </View>
    );
  }
}

class Display extends React.Component{
  render(){
    return(
      <Text style ={styles.display}>{parseInt(this.props.time / 60)} : {this.props.time % 60 > 9 ? this.props.time % 60: "0"+ this.props.time % 60}</Text>
    );
  }
}

class StartPauseButton extends React.Component{
  render(){
    return(<Button title = {this.props.runState ? "Pause" : "Start"} onPress ={this.props.onChangeRunState}/>);

  }
}
class ResetButton extends React.Component{
  render(){
    return(
      <Button title= "Reset" onPress={this.props.onReset}/>
    );
  }
}

class InputTime extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mins: this.props.time.mins,
      secs: this.props.time.secs
    }
    this.setMins = this.setMins.bind(this);
    this.setSecs = this.setSecs.bind(this);
  }

  setMins(mins){
    this.setState(
      ()=>{
        if(mins.length>0 && !isNaN(parseInt(mins)))
          return {mins: parseInt(mins)};

        else
          return {mins:0};
        }
      );
  }

  setSecs(secs){
    this.setState(
      () =>{
        // console.log(secs.length)
        if(secs.length>0 && !isNaN(parseInt(secs)))
          return {secs: parseInt(secs)};
        else
        return {secs:0};
      }

    );
  }


  componentDidUpdate(prevProps,prevStates){
    if(this.state != prevStates)
      this.props.onSetTime(this.props.name, this.state.mins*60 + this.state.secs);
  }
  render(){
    return(
      <View style = {styles.input}>
      <Text>{this.props.name}                          </Text>
      <Text>Mins:   </Text>
      <TextInput onChangeText ={(text)=>this.setMins(text)} >{this.props.time.mins}</TextInput>
      <Text>Secs:   </Text>
      <TextInput onChangeText = {(text)=>this.setSecs(text)}> {this.props.time.secs}</TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  clock:{
    alignSelf: "stretch",
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  status:{
    flex:1,
    alignSelf: 'stretch',
    paddingTop: 50,
    fontSize: 40,
    textAlign:'center',
    backgroundColor:'blue'
  },
  display:{
    flex: 1,
    fontSize:40,
    alignSelf: 'stretch',
    textAlign: "center",
    backgroundColor:"yellow",
  },
  buttonGroup:{
    flex:1,
    flexDirection:'row',
    alignSelf: 'stretch',
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"green"
  },
  input:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }

});
// Expo.registerRootComponent(App) Prior to SDK 18, it was necessary to use registerRootComponent directly, but for projects created as of SDK 18 or later, this is handled automatically in the Expo SDK

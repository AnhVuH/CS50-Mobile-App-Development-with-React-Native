import {StyleSheet} from 'react-native'

const createRateBar =(valueString)=>{
    let value = parseFloat(valueString)
    if(value <10) value = value*10
    console.log(value)
    if(value >=80)
      return(
        StyleSheet.create({
          rateBar:{
            height:20,
            flexBasis: String(value)+"%",
            backgroundColor: 'green'
          }
        })
      );
    else if (value >=50 && value <80)
      return(
          StyleSheet.create({
            rateBar:{
              height:20,
              flexBasis: String(value)+"%",
              backgroundColor: 'yellow'
            }
          })
        );
    else if (value<50)
      return(
          StyleSheet.create({
            rateBar:{
              height:20,
              flexBasis: String(value)+"%",
              backgroundColor: 'red'
            }
          })
        );
  }

export default createRateBar;

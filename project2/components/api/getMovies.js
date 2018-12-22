export const getMoviesFromAPI = async (text)=> {
   // console.log('fetching');
   const response = await fetch(`http://www.omdbapi.com/?s=${text}&apikey=62fcdfc3`);
   const responseBody =  await ((data) => {
           let bodyInit = JSON.parse(data._bodyInit);
           //  console.log(bodyInit);
           if(bodyInit.Response!="False"){
             // console.log(typeof bodyInit)
             return bodyInit
           }
         })(response)

   const result = await ((bodyData)=>{
             //  console.log(bodyData)
             if(bodyData){
               let moviesList = bodyData.Search
               // console.log(moviesList)
               return moviesList
             }
             else{
               return []
             }
         })(responseBody)
   // console.log(result)
   return result
 }

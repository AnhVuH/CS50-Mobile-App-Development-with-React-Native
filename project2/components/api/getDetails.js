export const  getDetails = (id)=>{
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=62fcdfc3`)
    .then(response=>{
      return JSON.parse(response._bodyInit)
    })
  }

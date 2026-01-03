const fs = require("fs")



const handleGet = (req,res) => {


// url den id degerini al
const id= req.url.split("/")[2]

//get-all istegi atılırsa
   if(req.url === "/movies"){
// json dosyasında içeriye eriş

const movies = fs.readFileSync("./data/movies.json","utf-8")

      return res.end(movies)
   }

   // get-one istegi atılırsa
   if(id){
      // json dosyasındaki içerige eriş ve javascript formatına çevir

   const movies = JSON.parse(fs.readFileSync("./data/movies.json","utf-8"))

   const movie = movies.find((movie)=> movie.id === id)

   // film bulunmadıysa hata döndür 
   if(!movie){
      res.writeHead(404)
      return res.end(
         JSON.stringify({
            success:false,
            message:"Aradıgınız film bulunamadı"
         })
      )
   }

   // url parametre olarak eklenen id film bul
      return res.end(JSON.stringify(movie))
   }

   

}

module.exports= handleGet
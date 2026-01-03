const bodyParser = require("../utils/body-parser")
const validateData = require("../utils/validate-data")
const fs = require("fs")

const handlePut =async(req,res) => {
    // url id parametresi
    const id= req.url.split("/")[2]
    // istegi body bölümünde etriş
    const body = await bodyParser(req)
// body kısmındak veride eksik bir alan var mı kontrol et
    validateData(body,res)
    // json dosyasındaki içerigi al
    const movies = JSON.parse(fs.readFileSync("./data/movies.json","utf-8"))
    // gülcellenecek eleman dizisindeki sırası bul

    const index = movies.findInex((movie)=>movie.id===id)

    // dizisindeki ilgili elemanı bul

    movies[index] = {
        ...body,
        id,
    }

    //json dosyasını güncelle

    fs.writeFileSync("./data/movies.json",JSON.stringify(movies),"utf-8")


    return res.end(JSON.stringify(movies[index]))

}

module.exports= handlePut
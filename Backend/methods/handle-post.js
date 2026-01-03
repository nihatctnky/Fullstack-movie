
const bodyParser=require("../utils/body-parser")

const validateData=require("../utils/validate-data")
const crypto = require("crypto")
const fs = require("fs")

// client body bekledigiiz alanlar

const keys = ["title", "year", "genre", "rating","description","duration","cast","language","director"]

const handlePost = async(req,res) => {
    // istegin body bölümünden gelen içerige erişmeni saglayacak fonksiyon
const body =await bodyParser(req)
// client gelen veridogru formatta mı kontrol et

validateData(body,res)

// kaydedicegimiz veriye id ekle
body.id = crypto.randomUUID()

// json dosyasına içerigi al
let data = JSON.parse(fs.readFileSync("./data/movies.json","utf-8"))

// yeni film diziye ekle
 data.push(body)
// json dosyasını güncelle 
fs.writeFileSync("./data/movies.json",JSON.stringify(data),"utf-8")

// client cevap gönder
res.writeHead(201)
return res.end(JSON.stringify(body))


}

module.exports= handlePost
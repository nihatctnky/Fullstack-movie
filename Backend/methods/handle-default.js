

const handleDefault = (req,res) => {

    // Yanıtın durum kodu belirleme
    res.statusCode=404
//yanıtın içerigini belirleme
res.write(
    JSON.stringify({
        succes:false,
        message:"İstek attığınız enpoint mevcut degil.."
    })
)
// client yanıtı gönder 
return res.end()

}

module.exports= handleDefault
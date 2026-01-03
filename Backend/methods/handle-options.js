

const handleOptions = (req,res) => {
    // hangi isteklere izin verdigimizi söyleyelim

res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")


// BODY sahip isteklerde hangi formatta veri gönderilrecegi belirleyen  header izin ver

res.setHeader("Access-Control-Allow-Headers", "Content-Type")


res.end()
}



module.exports=handleOptions
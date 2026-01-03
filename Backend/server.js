const http = require("http")
const handleGet = require("./methods/handle-get")
const handlePost = require("./methods/handle-post")
const handlePut = require("./methods/handle-put")
const handleDelete = require("./methods/handle-delete")
const handleDefault = require("./methods/handle-default")
const handleOptions = require("./methods/handle-options")


const server = http.createServer((req,res)=>{

// istk movies adresine atılmadıysa 404 döndür

const path = req.url.slice(0, req.url.lastIndexOf("/"))
if(!req.url.includes("/movies"))return handleDefault(req,res)

// cors hatalarını engellemek için gerekli header
res.setHeader("Access-Control-Allow-Origin","http://localhost:5173")
  switch(req.method){

    case "GET":
    return handleGet(req,res)

    case "POST":
        return handlePost(req,res)

        case "PUT":
            return handlePut(req,res)

            case "DELETE":
                return handleDelete(req,res)

                case "OPTIONS":
                return handleOptions(req,res)

            default :
            return handleDefault(req,res)
  }
})

const PORT=4000
server.listen(PORT,()=>{
    console.log(`Sunucu ${4000} portu dinlemeye başladı`)
})
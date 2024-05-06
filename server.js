const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer({ dest: __dirname+"/uploads" })
const fs = require('fs')

app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send(`hii vasu `)
})

app.post('/uploadFile',upload.single('myFile'),(req,res) => {
    const username = req.body.username;
    const userFolder = __dirname+"/uploads/"+username
    if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder)
    }
    fs.rename(__dirname+"/uploads/"+req.file.filename,userFolder+"/"+req.file.originalname,function(a){
        console.log(a)
    })

    res.send(`please wait`)
})

const PORT = 3600

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})

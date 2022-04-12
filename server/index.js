const express = require('express')
const app = express()
const port = 9000
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
var cors = require('cors')

const dree = require('dree')

const options = {
    followLinks: true,
    depth: 5
};

const current   = "./data/current/" 
const projects  = "./data/projects";
const templates = "./data/templates";
const uikits    = "./data/uikits";
const build     = "/app/sveltekit/src/lib/pages";
const local     = "./data";
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cors())


// return templates 
// app.get ( '/templates' , ( req , res ) => {
//     const tree = dree.scan ( path.resolve ( templates) )
//     const files = dree.parseTree ( tree , options )
//     res.json ( tree )
// })


app.get('/' , ( req, res ) => {
    const rawdata = require( path.resolve ( current ) + '/config.json' )
    res.json ( rawdata )
})

app.get ( '/tree/:name' , ( req , res ) => {
    const tree = dree.scan ( path.resolve ( local ) + '/' + req.params.name )
    res.json ( tree )
})


//return data folders
// app.get('/folders', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( local ) )
//     res.json ( files )
// })

// app.get('/folders/:name', (req, res) => {
//     let searchPath = req.params.name 
//     req.query.folder ? searchPath += '/' + req.query.folder : null
//     const files = fs.readdirSync ( path.resolve ( local ) + '/' + searchPath )
//     res.json ( files )
// })



// app.get('/file/:folder/:name' , ( req , res ) => {
//     const rawdata = fs.readFileSync ( path.resolve ( local ) + '/' + req.params.folder + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })

app.get('/file' , ( req , res ) => {
    if ( req.query.path ){
        const rawdata = fs.readFileSync ( path.resolve ( req.query.path ) )
        res.json ( JSON.parse(rawdata) )
    } else {
        res.json ( {} )
    }
})


app.get('/folder' , ( req , res ) => {
    if ( req.query.path ){
        res.json ( { path: req.query.path } )
    } else {
        res.json ( {} )
    }
})




// app.get('/dir' , (req, res) => {
//     console.log ( req.params.path )
//     res.json ( {name:req.params.path} )
//     //let stream = fs.mkdirSync( path.resolve ( req.params.path ) )
//     //res.send ( req.body )
// })

// app.get('/projects', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( projects ) )
//     res.json ( files )
// })


// app.get('/projects/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( projects ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })

// app.get('/templates', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( templates ) )
//     console.log ( files )
//     res.json ( files )
// })

// app.get('/templates/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( templates ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })

// app.get('/uikits', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( uikits ) )
//     res.json ( files )
// })

// app.get('/uikits/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( uikits ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })




app.post('/template/:name' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( templates ) + '/' + req.params.name + '.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})


app.post('/project/:name' , (req, res) => {
    //let stream = fs.createWriteStream( path.resolve ( projects ) + '/' + req.params.name + '.json' )
    let stream = fs.createWriteStream( path.resolve ( req.params.path ) )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})

app.post('/uikit/:name' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( uikits ) + '/' + req.params.name + '.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})

app.post('/file/save' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( req.body.path ) )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})



app.listen(port,'0.0.0.0',(err)=>{
    if ( err ){
        console.log ( err )
    } else {
        console.log("server is listening on port " , port );
    }
})
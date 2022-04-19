const express = require('express')
const app = express()
const port = 9000
const fs = require('fs-extra')
const path = require('path')
const bodyParser = require("body-parser");
const dree = require('dree')
var cors = require('cors')
require('dotenv').config()


const options = {
    followLinks: true,
    depth: 5
};

const DATA_PATH = process.env.VITE_APP_DATA_PATH
const current   = `${DATA_PATH}/current` //"./server/data/current/" 
const projects  = `${DATA_PATH}/projects` //"./server/data/projects";
const templates = `${DATA_PATH}/templates` //"./server/data/templates";
const uikits    = `${DATA_PATH}/uikits` //"./server/data/uikits";
const static    = process.env.VITE_APP_PAGES;
const local     = `${DATA_PATH}` ///"./server/data";

const paths = {
    current: current,
    projects: projects,
    templates: templates,
    uikits: uikits,
    static: static,
    pages: static,
    local: local
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cors())

// get filesystem structure 
// @name : paths
app.get ( '/tree/:name' , ( req , res ) => {
    let dirToScan = paths[req.params.name]
    const tree = dree.scan ( path.resolve ( dirToScan ) )
    res.json ( tree )
})

// load file
// @req.query.path : full file path
app.get('/file' , ( req , res ) => {
    if ( req.query.path && path.resolve ( req.query.path ) && fs.existsSync ( req.query.path ) ){
        const rawdata = fs.readFileSync ( path.resolve ( req.query.path ) )
        try {
            res.json ( JSON.parse(rawdata) )
        } catch ( err ){
            res.json ( { data: rawdata.toString() } )
        }
    } else {
        res.json ( {} )
    }
})

app.get('/' , ( req, res ) => {
    console.log ( req.ip )
    const rawdata = require( path.resolve ( current ) + '/config.json' )
    res.json ( rawdata )
})

//move file
//@req.query.source : file source full path
//@req.query.target : folder target full path
//@req.query.filename : filename
app.get ('/move' , ( req, res ) => {
    //if ( fs.statSync( req.query.target ).isDirectory() ){
    if ( fs.statSync( req.query.target ).isDirectory() && path.resolve ( req.query.source ) ){    
        try {
            fs.move ( path.resolve ( req.query.source ) , path.resolve ( req.query.target ) + '/' + req.query.filename )
            res.json ( { message: 'File moved' } )
        } catch (err){
            console.log ( 'move error ' , err )
            res.json ( { message: err } )
        }
    } else {
        res.json ( { message: 'Drag to a folder' } )
    }
})

//delete file
//@req.query.path : full path to delete
app.get ( '/delete' , ( req , res ) => {
    if ( path.resolve ( req.query.path ) ){
        fs.removeSync ( path.resolve ( req.query.path ) )
        res.json ( { message: 'Item deleted' } )
    }
})


//save template
//@req.params.name : template name
//@req.body : template content
app.post('/template/:name' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( templates ) + '/' + req.params.name + '.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})

// save file
// @body.path = file full path (required)
app.post('/file/save' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( req.body.path ) )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
        stream.end();
    });
    console.log ( 'save file => ' , req.body.path   )
    //res.send ( req.body )
    res.json ( { message: 'File saved' } )
})


app.post('/save/html' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( paths['static'] ) + '/' + req.body.slug + '.html' )
    stream.once('open', function(fd) {
        stream.write(req.body.html);
        stream.end();
    });
    res.send ( req.body )
})

// add folder to path root
// @body.path = file full path (required)
app.get('/folder/add' , (req, res) => {
    console.log ( req.query.context , req.query.name )
    let dir = paths[req.query.context] + '/' + req.query.name 
    console.log ( dir )

    if ( !fs.existsSync( path.resolve(dir) )){
        fs.mkdirSync(dir);
        res.json(true)
    }
    res.json(false)
})



//set the active project
// @body.data = json data (required)
app.post('/current' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( current ) + '/config.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
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
const express = require('express')
const app = express()
const port = 9000
const fs = require('fs-extra')
const path = require('path')
const bodyParser = require("body-parser");
const dree = require('dree')
const multer = require('multer')

console.log ( __dirname )
const { GraphQLClient , gql } = require ( 'graphql-request' );

var cors = require('cors')

require('dotenv').config()


const options = {
    followLinks: true,
    depth: 5
};
var destination

//any other path different from the protected root will be refused
const protectRoot = __dirname //process.env.VITE_APP_PROTECT_ROOT

const DATA_PATH = path.resolve() + '/.whoobe' //process.env.VITE_APP_DATA_PATH
const current   = `${DATA_PATH}/current`
const projects  = `${DATA_PATH}/projects`
const templates = `${DATA_PATH}/templates`
const uikits    = `${DATA_PATH}/uikits`
const assets    = `${path.resolve()}/pages/dist/assets`
const images    = `${path.resolve()}/pages/dist/assets/img`
const static    = `${path.resolve()}/pages/dist` //process.env.VITE_APP_PAGES;
const local     = `${DATA_PATH}`
const tmp       = `./.whoobe/tmp`
const config    = `${path.resolve()}/pages/whoobe.config.json`

const paths = {
    current: current,
    projects: projects,
    templates: templates,
    uikits: uikits,
    static: static,
    assets: assets,
    images: images,
    pages: static,
    local: local,
    config: config
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cors())

const ep = process.env.VITE_APP_GRAPHQL_ENDPOINT
const endpoints = ep.split(';')
const gQLClients = endpoints.map ( ep => {
    let endp = ep.split('@')
    return { client: endp[0] , url: endp[1] }
})

const graphqlClients = gQLClients.map ( cl => { return cl.client } )

var clientGQL = null

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log ( req.body )
        cb(null, tmp )
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const graphQLConfig = {
    'directus' : {
        schema:{
            pages: {
                query: {
                    list: gql`
                    {
                    pages {
                            id
                            slug
                            title
                            abstract
                            featuredImage
                            tags
                        }
                    }`,
                    single: gql`
                    query($slug:String) {
                        pages(filter:{slug:{ _eq:$slug }}) {
                            id
                            title
                            featuredImage
                            slug
                            html
                            tags
                        }
                    }
                    `,
                    params: 'slug',
                    name: 'title',
                    fields: ['slug','title','html','abstract' , 'featuredImage','tags'],
                    seo: {
                        title: 'title',
                        description: 'abstract',
                        keywords: 'tags'
                    }
                }
            }
        }
    },
    graphcms: {
        schema:{
            pages: {
                query: {
                    list: gql`
                    {
                    pages {
                            id
                            title
                            slug
                            abstract
                            featuredImage {
                                url
                            }
                            content {
                                html
                            }
                            tags
                        }
                    }`,
                    single: gql`
                    query ($slug: String) {
                      pages(where: { slug: $slug }) {
                        slug
                        title
                        content {
                            html
                        }
                        abstract
                        featuredImage {
                            url
                        }
                        tags
                      }
                    }
                  `,
                    params: 'slug',
                    name: 'title',
                    fields: ['slug','title','content.html','abstract' , 'featuredImage' , 'tags'],
                    seo: {
                        title: 'title',
                        description: 'abstract',
                        keywords: 'tags'
                    }
                }
            }
        }
    }
}

const graphqlClient = async ( client ) => {
    return new GraphQLClient( gQLClients.filter(a=>a.client===client)[0].url )
}

const graphQLQuery = async ( config ) => {
    let client = await graphqlClient ( config.client )
    clientGQL = client
    if ( !config?.slug  ){
        const data = await client.request ( graphQLConfig[config.client].schema[config.model].query.list )
        return await data
    } else {
        const data = await client.request ( graphQLConfig[config.client].schema[config.model].query.single , { slug : config.slug } )
        return await data
    }
}



app.post ( '/graphql' , async ( req, res ) => {
    console.log ( req.body )
    let config = req.body
    console.log ( config )
    try {
        let data = await graphQLQuery ( config )
        console.log ( await data )
        res.json ( data )
    } catch ( err ){
        console.log ( err )
        res.json ( { error: err } )
    }
}) 

app.get ( '/home' , async ( req, res ) => {
    res.json ( { path: path.resolve() } )
})

app.get ( '/config' , async ( req, res) => {
    console.log ( paths.config )
    const rawdata = await fs.readFileSync ( paths.config , 'utf-8' )
    try {
        res.json ( JSON.parse(rawdata) )
    } catch ( err ){
        res.json ( { data: rawdata } )
    }
}) 

// get filesystem structure 
// @name : paths
app.get ( '/tree/:name' , async ( req , res ) => {
    
    let dirToScan = paths[req.params?.name] || protectRoot
    if ( !dirToScan.includes ( protectRoot) ) return 
    try {
        const tree = await dree.scan ( path.resolve ( dirToScan ) )
        res.json ( tree )
    } catch (err) {
        res.json ( { error: err } )
    }
})
 
// load file
// @req.query.path : full file path
app.get('/file' , async ( req , res ) => {
    //console.log ( req.query.path && path.resolve ( req.query.path ) && fs.existsSync ( req.query.path ) )
    if ( req.query.path && path.resolve ( req.query.path ) && fs.existsSync ( req.query.path ) && req.query.path.includes(protectRoot) ){
        const rawdata = await fs.readFileSync ( path.resolve ( req.query.path ) , 'utf-8' )
        try {
            res.json ( JSON.parse(rawdata) )
        } catch ( err ){
            res.json ( { data: rawdata } )
        }
    } else {
        res.json ( { error: 'not found' } )
    }
})

app.get('/fileExists' , async ( req,res) => { 
    if ( !req.query.path.includes(protectRoot) ) return 
    const exists = await fs.exists ( path.resolve ( req.query.path ) ) 
    if ( exists ){
        res.json ( { success: true } )
    } else { 
        res.json ( { success: false })
    }
})

app.get('/' , ( req, res ) => {
    if ( !path.resolve ( current ).includes(protectRoot) ) return 
    const rawdata = require( path.resolve ( current ) + '/config.json' )
    res.json ( rawdata )
})

//move file
//@req.query.source : file source full path
//@req.query.target : folder target full path
//@req.query.filename : filename
app.get ('/move' , ( req, res ) => {
    if ( !req.query.target.includes(protectRoot) || !req.query.source.includes(protectRoot) ) return
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
    if ( !req.query.path.includes ( protectRoot) ) return
    if ( path.resolve ( req.query.path ) ){
        fs.removeSync ( path.resolve ( req.query.path ) )
        res.json ( { message: 'Item deleted' } )
    }
})

//delete file
//@req.query.path : full path to delete
app.get ( '/rename' , async ( req , res ) => {
    if ( !req.query.path.includes ( protectRoot) ) return
    let source = path.resolve ( req.query.path + req.query.source )
    let target = path.resolve ( req.query.path ) + '/' + req.query.name
    if ( source ){
        await fs.copySync ( source , target )
        await fs.removeSync ( source )
        res.json ( { message: 'Item renamed' } )
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
    if ( !req.body.path.includes ( protectRoot) ) return
    let stream = fs.createWriteStream( path.resolve ( req.body.path ) )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
        stream.end();
    });
    console.log ( 'save file => ' , req.body.path   )
    //res.send ( req.body )
    res.json ( { message: 'File saved' } )
})


app.get ( '/build/clear' , ( req, res ) => {
    let targetPath = path.resolve ( paths.static ) + '/' + req.query.folder
    if ( !targetPath.includes ( protectRoot) ) return
    fs.readdirSync(targetPath).forEach(f => { if ( f.includes('.html') ) {
        fs.removeSync ( targetPath + '/' + f )
        console.log ( 'removed ' , targetPath + '/' + f )
    }});
    res.json ( { message: 'build cleared'})
})

app.post('/save/html' , async (req, res) => {
    let destFolder = ''
    if ( req.body.folder ){
        destFolder = '/' + req.body.folder
        fs.ensureDir ( path.resolve ( paths['static'] ) + destFolder )
    }
    
    //let stream = await fs.writeFileSync ( path.resolve ( paths['static'] ) + destFolder + '/' + req.body.slug + '.html' , req.body.html )
    let stream = await fs.createWriteStream( path.resolve ( paths['static'] ) + destFolder + '/' + req.body.slug + '.html' )
    stream.once('open', function(fd) {
        stream.write(req.body.html);
        stream.end();
    });
    console.log ( 'Created HTML Page => ' , req.body.slug  )
    res.send ( req.body )
})

// add folder to path root
// @body.path = file full path (required)
app.get('/folder/add' , (req, res) => {
    let dir = req.query.context + '/' + req.query.name 
    if ( !dir.includes ( protectRoot) ) return
    //let dir = req.query.name
    console.log ( dir )
    if ( !fs.existsSync( path.resolve(dir) )){
        fs.ensureDir ( dir )
        //fs.mkdirSync(dir);
        res.json({success:true})
    } else {
        res.json({success:false})
    }
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

app.post('/upload-single', upload.single('file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    var filename = req.file.filename;
    if ( req.body.path.includes (protectRoot) ) return
    fs.move ( tmp + '/' + filename , req.body.path + '/' + filename )
    return res.send('ok')
})

app.listen(port,'0.0.0.0',(err)=>{
    if ( err ){
        console.log ( err )
    } else {
        console.log("server is listening on port " , port );
    }
})
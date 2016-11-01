//including the necesarry modules
const express 	= require( 'express' )
const fs 	  	= require( 'fs' )
const app	  	= express()
const bodyParser= require('body-parser' )
const pg 		= require( 'pg' )

app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )
app.use(express.static('static'))

// parse application/json 
app.use( bodyParser.json() )

// connect to database
var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';


// addMessage page with form
app.get( '/addMessage', (req, res) => {
	console.log( 'Render addMessage')
	res.render( 'addMessage' )
} )



//showMessage page with board
app.get( '/showMessage', (req, res) => {
	console.log( 'Render showMessage')
	res.render( 'showMessage')
})



//LISTEN
app.listen(8000, () => {
	console.log( 'Server running' )
} )
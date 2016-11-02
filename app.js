//including the necesarry modules
const express 	= require( 'express' )
const fs 	  	= require( 'fs' )
const app	  	= express()
const pg 		= require( 'pg' )
const bodyParser= require('body-parser' )

app.set( 'view engine', 'pug')
app.set( 'views', __dirname + '/views' )
app.use(express.static('static'))
app.use( bodyParser.json() )

// connect to database


// addMessage page with form
app.get( '/addMessage', (req, res) => {
	console.log( 'Render addMessage')
	res.render( 'addMessage' )
} )

app.post( '/addMessage', bodyParser.urlencoded({extended: true}), (req, res) => {
	let inputTitle 		= req.body.title
	let inputMessage 	= req.body.message

	let connectionString = 'postgres://floriandalhuijsen@localhost/bulletinboard'

		pg.connect(connectionString, (err, client, done) => {
			if (err) {
				throw err
			}
			client.query( 'INSERT INTO messages (title, body) values ($1,$2);', [inputTitle, inputMessage], (err, result) => {
				if (err) {
					throw err
				}
				done()
				pg.end()
			})
		res.redirect( '/showMessage' )
	})
})



//showMessage page with board

app.get( '/showMessage', (req, res) => {
	console.log( 'Render addMessage')
	res.render( 'showMessage' )
} )

app.post( '/showMessage', (req, res) => {
	let connectionString = 'postgres://floriandalhuijsen@localhost/bulletinboard'
		pg.connect(connectionString, (err, client, done) => {
			if (err) {
			throw err
			}
			client.query( 'SELECT * FROM messages;' , [], (err, result) => {
				if (err) {
				throw err
				}
				done()
				pg.end()
			})
		res.render( '/showMessage', {result: result})
	})
})


//LISTEN
app.listen(8000, () => {
	console.log( 'Server running' )
} )
const express 	= require( 'express' )
const fs 	  	= require( 'fs' )
const app	  	= express()
const bodyParser= require('body-parser' )



var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

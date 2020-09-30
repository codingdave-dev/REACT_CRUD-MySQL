const express = require('express')
const app = express()
const mysql = require('mysql')

const bodyParser = require('body-parser')
const cors = require('cors')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reactCRUD',
    insecureAuth: true
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.post('/api/create', (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movieReviews (movieName, movieReview) VALUES (?,?)";

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
        console.log(err)

    })
})

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movieReviews";

    db.query(sqlSelect, (err, result) => {
        res.send(result)

        console.log(result)
        console.log(err)

    })
})

app.put('/api/update', (req, res) => {
    const movieName = req.body.movieName
    const movieId = req.body.id

    const sqlUpdate = "UPDATE movieReviews SET movieName = ? WHERE id = ?";


    db.query(sqlUpdate, [movieName, movieId], (err, result) => {
        console.log(result)
        console.log(err)

    })
})

app.delete('/api/delete/:id', (req, res) => {
    const movieId = req.params.id
    const sqlDelete = "DELETE FROM movieReviews WHERE id = ?";

    console.log(movieId)

    db.query(sqlDelete, [movieId], (err, result) => {

        res.send(result)

        console.log(result)
        console.log(err)

    })
})



app.listen(3001, () => {
    console.log('RUNNING ON PORT 3001')
})



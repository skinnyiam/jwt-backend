const express = require("express")
const mongoose = require("mongoose")
const User = require("../server/models/user.models")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ww0ojsz.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("connection is succesful")
}).catch((e) => {
    console.log(e)
})
app.post("/api/register", async function(req, res) {
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json({ status: "ok" })
    } catch (err) {
        console.log(err)
        res.json({ status: "err" })
    }


})
app.post("/api/login", async(req, res) => {

    const user = await User.findOne({ email: req.body.email, password: req.body.password })

    if (user) {
        const token = jwt.sign({ name: user.name, email: user.email }, "secret123")
        return res.json({ status: "ok", user: token })
    } else {
        return res.json({ status: "err", user: false })

    }




})
app.get("/api/quote", async function(req, res) {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', quote: user.quote })
    } catch (err) {
        console.log(err)
        res.json({ status: "error", error: "invalid token" })
    }


})
app.post("/api/quote", async function(req, res) {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({ email: email }, { $set: { quote: req.body.quote } })
        return res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: "error", error: "invalid token" })
    }


})

app.listen(1337, () => {
    console.log("server is started")
})
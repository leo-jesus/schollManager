const express = require('express')
const { render } = require('nunjucks')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.render('teacher')
})

routes.get('/teachers', (req, res) => {
    return res.render('teachers/teacher')
})

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create')
})

routes.post("/teacher", teachers.post)

module.exports = routes
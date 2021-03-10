const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.teacher = (req, res) => {
    return res.render('teachers/teacher', { teachers: data.teachers })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teachers) => {
        return teachers.id == id

    })
    if (!foundTeacher)
        return res.send('Teacher not found')


    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        atuationArea: foundTeacher.atuationArea.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }
    return res.render('teachers/show', { teacher })
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    for (let key of keys) {
        if (req.body[key] == '') {
            return res.send("please, fulfill all fields")
        }
    }
    let { avatar_url, name, birth, scholarity, classType, atuationArea } = req.body
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        scholarity,
        classType,
        atuationArea,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.send("write file error")
        }

        return res.render('teachers/teacher')
    })
    //return res.redirect('/teacher')
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teachers) => {
        return teachers.id == id
    })

    if (!foundTeacher)
        return res.send("instructor not found")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })

}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher)
        return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.teachers[index] = teacher
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write error!")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write file error")
        return res.redirect("/teachers")
    })
}

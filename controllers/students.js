const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.student = (req, res) => {
    return res.render('students/student', { students: data.students })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find((students) => {
        return students.id == id

    })
    if (!foundStudent)
        return res.send('Student not found')


    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        atuationArea: foundStudent.atuationArea.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at)
    }
    return res.render('students/show', { student })
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
    const id = Number(data.students.length + 1)

    data.students.push({
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

        return res.render('students/student')
    })
    //return res.redirect('/student')
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find((students) => {
        return students.id == id
    })

    if (!foundStudent)
        return res.send("instructor not found")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }

    return res.render('students/edit', { student })

}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent)
        return res.send("student not found")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.students[index] = student
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write error!")

        return res.redirect(`/students/${id}`)
    })

}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredStudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write file error")
        return res.redirect("/students")
    })
}

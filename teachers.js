const fs = require('fs')
const data = require('./data.json')

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

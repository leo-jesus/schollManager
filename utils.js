module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        today.getDate()
        birthDate.getDate()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate) {
            age = age - 1
        }

        return age
    },
    date: function (timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return {//iso
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }

    },
    sYear: function (year) {
        if (year.includes("-ES")) {
            return year.replace("-ES", "º Year of Elementary School")
        }

        if (year.includes("-HS")) {
            return year.replace("-HS", "º Year of High School")
        }


    }
}
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "db"
});
let userArr = ""
let j = 30000

for(let i = 0; i <= j; i++) {
    let login = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let registration_date = randomDate()
    let last_visit_date = randomDate()
    let ip = '0.0.0.0'
    let flag = true
    if (i === j) {
        userArr = userArr + `('${login}', '${password}', '${registration_date}', '${last_visit_date}', '${ip}', ${flag})`;
    } else {
        userArr = userArr + `('${login}', '${password}', '${registration_date}', '${last_visit_date}', '${ip}', ${flag}),`;
    }

}


function randomDate(start, end, startHour, endHour) {
    let startDate = new Date('1/1/2017')
    let endDate = new Date('1/1/2018')
    const date = new Date(+startDate + Math.random() * (endDate - startDate));
    const hour =  0;
    date.setHours(hour);
    let fullYear = date.getFullYear();
    let month = date.getMonth() || 1;
    let day = date.getDay() || 1;
    let fullDate = `${fullYear}-${month}-${day}`
    return fullDate;
}


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "INSERT INTO `db`.`users` (`login`, `password`, `registration_date`, `last_visit_date`, `ip`, `flag`) VALUES " + userArr;
    console.log(userArr)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

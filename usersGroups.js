const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "db"
});
let userArr = ""
let j = 10

for(let i = 1; i <= j; i++) {
    let gid = getRandomUid(2, 4)
    if (i===0) gid = 1
    if (i === j) {
        userArr = userArr + `('${i}', '${gid}')`
    }  else {
        userArr = userArr + `('${i}', '${gid}'),`
    }

}

function getRandomUid(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "INSERT INTO `db`.`users_group` (`uid`, `gid`) VALUES " + userArr;
    console.log(userArr)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
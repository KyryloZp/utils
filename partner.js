const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "db"
});
let userArr = ""
let j = 10

for(let i = 0; i <= j; i++) {
    let uid = getRandomUid(1, 500);

    let partner_name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    if (i === j) {
        userArr = userArr + `('${uid}', '${partner_name}')`;
    } else {
        userArr = userArr + `('${uid}', '${partner_name}'),`;
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
    const sql = "INSERT INTO `db`.`partners` (`uid`, `partner_name`) VALUES " + userArr;
    console.log(userArr)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

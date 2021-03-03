const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "db"
});
let userArr = ""
let j = 20

for(let i = 0; i <= j; i++) {
    let user_id = getRandomUid(1, 6)
    let partner_id = getRandomUid(1, 10)
    let item_id = getRandomUid(1, 3)
    if (i === j) {
        userArr = userArr + `('${user_id}', '${partner_id}', '${item_id}')`;
    } else {
        userArr = userArr + `('${user_id}', '${partner_id}', '${item_id}'),`;
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
    const sql = "INSERT INTO `db`.`orders` (`user_id`, `partnert_id`, `item_id`) VALUES " + userArr;
    console.log(userArr)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

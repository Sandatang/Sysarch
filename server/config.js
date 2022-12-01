const config = {}


config.port = port = process.env.PORT || 5000
config.db = {
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "sysarch_student_db",
    charset: "utf8mb4"
}

module.exports=config


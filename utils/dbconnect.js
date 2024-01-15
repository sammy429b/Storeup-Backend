import mysql from 'mysql2'

const connectDB = async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
        })
        console.log(`MySQL connected`)
    }
    catch (err) {
        console.log(err)
    }finally{
        console.log("code running")
    }
}

export default connectDB

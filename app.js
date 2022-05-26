import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "Fam",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const app = express();
app.use(express.json());
const port = 3000;

app.get("/saying/random", async (req, res) => {
  const [[sayingRow]] = await pool.query(
    `
    SELECT *
    FROM saying
    ORDER BY RAND()
    LIMIT 1
    `
  );

  if(sayingRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not Found",
    });
    return;
  }

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: sayingRow,
  });
});

app.listen(port, () => {
  console.log(`saying app listening on port ${port}`);
});
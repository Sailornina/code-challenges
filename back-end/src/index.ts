import express, { Application, Request, Response } from "express";
import { Database, CsvDatabase } from "./movies";

const app = express()

let dataBase: Database = new CsvDatabase();


app.get('/movie', (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const pageSize: number = parseInt(req.query.page_size as string);
  res.send(dataBase.findAll(page, pageSize)
)});

app.listen(3000);


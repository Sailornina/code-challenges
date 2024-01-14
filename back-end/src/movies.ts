import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

export interface Movie {
    title: string;
    overview: string;
    genres: Genre[];
    release_date: Date;
    runtime: number;
    vote_average: number;
};
  
export interface Genre {
    id: number;
    name: string;
};
  
export interface Database {
    findAll(page: number, pageSize: number): Page<Movie>;
};

export interface Page<T> {
    page: number,
    pageSize: number,
    totalPages: number,
    content: T[]
};
  
export class CsvDatabase implements Database {
    private movies: Movie[];
  
    constructor() {
      const csvFilePath = path.resolve(__dirname, "../movies.csv");
  
      const headers = [
        "title",
        "overview",
        "genres",
        "release_date",
        "runtime",
        "vote_average",
      ];
  
      const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  
      let result = parse(fileContent, {
        fromLine: 2,
        columns: headers,
      });
  
      console.log(result);
   
      this.movies = result.map((row: any)=> {
        const movie: Movie = {
          title: row["title"],
          overview: row["overview"],
          genres: JSON.parse(row["genres"].replace(/\'/g, '"')),
          release_date: new Date(row["release_date"]),
          runtime: parseFloat(row["runtime"]),
          vote_average: parseFloat(row["vote_average"])
        }
        return movie
      });
    }
  
    findAll(page: number, pageSize: number): Page<Movie> {
      return {
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(this.movies.length / pageSize),
        content: this.movies.slice((page * pageSize) - pageSize, pageSize) 
      };
    }
};
  
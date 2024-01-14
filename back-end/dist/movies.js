"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvDatabase = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sync_1 = require("csv-parse/sync");
;
;
;
;
class CsvDatabase {
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
        let result = (0, sync_1.parse)(fileContent, {
            fromLine: 2,
            columns: headers,
        });
        console.log(result);
        this.movies = result.map((row) => {
            const movie = {
                title: row["title"],
                overview: row["overview"],
                genres: JSON.parse(row["genres"].replace(/\'/g, '"')),
                release_date: new Date(row["release_date"]),
                runtime: parseFloat(row["runtime"]),
                vote_average: parseFloat(row["vote_average"])
            };
            return movie;
        });
    }
    findAll(page, pageSize) {
        return {
            page: page,
            pageSize: pageSize,
            totalPages: Math.ceil(this.movies.length / pageSize),
            content: this.movies.slice((page * pageSize) - pageSize, pageSize)
        };
    }
}
exports.CsvDatabase = CsvDatabase;
;
//# sourceMappingURL=movies.js.map
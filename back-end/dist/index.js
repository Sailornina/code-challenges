"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("./movies");
const app = (0, express_1.default)();
movies_1.CsvDatabase;
let dataBase = new movies_1.CsvDatabase();
app.get('/movie', (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.page_size);
    res.send(dataBase.findAll(page, pageSize));
});
app.listen(3000);
//# sourceMappingURL=index.js.map
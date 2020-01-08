"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
faker_1.default.seed(4321);
function genData() {
    const authors = [];
    for (let i = 0; i < 20; i++) {
        const books = [];
        for (let k = 0; k < 3; k++) {
            books.push({
                id: faker_1.default.random.uuid(),
                name: faker_1.default.internet.domainName(),
                numPages: faker_1.default.random.number()
            });
        }
        authors.push({
            id: faker_1.default.random.uuid(),
            name: faker_1.default.name.findName(),
            company: faker_1.default.company.bs(),
            books
        });
    }
    return authors;
}
exports.data = genData();

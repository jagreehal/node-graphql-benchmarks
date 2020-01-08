"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_gql_1 = __importDefault(require("fastify-gql"));
const md5_1 = __importDefault(require("md5"));
const nexus_1 = require("nexus");
const { data } = require("../data");
const app = fastify_1.default();
exports.Author = nexus_1.objectType({
    name: "Author",
    definition(t) {
        t.id("id");
        t.string("name");
        t.string("md5", {
            resolve: parent => md5_1.default(parent.name)
        });
        t.string("company");
        t.field("books", {
            type: "Book",
            list: [false]
        });
    }
});
exports.Book = nexus_1.objectType({
    name: "Book",
    definition(t) {
        t.id("id"), t.string("name"), t.int("numPages");
    }
});
exports.Query = nexus_1.objectType({
    name: "Query",
    definition(t) {
        t.field("authors", {
            type: "Author",
            list: true,
            resolve: (_, {}) => {
                return data;
            }
        });
    }
});
const nexus_2 = require("nexus");
exports.schema = nexus_2.makeSchema({
    types: [exports.Book, exports.Author, exports.Query]
});
app.register(fastify_gql_1.default, {
    schema: exports.schema,
    jit: 1
});
app.listen(4001);

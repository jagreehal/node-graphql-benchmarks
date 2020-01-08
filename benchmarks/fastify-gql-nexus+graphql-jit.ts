import Fastify from "fastify";
import GQL from "fastify-gql";
import md5 from "md5";
import { objectType } from "nexus";
const { data } = require("../data");

const app = Fastify();

export const Author = objectType({
  name: "Author",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("md5", {
      resolve: parent => md5(parent.name)
    });
    t.string("company");
    t.field("books", {
      type: "Book",
      list: [false]
    });
  }
});
export const Book = objectType({
  name: "Book",
  definition(t) {
    t.id("id"), t.string("name"), t.int("numPages");
  }
});

export const Query = objectType({
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

import { makeSchema } from "nexus";

export const schema = makeSchema({
  types: [Book, Author, Query]
});

app.register(GQL, {
  schema,
  jit: 1
});

app.listen(4001);

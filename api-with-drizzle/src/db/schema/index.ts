import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const postsModel = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(postsModel, ({ one }) => ({
  author: one(usersModel, {
    fields: [postsModel.authorId],
    references: [usersModel.id],
  }),
}));

export type Post = InferSelectModel<typeof postsModel>;
export type NewPost = InferSelectModel<typeof postsModel>;
export const insertPostSchema = createInsertSchema(postsModel);

export const usersModel = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const usersRelations = relations(usersModel, ({ many }) => ({
  posts: many(postsModel),
}));

export const insertUserSchema = createInsertSchema(usersModel);

export type User = InferSelectModel<typeof usersModel>;
export type NewUser = InferInsertModel<typeof usersModel>;

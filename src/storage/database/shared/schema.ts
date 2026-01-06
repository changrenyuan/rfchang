import { pgTable, serial, text, integer, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { createSchemaFactory } from 'drizzle-zod';
import { z } from 'zod';

const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
  coerce: { date: true },
});

// 用户表
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 128 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 文章表
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  isPaid: boolean('is_paid').notNull().default(false),
  price: integer('price').default(0),
  readTime: varchar('read_time', { length: 20 }).notNull(),
  author: varchar('author', { length: 128 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 订单表
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  articleId: integer('article_id').references(() => articles.id),
  type: varchar('type', { length: 20 }).notNull(), // 'article' 或 'consultation'
  amount: integer('amount').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // 'pending', 'paid', 'cancelled'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  paidAt: timestamp('paid_at', { withTimezone: true }),
});

// 咨询预约表
export const consultations = pgTable('consultations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  topic: varchar('topic', { length: 50 }).notNull(),
  description: text('description').notNull(),
  preferredTime: varchar('preferred_time', { length: 100 }),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // 'pending', 'confirmed', 'completed', 'cancelled'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createCoercedInsertSchema(users).pick({
  email: true,
  name: true,
  phone: true,
});

export const insertArticleSchema = createCoercedInsertSchema(articles).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  category: true,
  isPaid: true,
  price: true,
  readTime: true,
  author: true,
});

export const insertOrderSchema = createCoercedInsertSchema(orders).pick({
  userId: true,
  articleId: true,
  type: true,
  amount: true,
});

export const insertConsultationSchema = createCoercedInsertSchema(consultations).pick({
  userId: true,
  name: true,
  email: true,
  phone: true,
  topic: true,
  description: true,
  preferredTime: true,
});

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;
export type Article = typeof articles.$inferSelect;
export type NewArticle = z.infer<typeof insertArticleSchema>;
export type Order = typeof orders.$inferSelect;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type NewConsultation = z.infer<typeof insertConsultationSchema>;

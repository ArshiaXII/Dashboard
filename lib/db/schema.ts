import { mysqlTable, varchar, text, int, boolean, timestamp, json } from 'drizzle-orm/mysql-core';

export const properties = mysqlTable('properties', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 255 }),
  price: int('price').notNull(),
  bedrooms: int('bedrooms').notNull(),
  bathrooms: int('bathrooms').notNull(),
  area: int('area').notNull(),
  landArea: int('land_area'),
  yearBuilt: int('year_built'),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  featured: boolean('featured').default(false),
  images: json('images'),
  floorPlan: varchar('floor_plan', { length: 255 }),
  video: varchar('video', { length: 255 }),
  virtualTour: varchar('virtual_tour', { length: 255 }),
  amenities: json('amenities'),
  nearbyPlaces: json('nearby_places'),
  contactInfo: json('contact_info'),
  seo: json('seo'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const blogs = mysqlTable('blogs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  coverImage: varchar('cover_image', { length: 255 }),
  published: boolean('published').default(false),
  authorId: varchar('author_id', { length: 36 }).references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}); 
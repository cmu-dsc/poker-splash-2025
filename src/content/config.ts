import { defineCollection, type SchemaContext, z } from 'astro:content';

const memberSchema = ({ image }: SchemaContext) => z.array(z.object({
  name: z.string(),
  role: z.string(),
  image: image().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
}));

const leadershipCollection = defineCollection({
  type: 'data',
  schema: memberSchema
});

const developersCollection = defineCollection({
  type: 'data',
  schema: memberSchema
});

const alumniCollection = defineCollection({
  type: 'data',
  schema: memberSchema
});

export const collections = {
  'leadership': leadershipCollection,
  'developers': developersCollection,
  'alumni': alumniCollection,
};
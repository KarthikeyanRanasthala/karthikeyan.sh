import * as fs from 'fs';
import { join } from 'path';

import dotenv from 'dotenv';

import matter from 'gray-matter';

import mongo from 'src/utils/mongo';
import PostSchema from 'src/models/PostSchema';

dotenv.config({});

const handlePosts = async (): Promise<void> => {
  await mongo();

  return new Promise((resolve, reject) => {
    const filenames = fs.readdirSync(join(process.cwd(), 'posts'));
    Promise.all(
      filenames.map((filename) => {
        return new Promise((resolve, reject) => {
          const fileContents = fs.readFileSync(
            join(process.cwd(), 'posts', filename),
            'utf8'
          );
          const {
            data: {
              title = '',
              excerpt = '',
              date = '',
              isPublished = false,
              id,
            },
          } = matter(fileContents);
          const slug = filename.replace(/\.mdx$/, '');
          PostSchema.updateOne(
            { slug },
            {
              id,
              title,
              date,
              slug,
              excerpt,
              isPublished,
            },
            { upsert: true, setDefaultsOnInsert: true }
          )
            .then(() => resolve())
            .catch(() => reject());
        });
      })
    )
      .then(() => resolve())
      .catch(() => reject());
  });
};

handlePosts()
  .then(() => process.exit())
  .catch(() => process.exit(1));

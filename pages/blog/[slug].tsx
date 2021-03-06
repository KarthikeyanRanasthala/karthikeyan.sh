import fs from 'fs';
import { join } from 'path';

import renderToString from 'next-mdx-remote/render-to-string';

import matter from 'gray-matter';

import Head from 'next/head';

import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';

import dayjs from 'dayjs';

import PostSchema from 'src/models/PostSchema';
import mongo from 'src/utils/mongo';

import rehypePrism from '@mapbox/rehype-prism';

const BlogPost: React.FC<PostProps> = ({ renderedOutput, frontMatter }) => {
  return (
    <>
      <style jsx>
        {`
          .content :global(h2) {
            @apply mt-12 mb-6;
          }
          .content :global(h3),
          .content :global(h4),
          .content :global(p),
          .content :global(ol),
          .content :global(ul) {
            @apply mb-6;
          }
          .content :global(p),
          .content :global(li) {
            @apply leading-7;
          }
          .content :global(a) {
            @apply text-green-500 no-underline;
          }
          .content :global(a:hover) {
            @apply underline;
            text-decoration-style: dashed;
          }
          .content :global(ol) {
            @apply list-decimal list-inside;
          }
          .content :global(ul) {
            @apply list-disc list-inside;
          }
        `}
      </style>
      <Head>
        <title>
          {frontMatter.title ? `${frontMatter.title} | ` : ''}Karthikeyan
          Ranasthala
        </title>
        <meta name="description" content={frontMatter.excerpt} />
      </Head>
      <article className="mx-4 mt-8 md:mt-16 max-w-4xl md:mx-auto md:px-8">
        <h1 className="text-5xl md:text-6xl mb-8 font-bold leading-tight">
          {frontMatter.title}
        </h1>
        <p className="text-gray-400 border-l-4 border-green-500 pl-3 mb-8">
          {dayjs(frontMatter.date).format('dddd, DD MMMM YYYY')}
        </p>
        <section
          className="content"
          dangerouslySetInnerHTML={{
            __html: renderedOutput,
          }}
        />
      </article>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const fileContents = fs.readFileSync(
    join(process.cwd(), 'posts', `${context.params?.slug}.mdx`),
    'utf8'
  );
  const { content, data: frontMatter } = matter(fileContents);
  const { renderedOutput } = await renderToString(
    content,
    {},
    {
      rehypePlugins: [rehypePrism],
    }
  );

  return { props: { renderedOutput, frontMatter } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await mongo();

  const posts: PostCardProps[] = JSON.parse(
    JSON.stringify(
      await PostSchema.find({ isPublished: true }).sort({ id: -1 }).lean()
    )
  );
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default BlogPost;

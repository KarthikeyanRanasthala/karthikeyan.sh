import rehypePrism from '@mapbox/rehype-prism';
import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import Head from 'next/head';
import { join } from 'path';
import cache from 'src/utils/cache';

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.slug?.toString() || '';

  const postInCache: PostProps | undefined = cache.get(slug);
  if (postInCache) {
    return { props: postInCache };
  } else {
    const fileContents = fs.readFileSync(
      join(process.cwd(), 'posts', `${slug}.mdx`),
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

    cache.set(slug, { renderedOutput, frontMatter });

    return { props: { renderedOutput, frontMatter } };
  }
};

export default BlogPost;

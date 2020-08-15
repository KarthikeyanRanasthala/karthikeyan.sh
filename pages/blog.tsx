import { GetStaticProps } from 'next';

import PostsList from 'src/components/common/PostsList';

import PostSchema from 'src/models/PostSchema';
import mongo from 'src/utils/mongo';
import Head from 'next/head';

const BlogPage: React.FC<BlogPageProps> = (props) => (
  <>
    <Head>
      <title>Blog | Karthikeyan Ranasthala</title>
      <meta name="description" content="" />
    </Head>
    <main className="mx-4 max-w-4xl md:mx-auto md:px-16">
      <PostsList title="All Posts" className="text-5xl" posts={props.posts} />
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await mongo();

  const posts: PostCardProps[] = JSON.parse(
    JSON.stringify(
      await PostSchema.find({ isPublished: true }).sort({ id: -1 }).lean()
    )
  );
  return { props: { posts } };
};

export default BlogPage;

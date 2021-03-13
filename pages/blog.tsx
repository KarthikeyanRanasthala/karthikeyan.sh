import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PostsList from 'src/components/common/PostsList';
import PostSchema from 'src/models/PostSchema';
import cache from 'src/utils/cache';
import mongo from 'src/utils/mongo';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const postsInCache = cache.get('posts');
  if (postsInCache) {
    return { props: { posts: postsInCache } };
  } else {
    await mongo();

    const posts: PostCardProps[] = JSON.parse(
      JSON.stringify(
        await PostSchema.find({ isPublished: true }).sort({ id: -1 }).lean()
      )
    );

    cache.set('posts', posts);

    return { props: { posts } };
  }
};

export default BlogPage;

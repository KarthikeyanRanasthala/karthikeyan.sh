import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PostsList from 'src/components/common/PostsList';
import Introduction from 'src/components/indexPage/Introduction';
import Timeline from 'src/components/indexPage/Timeline';
import PostSchema from 'src/models/PostSchema';
import cache from 'src/utils/cache';
import mongo from 'src/utils/mongo';

const IndexPage: React.FC<IndexPageProps> = (props) => (
  <>
    <Head>
      <title>Karthikeyan Ranasthala</title>
    </Head>
    <main className="mx-4 max-w-4xl md:mx-auto md:px-16">
      <Introduction />
      {props.posts.length !== 0 ? (
        <PostsList
          title="Recent Posts"
          className="text-4xl"
          posts={props.posts}
        />
      ) : null}
      <Timeline />
    </main>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const recentPostsInCache = cache.get('recentPosts');
  if (recentPostsInCache) {
    return { props: { posts: recentPostsInCache } };
  } else {
    await mongo();

    const recentPosts: PostCardProps[] = JSON.parse(
      JSON.stringify(
        await PostSchema.find({ isPublished: true })
          .sort({ id: -1 })
          .limit(3)
          .lean()
      )
    );

    cache.set('recentPosts', recentPosts);

    return { props: { posts: recentPosts } };
  }
};

export default IndexPage;

import Head from 'next/head';

import { GetServerSideProps } from 'next';

import Introduction from 'src/components/indexPage/Introduction';
import Timeline from 'src/components/indexPage/Timeline';
import PostsList from 'src/components/common/PostsList';
import PostSchema from 'src/models/PostSchema';
import mongo from 'src/utils/mongo';

import cache from 'src/utils/cache';

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
  const cachedContent: IndexPageProps | undefined = cache.get('recent-posts');

  if (cachedContent) {
    return { props: cachedContent };
  }

  await mongo();

  const posts: PostCardProps[] = JSON.parse(
    JSON.stringify(
      await PostSchema.find({ isPublished: true })
        .sort({ id: -1 })
        .limit(3)
        .lean()
    )
  );

  cache.set('recent-posts', { posts });

  return { props: { posts } };
};

export default IndexPage;

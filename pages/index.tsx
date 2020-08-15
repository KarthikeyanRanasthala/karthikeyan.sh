import Head from 'next/head';

import { GetStaticProps } from 'next';

import Introduction from 'src/components/indexPage/Introduction';
import Timeline from 'src/components/indexPage/Timeline';
import PostsList from 'src/components/common/PostsList';
import PostSchema from 'src/models/PostSchema';
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

export const getStaticProps: GetStaticProps = async () => {
  await mongo();

  const posts: PostCardProps[] = JSON.parse(
    JSON.stringify(
      await PostSchema.find({ isPublished: true })
        .sort({ id: -1 })
        .limit(3)
        .lean()
    )
  );
  return { props: { posts } };
};

export default IndexPage;

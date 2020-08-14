import Head from 'next/head';

import Introduction from 'src/components/indexPage/Introduction';
import Timeline from 'src/components/indexPage/Timeline';

const IndexPage: React.FC<IndexPageProps> = () => (
  <>
    <Head>
      <title>Karthikeyan Ranasthala</title>
    </Head>
    <main className="mx-4 max-w-4xl md:mx-auto md:px-16">
      <Introduction />
      <Timeline />
    </main>
  </>
);

export default IndexPage;

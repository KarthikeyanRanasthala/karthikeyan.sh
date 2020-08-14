import SocialLinks from 'src/components/common/SocialLinks';

const Introduction: React.FC<unknown> = () => (
  <>
    <style jsx>
      {`
        .company-link {
          text-decoration-style: dashed;
        }
      `}
    </style>
    <section className="mt-4 mb-12 md:mt-16 leading-snug md:leading-normal">
      <h1 className="text-5xl hidden md:block font-semibold">
        Hi, I&apos;m Karthikeyan Ranasthala
      </h1>
      <h1 className="text-5xl font-semibold md:hidden">
        Hey, I&apos;m Karthikeyan
      </h1>
      <h2 className="text-2xl mt-6 text-gray-400">
        Frontend Engineer at{' '}
        <a
          className="company-link text-green-500 no-underline hover:underline"
          href="https://www.smallcase.com"
          rel="noreferrer"
          target="_blank"
        >
          smallcase
        </a>{' '}
        in Bengaluru, India
      </h2>
      <SocialLinks className="mt-6" />
    </section>
  </>
);

export default Introduction;

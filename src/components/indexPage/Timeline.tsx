import timeline from 'src/constants/timeline.json';

const Timeline: React.FC<unknown> = () => {
  return (
    <section className="mb-12">
      <h1 className="text-4xl font-semibold text-green-500 mb-4 text">
        Timeline
      </h1>
      {timeline.data.map((content) => {
        return (
          <div key={content.year}>
            <h2 className="text-2xl font-semibold mb-3">{content.year}</h2>
            <ul className="list-disc list-inside ml-8 mb-4">
              {content.data.map((ele) => (
                <li key={ele} className="text-lg mb-2">
                  {ele}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
};

export default Timeline;

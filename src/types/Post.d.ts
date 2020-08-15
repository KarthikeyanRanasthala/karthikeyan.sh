declare type PostProps = {
  mdxSource: {
    source: string;
    renderedOutput: string;
  };
  frontMatter: {
    title: string;
    date: string;
    excerpt?: string;
  };
};

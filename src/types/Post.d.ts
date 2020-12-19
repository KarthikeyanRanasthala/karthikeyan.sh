declare type PostProps = {
  renderedOutput: string;
  frontMatter: {
    title: string;
    date: string;
    excerpt?: string;
  };
};

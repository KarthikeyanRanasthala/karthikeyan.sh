import PostCard from 'src/components/common/PostCard';

const PostsList: React.FC<PostsListProps> = (props) => (
  <section className="mb-12">
    <h1 className={`font-semibold text-green-500 mb-4 ${props.className}`}>
      {props.title}
    </h1>
    <ul>
      {props.posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </ul>
  </section>
);

export default PostsList;

import Link from 'next/link';

import dayjs from 'dayjs';

const BlogPostCard: React.FC<PostCardProps> = (props) => {
  const formattedDate = dayjs(props.date).format('MMM-DD-YYYY').split('-');
  return (
    <li>
      <Link as={`/blog/${props.slug}`} href="/blog/[slug]">
        <a className="flex justify-end flex-row-reverse mb-6 px-1 md:px-8 py-2 border-2 border-dashed border-primary-dark hover:border-green-600">
          <div className="pl-4 flex flex-col justify-center">
            <p className="leading-10 mb-2 md:leading-8 md:mb-4 font-semibold text-3xl">
              {props.title}
            </p>
            <p className="text-gray-400">{props.excerpt}</p>
          </div>
          <div className="flex flex-col justify-center border-r-4 border-green-500 text-center pr-4 py-2 font-bold">
            <span>{formattedDate[0]}</span>
            <span>{formattedDate[1]}</span>
            <span>{formattedDate[2]}</span>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default BlogPostCard;

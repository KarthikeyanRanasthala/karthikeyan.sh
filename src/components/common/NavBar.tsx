import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];

const NavBar: React.FC<unknown> = () => {
  const router = useRouter();
  return (
    <>
      <style jsx>
        {`
          .nav-link {
            transition: border-color 0.2s ease;
          }
          .nav-link:not(.active):hover {
            @apply border-dashed border-green-500;
          }
          .nav-link:not(.active) > a {
            transition: color 0.2s ease-in-out;
          }
          .nav-link:not(.active) > a:hover {
            @apply text-green-500;
          }
        `}
      </style>
      <nav className="flex justify-end bg-primary-dark">
        <ul className="flex my-4 md:my-8">
          {links.map((link) => (
            <li
              key={link.title}
              className={`ml-8 border-4 rounded-lg nav-link ${
                router.asPath === link.href
                  ? 'border-green-500 active'
                  : 'border-primary-dark'
              }`}
            >
              <Link href={link.href}>
                <a className="px-4 py-2 block text-white text-lg font-bold">
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;

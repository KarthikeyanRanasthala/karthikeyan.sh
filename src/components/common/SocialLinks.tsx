import {
  FaLinkedin,
  FaTwitterSquare,
  FaGithubSquare,
  FaEnvelopeSquare,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';

const links = [
  {
    title: 'LinkedIn',
    icon: <FaLinkedin />,
    link: 'https://in.linkedin.com/in/karthikeyan-ranasthala',
  },
  {
    title: 'Github',
    icon: <FaGithubSquare />,
    link: 'https://github.com/karthikeyanranasthala',
  },
  {
    title: 'Email',
    icon: <FaEnvelopeSquare />,
    link: 'mailto:karthikeyan.ranasthala@gmail.com',
  },
  {
    title: 'Twitter',
    icon: <FaTwitterSquare />,
    link: 'https://twitter.com/_iamkarthikeyan',
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
}): JSX.Element => (
  <>
    <style jsx>
      {`
        .contact-container :global(.intro-icons) {
          width: 32px;
          height: auto;
        }
        .contact-container :global(.intro-icons:hover) {
          @apply text-green-500;
        }
      `}
    </style>
    <div className={`flex contact-container ${className}`}>
      <IconContext.Provider value={{ className: 'intro-icons' }}>
        {links.map(({ title, icon, link }) => (
          <a
            key={title}
            rel="noreferrer noopener"
            target="_blank"
            className="mr-4"
            href={link}
          >
            {icon}
            <span className="sr-only">{title}</span>
          </a>
        ))}
      </IconContext.Provider>
    </div>
  </>
);

export default SocialLinks;

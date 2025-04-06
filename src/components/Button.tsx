import Link from 'next/link';

interface ButtonProps {
  title: string;
  link: string;
  color?: string; 
}

const Button: React.FC<ButtonProps> = ({ title, link, color }) => {
  return (
    <Link
      href={link}
      className={`inline-block px-6 py-2 text-base font-semibold rounded-md border border-neutral-900 transition transform duration-200 ease-in-out
        ${color ? color : 'bg-neutral-900 hover:text-pink-400 hover:border-pink-400 hover:shadow-[0_0_10px_#00f0ff50] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400'}
      `}
    >
      {title}
    </Link>
  );
};

export default Button;
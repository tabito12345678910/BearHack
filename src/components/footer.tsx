import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white py-6 px-6 text-center border-t border-black">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-6">
        <div className="text-sm text-gray-300 text-left">
          <p>
            Email:{' '}
            <a
              href="mailto:info@MedOptima.com"
              className="text-white hover:text-cyan-400 transition"
            >
              info@medoptima.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a
              href="tel:+1234567890"
              className="text-white hover:text-cyan-400 transition"
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
        <Link
            href="/"
            className="hover:text-cyan-400 transition"
          >
            HomePage
          </Link>
          <Link
            href="/input"
            className="hover:text-cyan-400 transition"
          >
            Input Insurance Information
          </Link>
          <Link
            href="/chat"
            className="hover:text-cyan-400 transition"
          >
            Our Mission
          </Link>
        </nav>

      </div>

      <p className="text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Team 32 Inc.
      </p>
    </footer>
  );
};

export default Footer;
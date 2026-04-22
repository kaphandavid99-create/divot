import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sell', href: '/sell' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
    ), href: 'https://facebook.com/divot' },
    { name: 'Twitter', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    ), href: 'https://twitter.com/divot' },
    { name: 'Instagram', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.792.01 3.71.048 1.067.043 1.785.2 2.302.476.54.294.926.78 1.21 1.21.276.476.433 1.194.476 2.302.038.918.048 1.279.048 3.71s-.01 2.43-.048 3.71c-.043 1.067-.2 1.785-.476 2.302-.294.54-.78.926-1.21 1.21-.476.276-1.194.433-2.302.476-.918.038-1.279.048-3.71.048s-2.43-.01-3.71-.048c-1.067-.043-1.785-.2-2.302-.476-.54-.294-.926-.78-1.21-1.21-.276-.476-.433-1.194-.476-2.302-.038-.918-.048-1.279-.048-3.71s.01-2.43.048-3.71c.043-1.067.2-1.785.476-2.302.294-.54.78-.926 1.21-1.21.476-.276 1.194-.433 2.302-.476.918-.038 1.279-.048 3.71-.048zM12 1.016c-2.716 0-3.056.012-4.123.058-1.128.047-1.89.204-2.43.476-.605.308-1.107.81-1.414 1.414-.272.54-.429 1.302-.476 2.43-.047 1.067-.058 1.407-.058 4.123s.012 3.056.058 4.123c.047 1.128.204 1.89.476 2.43.308.605.81 1.107 1.414 1.414.54.272 1.302.429 2.43.476 1.067.047 1.407.058 4.123.058s3.056-.012 4.123-.058c1.128-.047 1.89-.204 2.43-.476.605-.308 1.107-.81 1.414-1.414.272-.54.429-1.302.476-2.43.047-1.067.058-1.407.058-4.123s-.012-3.056-.058-4.123c-.047-1.128-.204-1.89-.476-2.43-.308-.605-.81-1.107-1.414-1.414-.54-.272-1.302-.429-2.43-.476-1.067-.047-1.407-.058-4.123-.058zm0 3.627c-2.27 0-4.123 1.853-4.123 4.123s1.853 4.123 4.123 4.123 4.123-1.853 4.123-4.123-1.853-4.123-4.123-4.123zm0 6.74c-1.44 0-2.617-1.177-2.617-2.617s1.177-2.617 2.617-2.617 2.617 1.177 2.617 2.617-1.177 2.617-2.617 2.617zm5.223-7.46c0 .605-.492 1.097-1.097 1.097s-1.097-.492-1.097-1.097c0-.605.492-1.097 1.097-1.097s1.097.492 1.097 1.097z" clipRule="evenodd" /></svg>
    ), href: 'https://instagram.com/divot' },
    { name: 'LinkedIn', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
    ), href: 'https://linkedin.com/company/divot' },
  ];

  return (

<footer className="bg-black text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
        {/* Logo and Description */}
        <div className="col-span-full md:col-span-1">
          <Link href="/" className="flex items-center mb-4">
            <Image
              src="/divot.png"
              alt="Divot Logo"
              height={40}
              width={120}
              priority
              className="object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Your premier destination for luxury car rentals and sales across Africa. Drive the future today with Divot.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-gray-400 hover:text-sky-400 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:info@divot.com" className="text-gray-400 hover:text-sky-400 transition-colors">
                info@divot.com
              </a>
            </li>
            <li>
              <a href="tel:+237677889900" className="text-gray-400 hover:text-sky-400 transition-colors">
                +237 677 889 900
              </a>
            </li>
            <li className="text-gray-400">
              123 Main Street, Douala, Cameroon
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-sky-400 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto text-center pt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Divot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
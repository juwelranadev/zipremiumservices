import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Send } from 'lucide-react';

const footerSections = [
  {
    title: 'Streaming & Media',
    color: 'text-pink-300',
    hoverColor: 'hover:text-pink-400',
    links: [
      { name: 'Netflix Premium', href: '/products/netflix' },
      { name: 'YouTube Premium', href: '/products/youtube' },
      { name: 'Spotify Premium', href: '/products/spotify' },
      { name: 'Other OTT Accounts', href: '/products/ott' },
    ],
  },
  {
    title: 'Design & Productivity',
    color: 'text-indigo-300',
    hoverColor: 'hover:text-indigo-400',
    links: [
      { name: 'Canva Pro', href: '/products/canva' },
      { name: 'Graphic / Content Tools', href: '/products/tools' },
      { name: 'Team / Shared Accounts', href: '/products/shared' },
    ],
  },
  {
    title: 'Security & VPN',
    color: 'text-emerald-300',
    hoverColor: 'hover:text-emerald-400',
    links: [
      { name: 'ExpressVPN', href: '/products/expressvpn' },
      { name: 'NordVPN', href: '/products/nordvpn' },
      { name: 'Other Premium VPNs', href: '/products/vpn' },
    ],
  },
  {
    title: 'Social Media Services',
    color: 'text-yellow-300',
    hoverColor: 'hover:text-yellow-400',
    links: [
      { name: 'Facebook & Instagram Growth', href: '/products/social/facebook-instagram' },
      { name: 'YouTube & TikTok Engagement', href: '/products/social/youtube-tiktok' },
      { name: 'Custom Social Packages', href: '/products/social/custom' },
    ],
  },
  {
    title: 'Legal',
    color: 'text-blue-300',
    hoverColor: 'hover:text-blue-400',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact Us', href: '/contact-us' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-gray-100 border-t border-gray-800/70 font-sans overflow-hidden">
      {/* Background Image - Footer Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/footer-background.webp')" }}
      ></div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Static gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/15 to-pink-900/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>

          {/* Brand / Primary */}
          <div className="md:col-span-1 space-y-4 flex flex-col items-center md:items-start text-center md:text-left" style={{ willChange: 'transform' }}>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Image
                src="/zi-logo.svg"
                alt="ZI Premium Services Logo"
                width={40}
                height={40}
                className="rounded-lg shadow-lg"
              />
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base md:text-lg font-extrabold leading-tight whitespace-nowrap">
                  <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                    ZI PREMIUM SERVICES
                  </span>
                </h3>
                <span className="text-xs text-gray-200">
                  Your Digital Gateway
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-200 max-w-md leading-relaxed">
              Affordable access to global premium apps, VPNs, and social media growth with trusted local support.
            </p>
          </div>

          {/* Service Links */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8" style={{ willChange: 'transform' }}>
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className={`uppercase text-xs tracking-widest font-extrabold mb-3 ${section.color}`}>
                  {section.title}
                </p>
                <ul className="space-y-1.5 text-gray-200 font-medium">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className={`transition-all duration-300 ease-out ${section.hoverColor} hover:underline underline-offset-2 hover:translate-x-1 block`} 
                        style={{ willChange: 'transform, color' }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Credits & Social */}
          <div className="md:col-span-1 space-y-4 text-left md:text-right" style={{ willChange: 'transform' }}>
            <div className="flex justify-start md:justify-end space-x-4 mb-4">
              <a href="https://www.facebook.com/zikrulislam.juwel" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-all duration-300 ease-out hover:scale-110" style={{ willChange: 'transform, color' }}>
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/zikrulislam.juwel" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-all duration-300 ease-out hover:scale-110" style={{ willChange: 'transform, color' }}>
                <Instagram size={20} />
              </a>
              <a href="https://t.me/trustedearningsources" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-all duration-300 ease-out hover:scale-110" style={{ willChange: 'transform, color' }}>
                <Send size={20} />
              </a>
            </div>
            <p className="text-sm font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                &copy; {year} ZI PREMIUM SERVICES
              </span>
              <span className="block text-gray-300 font-normal">All rights reserved.</span>
            </p>
            <p className="text-sm text-gray-200">
              Crafted by{" "}
              <a
                href="https://t.me/zikrulislamjuwel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 hover:brightness-125 transition-all duration-300 ease-out underline-offset-2 hover:underline hover:scale-105"
                style={{ willChange: 'transform, filter, color' }}
              >
                MD ZIKRUL ISLAM
              </a>
            </p>
            <p className="text-xs text-gray-300">
              Global Digital Services, Based in Bangladesh
            </p>
          </div>
        </div>

        {/* Meta line */}
        <div className="mt-10 pt-6 border-t border-gray-800/80 text-center text-xs text-gray-300 tracking-wider font-semibold">
          Secure Payments · Fast Delivery · 24/7 Support
        </div>
      </div>
    </footer>
  );
}

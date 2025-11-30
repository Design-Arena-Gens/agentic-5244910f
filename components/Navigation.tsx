'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLocale = pathname.split('/')[1];
  const otherLocale = currentLocale === 'ar' ? 'en' : 'ar';
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');

  const links = [
    { href: `/${currentLocale}`, label: t('home') },
    { href: `/${currentLocale}/products`, label: t('products') },
    { href: `/${currentLocale}/about`, label: t('about') },
    { href: `/${currentLocale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${currentLocale}`} className="text-2xl font-bold text-primary-600">
            IndustryCom
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary-600 transition-colors ${
                  pathname === link.href ? 'text-primary-600 font-bold' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={`/${otherLocale}${pathWithoutLocale || ''}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {otherLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg ${
                  pathname === link.href ? 'bg-primary-100 text-primary-600 font-bold' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${otherLocale}${pathWithoutLocale || ''}`}
              className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {otherLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

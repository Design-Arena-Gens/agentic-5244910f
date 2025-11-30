'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { products } from '@/data/products';

export default function ProductsSection() {
  const t = useTranslations('products');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {currentLocale === 'ar' ? product.name.ar : product.name.en}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {currentLocale === 'ar' ? product.description.ar : product.description.en}
                </p>
                <Link
                  href={`/${currentLocale}/products/${product.id}`}
                  className="text-primary-600 font-bold hover:text-primary-700"
                >
                  {t('viewDetails')} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${currentLocale}/products`}
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
          >
            {currentLocale === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </Link>
        </div>
      </div>
    </section>
  );
}

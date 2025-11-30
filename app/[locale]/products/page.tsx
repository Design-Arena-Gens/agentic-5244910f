import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('products');

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <svg className="w-32 h-32 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ar' ? product.name.ar : product.name.en}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'ar' ? product.description.ar : product.description.en}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">{product.price}</span>
                  <Link
                    href={`/${locale}/products/${product.id}`}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

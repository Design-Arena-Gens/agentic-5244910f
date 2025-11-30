import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale);
  const t = useTranslations('productDetails');
  const tProducts = useTranslations('products');

  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('backToProducts')}
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 lg:h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <svg className="w-64 h-64 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">
                {locale === 'ar' ? product.name.ar : product.name.en}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {locale === 'ar' ? product.description.ar : product.description.en}
              </p>
              <div className="text-3xl font-bold text-primary-600 mb-8">{product.price}</div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('specifications')}</h2>
                <ul className="space-y-2">
                  {product.specifications[locale === 'ar' ? 'ar' : 'en'].map((spec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mx-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('features')}</h2>
                <ul className="space-y-2">
                  {product.features[locale === 'ar' ? 'ar' : 'en'].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-primary-600 mx-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg">
                {tProducts('requestQuote')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

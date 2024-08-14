import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '../../src/components/productDetail';
import AddToListButton from '@/components/add-to-list-button';

const API_BASE_URL = process.env.NEXT_PUBLIC_HOSTNAME;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

function OriginButton({
  originUrl,
  supermarket,
}: {
  originUrl: string;
  supermarket: string;
}) {
  return (
    <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      <a href={originUrl} target="_blank" rel="noopener">
        Ver en {supermarket}
      </a>
    </div>
  );
}

function ImageCard({ imageUrl }: { imageUrl: string }) {
  return (
    <img
      src={imageUrl}
      alt={imageUrl}
      className="w-full h-full max-h-[150px] max-w-[200px] object-contain border border-black"
    />
  );
}

function ProductInfo({ product }: { product: any }) {
  return (
    <div>
      <p>{product.supermarket}</p>
      <h1 className="font-bold ">
        <a href={product.url} target="_blank" rel="noopener">
          {product.name}
        </a>
      </h1>
      <p>{product.category}</p>
    </div>
  );
}

function ProductPricing({ product }: { product: any }) {
  return (
    <div>
      <p>${product.current_final_price}</p>
      {product.current_final_price > 0 && (
        <p className="line-through">{product.current_old_price}</p>
      )}
      <p>ultima fecha de captura: {formatDate(product.last_scraped_at)}</p>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>('10d');
  const [userLists, setUserLists] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL + '/products/' + id);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        data.prices = data.prices.map((price: any) => ({
          ...price,
          date: new Date(price.scraped_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }),
        }));

        data.prices.sort((a: any, b: any) => a.date - b.date);
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      try {
        const response = await fetch(API_BASE_URL + '/lists');
        if (!response.ok) {
          throw new Error('Failed to fetch lists');
        } else {
          const data = await response.json();
          setUserLists(data.map((list: any) => list.name));
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container w-full lg:max-w-[1000px] lg:px-auto px-4 py-4 gap-4 items-start justify-between">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              <ProductInfo product={product} />
              <div className="lg:order-first">
                <ImageCard imageUrl={product.image} />
              </div>
            </div>
            <div>
              <ProductPricing product={product} />
            </div>
          </div>
          <div className="lg:self-end flex flex-col gap-2">
            <div>
              <AddToListButton lists={userLists} />
            </div>

            <OriginButton
              originUrl={product.url}
              supermarket={product.supermarket}
            />
          </div>
        </div>
        <div className="w-full">
          <ProductDetail
            data={product.prices}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_HOSTNAME;

export default function Page() {
  const [lists, setLists] = useState<any>([]);
  const [currentList, setCurrentList] = useState<any>(null);

  const handleListClick = (list: any) => {
    setCurrentList(list);
  };

  const getLists = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/lists`);
      if (!response.ok) {
        throw new Error('Failed to fetch lists');
      }
      const data = await response.json();
      const sortedData = data
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((list: any) => ({
          ...list,
          totalValue: computeListValue(list.products),
          created_at: new Date(list.created_at).toTimeString(),
        }));

      console.log(sortedData);
      setLists(sortedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className="container lg:mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full max-w-[400px] border p-4 rounded-lg">
          <h1 className="pb-4 font-bold">Mis Listas</h1>
          <div className="flex flex-col divide-y divide-gray-200 item">
            {lists.map((list: any) => (
              <ListaSidebar
                key={list.name}
                data={list}
                className="py-4 hover:bg-slate-100"
                onClick={() => handleListClick(list)}
              />
            ))}
          </div>
        </div>
        <div>
          <Content currentList={currentList} />
        </div>
      </div>
    </div>
  );
}

function ListaSidebar({
  data,
  className,
  onClick,
}: {
  data: any;
  className?: string;
  onClick?: any;
}) {
  return (
    <div className={className} onClick={onClick}>
      <h2>{data.name}</h2>
    </div>
  );
}

function Content({
  currentList,
  className,
}: {
  currentList: any;
  className?: string;
}) {
  if (!currentList?.name) return <div>No list selected</div>;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{currentList.name}</h1>
      <h1>Total: {currentList.totalValue}</h1>
      <ProductsTable products={currentList.products} />
      <small>
        ultima modificacion a lista {formatDate(currentList.updated_at)}
      </small>
      <small>Fecha de creacion de lista {currentList.created_at}</small>
    </div>
  );
}

function ProductsTable({ products }: { products: any }) {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <td>#</td>
          <td>Nombre</td>
          <td>Supermercado</td>
          <td>Categoria</td>
          <td>Precio</td>
          <td>Ultima Captura</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any, index: number) => (
          <tr key={product.id} className="hover:bg-slate-100">
            <td>{index + 1}</td>
            <td className="flex hover:underline">
              <img
                src={product.image}
                alt={product.name + ' image'}
                className="w-full h-full max-h-[30x] max-w-[40px] object-contain border border-black"
              />
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </td>
            <td>{product.supermarket}</td>
            <td>{product.category}</td>
            <td>{product.price.final_price}</td>
            <td>{formatDate(product.last_scraped_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function computeListValue(products: any[]) {
  return products.reduce((acc, product) => acc + product.price.final_price, 0);
}

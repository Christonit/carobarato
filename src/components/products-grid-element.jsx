import React, { useState } from 'react';
import ProductCard from './product-card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import cx from 'classnames';
import {
  removeComparison,
  showAddToComparisson,
} from '../store/products/slice'; // Import your specific action from redux
import { SUPERMERCADOS_OBJ, COLORS, BREAKPOINTS } from '../utils/constants';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import uniqueId from 'lodash/uniqueId';
import { useDispatch, useSelector } from 'react-redux';
import useDeviceSize from '../hooks';

const PriceComparison = ({ title }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.comparissons[title]);
  const [isOpen, setIsOpen] = useState(true);
  const { windowWidth } = useDeviceSize();
  const toggling = () => setIsOpen(!isOpen);
  const { sidebarOpen } = useSelector(state => state.products);
  const [chartData] = useState(
    products.map(item => {
      const price = Number(item.prices[0].list_price);
      const discounted_price = Number(item.prices[0].discounted_price);
      return {
        product_name: item.product_name,
        name: SUPERMERCADOS_OBJ[item.supermercado],
        value: item.supermercado,
        Precio: discounted_price > 0 ? discounted_price : price,
      };
    })
  );

  const findCheapestItem = () => {
    // Sort items based on their Precio value from lowest to highest

    if (chartData.length === 0) return;
    const copy = [...chartData];
    copy.sort((a, b) => a.Precio - b.Precio);

    // Get the cheapest and the most expensive item
    const cheapest = copy[0];
    const mostExpensive = copy[copy.length - 1];

    // Calculate how cheap the cheapest item is compared to the most expensive one
    const priceDifference = mostExpensive.Precio - cheapest.Precio;
    const percentageCheaper = (
      (priceDifference / mostExpensive.Precio) *
      100
    ).toFixed(2);

    return {
      ...cheapest,
      percentageCheaper,
    };
  };

  const cheapestItem = findCheapestItem();

  return (
    <div className='mb-[24px] md:mb-[64px] border-b border-slate-200 md:border-0 '>
      <div className='flex flex-col md:flex-row flex-wrap  items-center justify-between mb-[20px] lg:mb-[32px] gap-[24px]'>
        <div className='inline-flex md:flex-row flex-col lg:items-end gap-[8px] lg:gap-[16px] w-full md:w-auto'>
          <div className='flex w-full md:w-auto items-start lg:items-center'>
            <h2 className='font-bold text-lg lg:text-2xl leading-none max-w-[75%] lg:max-w-full'>
              {title}
              <span className='comparison-count ml-[8px] mr-[12px] lg:hidden'>
                {products.length}
              </span>
            </h2>

            <button
              className='material-icons text-[20px] ml-auto lg:hidden'
              onClick={() => dispatch(removeComparison(title))}
            >
              delete_outline
            </button>

            <button
              className='material-icons text-[20px] ml-[12px] lg:hidden'
              onClick={() => dispatch(showAddToComparisson(title))}
            >
              add_circle_outline
            </button>
            <button
              className='material-icons text-[20px] ml-[8px] lg:hidden'
              onClick={toggling}
            >
              {!isOpen ? 'expand_more' : 'expand_less'}
            </button>
          </div>

          {products.length && products[0] ? (
            <span className='text-slate-400  text-base lg:text-lg'>
              Precios de fecha
              <span className='capitalize'>
                {format(products[0].prices[0].created_at, 'MMMM d, yyyy', {
                  locale: es,
                })}
              </span>
            </span>
          ) : null}
        </div>
        {windowWidth > BREAKPOINTS.lg && (
          <div className='flex md:flex-row flex-col lg:items-center  button-primary has-corners !bg-transparent !py-0  '>
            <button
              className='material-icons text-[24px] !px-[8px] !h-full '
              onClick={() => dispatch(showAddToComparisson(title))}
            >
              add_circle_outline
            </button>

            <span className='h-[32px] w-[1px] bg-slate-900' />
            <button
              className='material-icons text-[24px] !px-[8px] !h-full'
              onClick={() => dispatch(removeComparison(title))}
            >
              delete_outline
            </button>
          </div>
        )}
      </div>

      <div
        className={cx(
          'grid grid-cols-2   2xl:grid-cols-4  gap-[12px] md:gap-[32px] w-full align-center accordion',
          {
            collapsed: !isOpen,
            'xl:grid-cols-4': !sidebarOpen,
            'xl:grid-cols-3': sidebarOpen,
            'lg:grid-cols-3': !sidebarOpen,
            'lg:grid-cols-2': sidebarOpen,
          }
        )}
      >
        {products.map(item => (
          <ProductCard key={uniqueId()} {...item} />
        ))}

        {products.length > 1 && (
          <div className='col-span-2 md:col-span-1 flex flex-col justify-center md:border-0 mt-[16px] md:mt-0 border-[2px] border-slate-200 p-[16px] md:p-0'>
            <div className='h-[280px] w-full '>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData}>
                  <Bar dataKey='Precio' maxBarSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.value]} />
                    ))}
                  </Bar>
                  <YAxis />
                  <XAxis dataKey={'name'} />
                  <Tooltip cursor={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='mt-[16px] md:mt-[32px] w-full'>
              <h3 className='text-base text-slate-500 mb-[8px]'>
                {cheapestItem.product_name}
              </h3>
              <h4 className='text-lg lg:text-xl text-slate-500 mb-[8px]'>
                <b
                  className='mr-[8px]'
                  style={{ color: COLORS[cheapestItem.value] }}
                >
                  {cheapestItem.percentageCheaper}%
                </b>
                Mas barato
              </h4>
              <span
                style={{ color: COLORS[cheapestItem.value] }}
                className='flex items-center gap-[8px]'
              >
                <span className='w-[24px] h-[24px] rounded-[50%] border-[2px] border-solid border-slate-200 '>
                  <img
                    className='dropdown-img h-full mx-auto block'
                    src={`/images/${cheapestItem.value}.ico`}
                  />
                </span>
                {cheapestItem.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComparison;

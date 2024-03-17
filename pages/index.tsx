import cx from 'classnames';
import { useEffect } from 'react';
import Row from '../src/components/Row';
import Container from '../src/components/container';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import uniqueId from 'lodash/uniqueId';
import ProductCard from '../src/components/product-card';
import useDeviceSize from '../src/hooks';
import { BREAKPOINTS } from '../src/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../src/store/products/slice';
import { RootState } from '../src/store';
import FindIcon from '../src/components/icons/find';
import CompareIcon from '../src/components/icons/compare';
import ShopIcon from '../src/components/icons/shop';

import Link from 'next/link';

export default function Desktop<NextPage>() {
  // const [showSidebar, toggleSidebar] = useState(false);
  const dispatch = useDispatch();

  const { windowWidth } = useDeviceSize();

  const sidenavToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    if (windowWidth > BREAKPOINTS.xl) {
      sidenavToggle();
    }
  }, [windowWidth]);

  const SAMPLE_DATA = {
    'Fajita de Res': [
      {
        product_id: '14e0aa87-24ce-4338-a2f1-20cb18b54d8d',
        supermercado: 'jumbo',
        product_name: 'F.M. De Res, Lb',
        product_url: 'https://jumbo.com.do/f-m--de-res-lb-9982800441.html',
        img_url:
          'https://jumbo.com.do/pub/media/catalog/product/cache/e5145626c3f3275a7b4b1f65af9095fa/2/8/2800441-A_1.jpg',
        slug: 'f-m--de-res-lb-9982800441',
        brand: null,
        created_at: '2024-03-12T21:49:18.204Z',
        prices: [
          {
            price_id: '55349d16-2d4a-4a6e-b130-417b480fa812',
            product_id: '14e0aa87-24ce-4338-a2f1-20cb18b54d8d',
            list_price: '379.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T22:19:19.442Z',
          },
          {
            price_id: '1df7ac48-aff4-4e45-9331-0041c3eb45b6',
            product_id: '14e0aa87-24ce-4338-a2f1-20cb18b54d8d',
            list_price: '379.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T22:17:03.841Z',
          },
          {
            price_id: 'a7ddafd3-1daf-433c-8c1a-220d51ab4db1',
            product_id: '14e0aa87-24ce-4338-a2f1-20cb18b54d8d',
            list_price: '379.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T21:49:18.204Z',
          },
          {
            price_id: 'dbbe58d3-80f0-4a92-9e9f-403dad16a3a2',
            product_id: '14e0aa87-24ce-4338-a2f1-20cb18b54d8d',
            list_price: '379.95',
            discounted_price: '0.00',
            created_at: '2024-03-13T02:46:25.087Z',
          },
        ],
      },
      {
        product_id: 'ac347532-933b-451e-b035-cf3499d9d487',
        supermercado: 'la-sirena',
        product_name: 'BISTEC FM DE RES LB',
        product_url: 'https://sirena.do/products/index/bistec-fm-de-res-lb',
        img_url:
          'https://assets-sirenago.s3-us-west-1.amazonaws.com/product/thumbs/00/00/03/36/3369f60dab306b60ed4b357954b27e2b.png',
        slug: '/carne-de-res',
        brand: null,
        created_at: '2024-03-08T04:48:02.817Z',
        prices: [
          {
            price_id: 'a28e6833-2127-496e-b9c1-543abdc9d85c',
            product_id: 'ac347532-933b-451e-b035-cf3499d9d487',
            list_price: '309.00',
            discounted_price: '0.00',
            created_at: '2024-03-08T04:48:02.817Z',
          },
        ],
      },
      {
        product_id: '77f76a6f-14ac-4ec9-a247-020ac92d12d5',
        supermercado: 'nacional',
        product_name: 'F.M. De Res, Lb',
        product_url:
          'https://supermercadosnacional.com/carnes-pescados-y-mariscos/carnes/res/f-m-de-res-lb',
        img_url:
          'https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/8/2800441-1.jpg',
        slug: '/carnes-pescados-y-mariscos/carnes/res',
        brand: 'AGRO CCN',
        created_at: '2024-03-08T04:48:24.135Z',
        prices: [
          {
            price_id: '06c3f9d3-1991-4d6b-8bbd-bf9d79acaa27',
            product_id: '77f76a6f-14ac-4ec9-a247-020ac92d12d5',
            list_price: '379.95',
            discounted_price: '0.00',
            created_at: '2024-03-08T04:48:24.135Z',
          },
        ],
      },
    ],
    Granola: [
      {
        product_id: 'bbd8f704-1b55-40cf-87a4-39ebfa5890f6',
        supermercado: 'jumbo',
        product_name: 'Granola Lider 350 Gr',
        product_url:
          'https://jumbo.com.do/granola-lider-350-gr-9982206241.html',
        img_url:
          'https://jumbo.com.do/pub/media/catalog/product/cache/e5145626c3f3275a7b4b1f65af9095fa/2/2/2206241-A_1.jpg',
        slug: 'granola-lider-350-gr-9982206241',
        brand: null,
        created_at: '2024-03-12T21:49:18.173Z',
        prices: [
          {
            price_id: '0a3c9239-f244-41b1-9e00-3a445adbf0c4',
            product_id: 'bbd8f704-1b55-40cf-87a4-39ebfa5890f6',
            list_price: '129.95',
            discounted_price: '0.00',
            created_at: '2024-03-13T02:46:25.044Z',
          },
          {
            price_id: 'ec63f28f-6ff7-4916-96d1-85aa7a1dd2c5',
            product_id: 'bbd8f704-1b55-40cf-87a4-39ebfa5890f6',
            list_price: '129.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T22:17:03.841Z',
          },
          {
            price_id: '0ad5dd79-b969-4969-8e5c-2d56c73a6eb8',
            product_id: 'bbd8f704-1b55-40cf-87a4-39ebfa5890f6',
            list_price: '129.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T22:19:19.431Z',
          },
          {
            price_id: '1acb84d4-5172-4459-8fa6-0229ebc912b7',
            product_id: 'bbd8f704-1b55-40cf-87a4-39ebfa5890f6',
            list_price: '129.95',
            discounted_price: '0.00',
            created_at: '2024-03-12T21:49:18.173Z',
          },
        ],
      },
      {
        product_id: '87e34cc3-348c-4ccd-9355-b8ca4edc6b21',
        supermercado: 'la-sirena',
        product_name: 'GRANOLA WALA 454 GR',
        product_url: 'https://sirena.do/products/index/granola-wala-454-gr',
        img_url:
          'https://assets-sirenago.s3-us-west-1.amazonaws.com/product/thumbs/00/00/57/a0/6256f82179d52b9d7c5d9d97e5711528.png',
        slug: '/cereales-y-avenas',
        brand: null,
        created_at: '2024-03-08T04:48:03.411Z',
        prices: [
          {
            price_id: 'daf667cc-51bd-4823-8332-1f14d6cc7eef',
            product_id: '87e34cc3-348c-4ccd-9355-b8ca4edc6b21',
            list_price: 95.0,
            discounted_price: '0.00',
            created_at: '2024-03-08T04:48:03.411Z',
          },
        ],
      },
      {
        product_id: '955ee508-8ec7-4e04-9d93-5ab2acdaee64',
        supermercado: 'nacional',
        product_name: 'Granola Natural Bioeva 380G',
        product_url:
          'https://supermercadosnacional.com/despensa/desayuno/cereales-y-granolas/granola-natural-bioeva-380g',
        img_url:
          'https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/1/2159337-1.jpg',
        slug: '/despensa/desayuno/cereales-y-granolas',
        brand: 'BIO EVA',
        created_at: '2024-03-08T04:48:27.148Z',
        prices: [
          {
            price_id: 'b34a0c7c-3eac-4879-afd2-18a9b1c00153',
            product_id: '955ee508-8ec7-4e04-9d93-5ab2acdaee64',
            list_price: 184.95,
            discounted_price: 0.0,
            created_at: '2024-03-08T04:48:27.148Z',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Row className='bg-gold hero-section !pb-[0]'>
        <Container className='relative z-[2]'>
          <div className='flex  flex-col items-center mx-auto  gap-[20px] lg:gap-0 max-w-[900px]'>
            <div className='w-full  mb-[0] lg:mb-[32px]'>
              <h1 className='mt-[64px] lg:mt-0 text-xl lg:text-3xl xl:text-[46px] font-black text-center font-inter mb-[20px] lg:mb-[32px]'>
                ¡Encuentra y compara precios de los productos que necesitas!
              </h1>

              <p className='text-lg lg:text-[24px] text-slate-900 leading-relaxed font-medium text-center xl:px-[32px]'>
              ¿Cuánto cuesta un litro de ron? ¿Cómo ahorrar en tu lista de compras?
              ¿Cuál supermercado tiene la avena más económica?
              </p>
              {/* <p className='text-lg lg:text-[24px] text-slate-900 leading-relaxed text-center font-medium '>
                Todas estas preguntas las respondes con <u>Carobarato</u>.
              </p> */}

              <Link
                className='button-primary has-corners gold max-w-[220px] red mx-auto mt-[24px] lg:mt-[32px]'
                href='/comparar'
              >
                Comparar
              </Link>
            </div>

            <div className='has-corners alt '>
              {windowWidth > BREAKPOINTS.lg ? (
                <video
                  className=' w-full '
                  src='/images/how-to-use-desktop.mp4'
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <video
                  className=' w-full '
                  src='/images/how-to-use-mobile.mp4'
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
          </div>
        </Container>
      </Row>

      <Row className='bg-[#FFFEE7] '>
        <Container className='lg:py-[64px]'>
          <div className='lg:max-w-[75%] xl:max-w-[50%] mb-[32px] lg:mb-[64px]'>
            <h2 className='text-xl lg:text-2xl xl:text-[48px] font-black mb-[32px] text-xl'>
              Super sencillo
            </h2>

            <h3 className='text-lg lg:text-xl xl:text-2xl font-regular text-slate-600 leading-relaxed'>
              Esta es tu herramienta de comparación de articulos de la canasta
              basica con los precios mas actualizados.
            </h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-[32px] xl:grid-cols-3 '>
            <div className='instructive bg-white p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <FindIcon />
              </span>
              <h4 className='text-[32px] font-black mb-[24px]'>Encuentra</h4>
              <p className='text-[24px] mb-[16px]'>
                Ingresa el producto que buscas.
              </p>
            </div>
            <div className='instructive bg-white p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <CompareIcon />
              </span>
              <h4 className='text-[32px] font-black mb-[24px]'>Compara</h4>
              <p className='text-[24px] mb-[16px]'>
                Revisa y mide los precios uno al lado del otro.
              </p>
            </div>
            <div className='instructive bg-white p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <ShopIcon />
              </span>
              <h4 className='text-[32px] font-black mb-[24px]'>
                Decide con certeza
              </h4>
              <p className='text-[24px] mb-[16px]'>
                Te mostramos dónde está el ahorro.
              </p>
            </div>
          </div>
        </Container>
      </Row>
      <Row>
        <Container>
          {Object.entries(SAMPLE_DATA).map(([key, products]) => {
            return (
              <>
                <div className='mb-[24px] md:mb-[64px] border-b border-slate-200 md:border-0 '>
                  <div className='flex flex-col md:flex-row flex-wrap  items-center justify-between mb-[20px] lg:mb-[32px] gap-[24px]'>
                    <div className='inline-flex md:flex-row flex-col lg:items-end gap-[8px] lg:gap-[16px] w-full md:w-auto'>
                      <div className='flex w-full md:w-auto items-center'>
                        <h2 className=' font-bold text-lg lg:text-2xl leading-none'>
                          {key}
                        </h2>

                        <span className='comparison-count mx-[8px] lg:hidden'>
                          {products.length}
                        </span>
                      </div>

                      {products.length && products[0] ? (
                        <span className='text-slate-400  text-base lg:text-lg'>
                          Precios de fecha{' '}
                          <span className='capitalize'>
                            {format(
                              products[0].prices[0].created_at,
                              'MMMM d, yyyy',
                              {
                                locale: es,
                              }
                            )}
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className={cx(
                      'grid grid-cols-2  lg:grid-cols-3  2xl:grid-cols-4  gap-[12px] md:gap-[32px] w-full align-center accordion'
                    )}
                  >
                    {products.map(item => (
                      <ProductCard key={uniqueId()} {...item} />
                    ))}
                  </div>
                </div>
              </>
            );
          })}
        </Container>
      </Row>
    </>
  );
}

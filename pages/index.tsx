import cx from 'classnames';
import { useEffect, useState } from 'react';
import Row from '../src/components/Row';
import Container from '../src/components/container';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import uniqueId from 'lodash/uniqueId';
import ProductCard from '../src/components/product-card';
import ProductsGridElement from '../src/components/products-grid-controlled';
import useDeviceSize from '../src/hooks';
import { BREAKPOINTS } from '../src/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../src/store/products/slice';
import { RootState } from '../src/store';
import FindIcon from '../src/components/icons/find';
import CompareIcon from '../src/components/icons/compare';
import ShopIcon from '../src/components/icons/shop';
import Head from 'next/head';
import Link from 'next/link';
import ApiService from '../src/utils/apiService';
import { Product } from '../src/types';
export default function Desktop<NextPage>() {
  // const [showSidebar, toggleSidebar] = useState(false);
  const dispatch = useDispatch();

  const { windowWidth } = useDeviceSize();
const [recommended_products, set_recommended_products] = useState<any>([]);
  const sidenavToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    if (windowWidth > BREAKPOINTS.xl) {
      sidenavToggle();
    }
  }, [windowWidth]);

  const SAMPLE_SEARCH = [
    [
      {
        "product": "CAMARON CRUDO WALA 21/25",
        "supermarket": "sirena"
      },
      {
        "product": "Cola De Camarón Crudo 16/20 Congelada, Lb",
        "supermarket": "nacional"
      },
      {
        "product": "Camarón Crudo 16/20 Líder 1 Lb",
        "supermarket": "jumbo"
      },
      {
        "product": "Vima Camarón Crudo Congelado 21-25 Bolsa 1 kg / 2.2 lb",
        "supermarket": "pricesmart"
      }
    ],
    [
      {
           "supermarket": "sirena",
           "product": "PLATANO VERDE UND"
         },
         {
           "supermarket": "jumbo",
           "product": "Plátano Verde"
         },
         {
           "supermarket": "nacional",
           "product": "Platano Verde"
         },
         {
           "supermarket": "pricesmart",
           "product": "Selection Plátano Verde 8 Unidades"
         }
     ],
     [
      {
          "supermarket": "sirena",
          "product": "RON XV RESERVA BRUGAL 700 ML"
        },
        {
          "supermarket": "nacional",
          "product": "Ron Xv Brugal 70 Cl"
        },
         {
          "supermarket": "jumbo",
          "product": "Ron Xv Brugal 70 Cl"
        },
        {
          "supermarket": "pricesmart",
          "product": "Brugal Ron Reserva Especial XV en Botella de 700 ml"
        }
    ]

  ]

  const fetchRecommendations = async () => {
    const results = await Promise.all( SAMPLE_SEARCH.map( async (array) => {
      const { data } = await ApiService.getSpecificProducts(array);
      return data
    }))

    const payload : {[key : string] : Product[]} = {
      'Camarones Crudos': results[0],
      'Plátano Verde': results[1],
      'Ron Brugal XV': results[2]
    }
    set_recommended_products(payload)
  }

  useEffect(() => {
    if(recommended_products.length === 0){ 
      fetchRecommendations()
    }

  },[recommended_products])
  return (
    <>
      <Head>
        <title>Encuentra y compara productos | Carobarato</title>
        <meta
          property='og:title'
          content='Encuentra y compara productos | Carobarato'
        />
        <meta
          property='twitter:title'
          content='Encuentra y compara productos | Carobarato'
        />

        <meta
          name='description'
          content='Ingresa el producto que buscas, revisa y mide los precios uno al lado del otro & descubre dónde está el ahorro.'
        />

        <meta
          property='og:description'
          content='Ingresa el producto que buscas, revisa y mide los precios uno al lado del otro & descubre dónde está el ahorro.'
        />
      </Head>
      <Row className='bg-gold hero-section !pb-[0] lg:pt-[124px]'>
        <Container className='relative z-[2]'>
          <div className='flex  flex-col items-center mx-auto  gap-[20px] lg:gap-0 max-w-[900px]'>
            <div className='w-full  mb-[0] lg:mb-[32px]'>
              <h1 className='mt-[64px] lg:mt-0 text-[28px] lg:text-3xl xl:text-[46px] font-black text-center font-inter mb-[20px] lg:mb-[32px]'>
                ¡Encuentra y compara precios de los productos que necesitas!
              </h1>

              <p className='text-lg lg:text-[24px] text-slate-900 leading-relaxed font-medium text-center xl:px-[32px]'>
                ¿Cuánto cuesta un litro de ron? ¿Cómo ahorrar en tu lista de
                compras? ¿Cuál supermercado tiene la avena más económica?
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
        <div className='cutout'/>
      </Row>

      <Row className='bg-[#FFFEE7] '>
        <Container className='lg:py-[64px]'>
          <div className='lg:max-w-[75%] xl:max-w-[50%] mb-[32px] lg:mb-[64px]'>
            <h2 className='text-[28px] xl:text-[48px] font-black mb-[32px] text-xl'>
              Super sencillo
            </h2>

            <h3 className='text-lg lg:text-xl xl:text-2xl font-regular text-slate-600 leading-relaxed'>
              Esta es tu herramienta de comparación de articulos de la canasta
              basica con los precios mas actualizados.
            </h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-[32px] xl:grid-cols-3 '>
            <div className='instructive bg-white p-[24px] lg:p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <FindIcon />
              </span>
              <h4 className='text-[20px] lg:text-[32px] font-black mb-[16px] lg:mb-[24px]'>Encuentra</h4>
              <p className='text-[18px] lg:text-[24px] mb-[16px]'>
                Ingresa el producto que buscas.
              </p>
            </div>
            <div className='instructive bg-white p-[24px] lg:p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <CompareIcon />
              </span>
              <h4 className='text-[20px] lg:text-[32px] font-black mb-[16px] lg:mb-[24px]'>Compara</h4>
              <p className='text-[18px] lg:text-[24px] mb-[16px]'>
                Revisa y mide los precios uno al lado del otro.
              </p>
            </div>
            <div className='instructive bg-white p-[24px] lg:p-[32px]  border-solid border-slate-200  relative has-corners alt'>
              <span className='icon mb-[24px]'>
                <ShopIcon />
              </span>
              <h4 className='text-[20px] lg:text-[32px] font-black mb-[16px] lg:mb-[24px]'>
                Decide con certeza
              </h4>
              <p className='text-[18px] lg:text-[24px] mb-[16px]'>
                Te mostramos dónde está el ahorro.
              </p>
            </div>
          </div>
        </Container>
      </Row>
      <Row>
        <Container>
          <h2 className='text-[28px] xl:text-[48px] font-black mb-[32px]'>
            Búsquedas populares
          </h2>
          {Object.keys(recommended_products).length ? (
            Object.entries(recommended_products).map(([key, products]) => {
              return <ProductsGridElement key={uniqueId()} title={key} products={products}/>;
            })
          ) : null }
        </Container>
      </Row>
    </>
  );
}

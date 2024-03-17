import cx from 'classnames';
import { useEffect, useState } from 'react';
import ProductsGrid from '../src/components/products-grid';
import Sidebar from '../src/components/sidebar';
import Row from '../src/components/Row';
import Container from '../src/components/container';
import Link from 'next/link';
import useDeviceSize from '../src/hooks';
import { BREAKPOINTS } from '../src/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../src/store/products/slice';
import { RootState } from '../src/store';
import AddToComparisonModal from '../src/components/add-to-comparison-modal';
export default function Desktop<NextPage>() {
  // const [showSidebar, toggleSidebar] = useState(false);
  const dispatch = useDispatch();
  const { sidebarOpen, addToComparisson } = useSelector(
    (state: RootState) => state.products
  );

  const { windowWidth } = useDeviceSize();

  const sidenavToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    if (windowWidth > BREAKPOINTS.xl) {
      sidenavToggle();
    }
  }, [windowWidth]);
  return (
    <>
      <div>
        <Row className='bg-beige'>
          <Container>
            <div className='flex lg:flex-row flex-col items-start justify-between gap-[20px] lg:gap-0'>
              <div>
                <h1 className=' text-xl lg:text-3xl font-black font-inter mb-[20px] lg:mb-[32px]'>
                  Compara tus productos preferidos
                </h1>

                <p className='text-lglg:text-[24px] text-slate-400 font-regular '>
                  Encuentra el precio mas barato del articulo que buscas en tus
                  supermercados de preferencia.
                </p>
              </div>

              <div className='lg:ml-auto'>
                <button
                  className='button-primary has-corners alt'
                  onClick={() => sidenavToggle()}
                >
                  Comparaciones
                  <img
                    src='/images/view_sidebar.svg'
                    alt='view_sidebar'
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            </div>
          </Container>
        </Row>

        <Row>
          <Container>
            <ProductsGrid />
          </Container>
        </Row>
      </div>
      <div className={cx(['sidebar-container', { show: sidebarOpen }])}>
        <Sidebar />
      </div>

      {addToComparisson && <AddToComparisonModal />}
    </>
  );
}

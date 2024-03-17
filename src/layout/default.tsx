import Container from '../components/container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import cx from 'classnames';
import Row from '../components/Row';
import Head from 'next/head';
const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isHome = router.pathname === '/' || router.pathname === '/home';
  const { sidebarOpen } = useSelector((state: RootState) => state.products);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:site_name' content='Carobarato' />
        <meta property='twitter:site' content='Carobarato' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://carobarato.com' />
        <meta property='twitter:url' content='https://carobarato.com' />
        <meta
          property='og:image'
          content='/images/carobarato-og-thumbnail.png'
        />
      </Head>
      <div
        className={cx('app-body w-full  relative bg-white overflow-hidden ', {
          'has-sidebar': sidebarOpen && !isHome,
        })}
      >
        <header className={`w-full   ${isHome ? 'is-home' : ''}`}>
          <Container className='flex flex-row items-center justify-between'>
            <Link
              href='/'
              className='flex flex-row items-start justify-end  relative'
            >
              <img
                className='w-[144px] md:w-[172px]'
                alt=''
                src='/images/loguito.svg'
              />
            </Link>
            <div className='flex flex-row items-start justify-start gap-[64px] py-[8px] md:py-[12px]'>
              <Link href='/comparar' className='relative font-bold py-[8px]'>
                Comparar
              </Link>
              <Link
                href={'/#about'}
                className='relative whitespace-nowrap font-bold py-[8px] hidden lg:inline-block '
              >
                Acerca de la herramienta
              </Link>
            </div>
          </Container>
        </header>
        {children}

        <footer>
          <Row>
            <Container>
              <div className='flex flex-row items-start justify-between gap-[20px]'>
                <div>
                  <p className='text-slate-400 font-regular '>
                    © {new Date().getFullYear()}. Hecho por Christopher Santana
                    & Lesther Santana.
                  </p>
                </div>
              </div>
            </Container>
          </Row>
        </footer>
      </div>
    </>
  );
};

export default Layout;

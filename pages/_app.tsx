import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import Layout from '../src/layout/default';
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { PostHogProvider } from 'posthog-js/react'

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined' 
// && process.env.ENVIRONMENT === 'production'
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    console.log('TEST', process.env.ENVIRONMENT)
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])



  return (
    <PostHogProvider client={posthog}>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </PostHogProvider>
  );
}

export default MyApp;

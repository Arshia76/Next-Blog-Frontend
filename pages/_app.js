import { useState } from 'react';
import '../styles/globals.css';
import '../styles/Select/Select.css';
import '../public/Resource/Stylesheets/reset.css';
import '../public/Resource/Stylesheets/config.css';
import '../public/Resource/Stylesheets/responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/common/Layout';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ fontSize: '14px' }}
          />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

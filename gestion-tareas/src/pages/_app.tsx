import '../../styles/globals.css';

import { AuthContextProvider } from '../controllers/AuthContext';


import { ReactElement, ComponentType } from 'react';

function MyApp({ Component, pageProps }: { Component: ComponentType<any>, pageProps: any }): ReactElement {
    return (
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      );
}

export default MyApp;
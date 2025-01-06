import type { AppProps } from 'next/app';
import '@/assets/scss/globals.scss';
import StoreProvider from '@/stores/provider';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import '@/assets/scss/components/toast.scss';
import Toast from '@/components/atoms/Toast';

toastConfig({
  duration: 4000,
  maxVisibleToasts: 1,
  position: 'bottom-right',
  zIndex: 9999,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Toast />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

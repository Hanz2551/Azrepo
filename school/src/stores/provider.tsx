'use client';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './index';
type Props = {
  children: React.ReactNode;
};

const StoreProvider: React.FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
export default StoreProvider;

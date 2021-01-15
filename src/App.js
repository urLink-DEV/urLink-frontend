import React from 'react';
import { Router } from 'react-chrome-extension-router';

import CategoryPage from './pages/category';
import GetStartPage from './pages/Start';

import { getAccessToken } from '@commons/http/auth';

function App() {
  return <Router>{getAccessToken() ? <CategoryPage /> : <GetStartPage />}</Router>;
}

export default App;

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/private/NotFound/NotFound';
import OverviewPage from './pages/private/Overview/Overview';
import CategoryPage from './pages/private/Category/Category';
import AttributePage from './pages/private/Attribute/Attribute';
import GroupSetAttributePage from './pages/private/GroupSetAttribute/GroupSetAttribute';
import ConfirmProductsPage from './pages/private/ConfirmProducts/ConfirmProducts';
import DetailConfirmProducts from './pages/private/ConfirmProducts/DetailConfirmProducts';
import MerchantList from './pages/private/Merchants/MerchantList';
import MerchantDetail from './pages/private/Merchants/MerchantDetail';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={['/', '/login']} component={LoginPage} />
        <Route exact path={'/admin'} component={OverviewPage} />
        <Route exact path={'/admin/category'} component={CategoryPage} />
        <Route exact path={'/admin/attributes'} component={AttributePage} />
        <Route exact path={'/admin/set-attributes'} component={GroupSetAttributePage} />
        <Route exact path={'/staff/confirm-products'} component={ConfirmProductsPage} />
        <Route exact path={'/staff/confirm-products/:id'} component={DetailConfirmProducts} />
        <Route exact path={'/staff/merchants'} component={MerchantList} />
        <Route exact path={'/staff/merchant-detail/:id'} component={MerchantDetail} />
        <Route exact path={'/staff/merchant-add'} component={MerchantDetail} />
        <Route exact path={'*'} component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

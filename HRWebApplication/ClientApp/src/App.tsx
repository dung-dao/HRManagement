import React, {Component} from 'react';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import './App.css';
import { Button } from 'antd';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (<div>
            <Button type="primary">Button</Button>
        </div>);
    }
}

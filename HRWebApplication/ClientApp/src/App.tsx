import React, {Component} from 'react';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import './App.css';
import { Button } from 'antd';
import {ApiClient, WeatherForecast} from './services/ApiClient';

export default class App extends Component {
    componentDidMount() {
        const client = new ApiClient();
        client.getAllWeather().then(res => console.log(res)).catch(err => console.log("acess denied"));
    }

    static displayName = App.name;

    render() {
        return (<div>
            <Button type="primary">Button</Button>
        </div>);
    }
}

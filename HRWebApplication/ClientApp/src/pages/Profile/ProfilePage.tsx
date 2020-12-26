import React from 'react';
import { Col, Form, Input, message, Row, Tabs } from 'antd';
import AppBody from '../../components/Layouts/AppBody';

import authService from 'services/AuthService';
import { UsersClient } from 'services/ApiClient';
import { useTry } from 'hooks';

export function ProfilePage(props) {
  // const apiUsers = React.useRef(new UsersClient());

  return <AppBody title="Tài khoản">{`Hello ${authService.getUserProfile()?.username}`}</AppBody>;
}

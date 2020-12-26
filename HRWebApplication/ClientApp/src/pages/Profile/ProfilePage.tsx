import React from 'react';
import AppBody from 'components/Layouts/AppBody';

import { useAuth } from 'context/AuthContext';

export function ProfilePage(props) {
  const { userProfile } = useAuth();

  return <AppBody title="Tài khoản">{`Hello ${userProfile?.username}`}</AppBody>;
}

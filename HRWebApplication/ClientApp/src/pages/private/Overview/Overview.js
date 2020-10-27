import React, { Component } from 'react';
import AppBody from '../../../components/Layouts/AppBody';
import * as Constant from '../../../common/Constant';

class OverviewPage extends Component {
  render() {
    return (
      <AppBody selectedMenu={Constant.MENU.OVERVIEW_MENU} title="Tổng quan">
        <div>main page aka overview</div>
      </AppBody>
    );
  }
}

export default OverviewPage;

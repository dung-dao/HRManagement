//@ts-nocheck
import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import {
  IServerSideDatasource,
  Grid,
  IServerSideGetRowsParams,
  GridReadyEvent,
} from 'ag-grid-community';
import { ColumnApi, GridApi } from 'ag-grid-community';
import AppBody from 'components/Layouts/AppBody';
import { Api } from './mock-api';

class FakeServer {
  constructor(allData) {
    this.data = allData;
  }

  extractRowsFromData(groupKeys, data) {
    console.log('> : FakeServer -> extractRowsFromData -> groupKeys', groupKeys)
    if (groupKeys.length === 0) {
      return data.map(function (d) {
        return {
          group: !!d.children,
          ...d,
        };
      });
    }
    var key = groupKeys[0];
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === key) {
        return this.extractRowsFromData(groupKeys.slice(1), data[i].children.slice());
      }
    }
  }

  getData(request) {
    return this.extractRowsFromData(request.groupKeys, this.data);
  }
}

class ServerSideDataSource implements IServerSideDatasource {
  constructor(fakeServer) {
    this.fakeServer = fakeServer;
  }

  getRows(params: IServerSideGetRowsParams) {
    var rows = this.fakeServer.getData(params.request);
    setTimeout(function () {
      params.successCallback(rows, rows.length);
    }, 200);
  }
}

const api = new Api();

export default () => {
  // const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params: GridReadyEvent) => {
    // setGridApi(params.api);
    // setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      var fakeServer = new FakeServer(data);
      var datasource = new ServerSideDataSource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    api.getOrganizationUnits().then((data) => {
      updateData(data);
    });
  };

  return (
    <AppBody>
      <div style={{ width: '100%', height: '100%' }}>
        <div
          // id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 240,
              resizable: true,
            }}
            domLayout="autoHeight" // https://stackoverflow.com/a/64039573/9787887
            autoGroupColumnDef={{
              cellRendererParams: {
                innerRenderer: function (params) {
                  return params.data.organizationName;
                },
              },
            }}
            rowModelType={'serverSide'}
            treeData={true}
            animateRows={true}
            isServerSideGroup={function (dataItem) {
              return dataItem.group;
            }}
            getServerSideGroupKey={function (dataItem) {
              return dataItem.id;
            }}
            onGridReady={onGridReady}
            groupDefaultExpanded={-1}
          >
            <AgGridColumn field="organizationName" />
            <AgGridColumn field="numberOfPeople" />
            <AgGridColumn field="leader" />
          </AgGridReact>
        </div>
      </div>
    </AppBody>
  );
};

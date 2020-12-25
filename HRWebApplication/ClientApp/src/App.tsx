import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound/NotFound';
import OrganizationStructure from './pages/OrganizationStructure/OrganizationStructure';
import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeDetail from './pages/Employee/EmployeeDetail/EmployeeDetail';
import ErrorBoundary from './components/ErrorBoundary';
import { WorkTypePage } from './pages/WorkType';
import { JobCategoryPage } from './pages/JobCategory';
import { JobTitlePage } from './pages/JobTitle';
import { EmployeeAddPage } from './pages/EmployeeAdd';
import { LeaveTypePage } from './pages/LeaveType';
import { Leave2TypePage } from './pages/Leave2Type';
import { Leave2ListPage } from './pages/Leave2List';
import { EmployeeEditPage } from './pages/EmployeeEdit';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <Switch>
          <Route exact path={['/', '/login']} component={LoginPage} />
          <Route exact path={'/organization'} component={OrganizationStructure} />
          <Route exact path={'/work-type'} component={WorkTypePage} />
          <Route exact path={'/leave-type'} component={LeaveTypePage} />
          <Route exact path={'/leave2-type'} component={Leave2TypePage} />
          <Route exact path={'/leave2-list'} component={Leave2ListPage} />
          <Route exact path={'/job-category'} component={JobCategoryPage} />
          <Route exact path={'/job-title'} component={JobTitlePage} />
          <Route exact path={'/employees'} component={EmployeeList} />
          <Route exact path={'/employee/new'} component={EmployeeAddPage} />
          <Route exact path={'/employee/:id'} component={EmployeeEditPage} />
          <Route exact path={'/employee/add-old'} component={EmployeeDetail} />
          <Route exact path={'/employee-edit/:employeeId/info'} component={EmployeeDetail} />
          <Route exact path={'/employee-edit/:employeeId/work'} component={EmployeeDetail} />
          <Route exact path={'*'} component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

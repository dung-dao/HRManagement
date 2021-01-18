import { FormProps } from 'antd/lib/form';

export * from './TabsPage';
export * from './AccountForm';
export * from './EmployeeInfo';
export * from './EmployeeWork';
export * from './LeaveForm';

export type FormType = 'create' | 'update' | 'read-only';

export type StandardFormProps<DataType> = FormProps<DataType> & {
  data: DataType | undefined;
  dataReady: boolean;
  type: FormType;
  displayLegend?: boolean;
  onSubmit?: (data: DataType) => Promise<void>;
  actionButtons?: any; //TODO: define better type
};

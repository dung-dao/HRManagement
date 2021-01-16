import { FormLabelAlign } from 'antd/lib/form/interface';

export const required = (label: string) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

export const formatCurrency = (input?: string): string => {
  // format currency using regex: https://coderwall.com/p/uccfpq/formatting-currency-via-regular-expression
  return String(input || '0').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export function formatSalary(salary: number | string) {
  return formatCurrency(toNumber(String(salary)).toString());
}

// should be called parseNumber()
export const toNumber = (input: string): number => {
  // Remove all NonNumber characters
  return +input.replace(/\D+/g, '');
};

export const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  validateTrigger: 'onBlur',
};

export const formItemLayoutWide = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  labelAlign: 'left' as FormLabelAlign,
  validateTrigger: 'onBlur',
};

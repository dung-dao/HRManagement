export const removeSlug = (url) => {
  return url.substring(0, /:|\/:/.exec(url)?.index);
  // The regex "/:|\/:/" means ": or /:"
  // Eg: /staff/merchant-detail/:id will become /staff/merchant-detail
};

export const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  validateTrigger: 'onBlur',
};

export const formItemLayoutWide = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  labelAlign: 'left',
  validateTrigger: 'onBlur',
};

export const required = (label) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

export const phoneRegex = /^(\+84|0|84)\d{9}$/;

export const formatCurrency = (input: number): string => {
  // format currency using regex: https://coderwall.com/p/uccfpq/formatting-currency-via-regular-expression
  return String(input).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
export const toNumber = (input: string): number => {
  // Remove all NonNumber characters
  return +input.replace(/\D+/g, '');
};

export type DetailPageType = 'add' | 'edit';

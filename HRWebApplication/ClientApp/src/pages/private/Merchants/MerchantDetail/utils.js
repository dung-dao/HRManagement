export const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
  labelAlign: 'left',
};

export const required = (label) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

export const removeSlug = (url) => {
  return url.substring(0, /:|\/:/.exec(url)?.index);
  // The regex "/:|\/:/" means ": or /:"
  // Eg: /staff/merchant-detail/:id will become /staff/merchant-detail
}

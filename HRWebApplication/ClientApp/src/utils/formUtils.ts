export const required = (label: string) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

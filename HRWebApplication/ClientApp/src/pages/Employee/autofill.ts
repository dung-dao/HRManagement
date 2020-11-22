import {randomBetween} from "common";
import moment from "moment";
import {EmployeeInfoFormType} from "pages/Employee/EmployeeInfoFormType";
import {FormInstance} from "antd/lib/form";

export function autofill(form: FormInstance) {
  const { name } = form.__INTERNAL__
  if (name === 'info') {
    form.setFieldsValue({
      id: 0,
      firstName: `Anh ${randomBetween(0, 999999)}`,
      lastName: 'Nguyễn Văn',
      dateOfBirth: moment(),
      sex: 'Male',
      nationalId: '123456789',
      personalEmail: 'nguyen.van.anh@gmail.com',
      workEmail: 'nguye.van.anh.at.work@gmail.com',
      address: '147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM',
      currentAddress: '147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM',
      phone: '84123456789'
    } as EmployeeInfoFormType)
  } else if (name === 'work') {
    form.setFieldsValue({
      startDate: moment('Sun Nov 22 2020 16:37:31 GMT+0700'),
      endDate: moment('Sun Nov 22 2022 16:37:31 GMT+0700'),
      salary: '7,000,000',
      jobTitle: '5',
      workType: '2',
      jobCategory: '1',
      unit: '7',
    })
  }
}

import React from 'react';
import {FormInstance} from "antd/lib/form";
import moment from "moment";
import {EmployeeInfoFormType} from "pages/Employee/EmployeeInfoFormType";
import {usePage} from "./PageProvider";
import {randomBetween} from "../../common";
import {Button, message} from "antd";
import {__DEV__} from "../../constants";

type FormActionProps = {
  form: FormInstance
  loading: boolean
}
export function EmployeeFormAction(props: FormActionProps) {
  const { form, loading } = props
  const { prevPage, currentPage, steps, setPosition } = usePage()
  const previous = () => {
    setPosition(form.getFieldsValue())
    prevPage()
  }
  const autofill = () => {
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

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
      {currentPage > 0 && (
        <Button onClick={previous}>
          Quay lại
        </Button>
      )}
      {currentPage < steps.length - 1 && (
        <Button type="primary" htmlType='submit' loading={loading}>
          Kế tiếp
        </Button>
      )}
      {currentPage === steps.length - 1 && (
        <Button type="primary" htmlType='submit' loading={loading}>
          Thêm nhân viên
        </Button>
      )}
      {__DEV__ && (
        <Button type="primary" onClick={autofill}>
          Autofill
        </Button>
      )}
    </div>
  )
}

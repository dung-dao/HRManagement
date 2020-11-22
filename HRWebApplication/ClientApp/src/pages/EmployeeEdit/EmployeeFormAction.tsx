import React from 'react';
import {FormInstance} from "antd/lib/form";
import {Button} from "antd";
import { useHistory } from 'react-router-dom';
import {__DEV__} from "../../constants";
import {autofill} from "../Employee";

type FormActionProps = {
  form: FormInstance
  loading: boolean
}
export function EmployeeFormAction(props: FormActionProps) {
  const { form, loading } = props
  const { name } = form.__INTERNAL__
  const history = useHistory()
  const fillForm = () => autofill(form)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
      <Button onClick={() => history.push('/employees')}>
        Quay lại
      </Button>
      <Button type="primary" htmlType='submit' loading={loading}>
        {
          name === 'info' ? 'Lưu thay đổi' : 'Thêm vị trí'
        }
      </Button>
      {__DEV__ && name === 'work' && (
        <Button type="primary" onClick={fillForm}>
          Autofill
        </Button>
      )}
    </div>
  )
}

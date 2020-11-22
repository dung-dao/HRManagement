// @ts-nocheck
import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Upload,
  Collapse,
  Timeline,
  DatePicker,
  Select,
  message,
} from 'antd';
import AppBody from 'components/Layouts/AppBody';
import ImgCrop from 'antd-img-crop';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import './EmployeeDetail.css';
import {
  EmployeesClient,
  WorkTypeClient,
  JobCategoryClient,
  JobTitleClient,
  OrganizationUnitsClient,
  PositionDTO,
  OrganizationUnitDTO,
  JobTitleDTO,
  JobCategoryDTO,
  WorkTypeDTO,
} from 'services/ApiClient';
// import DatePicker from 'components/DatePicker'
import moment from 'moment';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { organizationUnits } from 'pages/OrganizationStructure/mock-data';
import { Tabs } from 'antd';
import { InfoTab } from './InfoTab/InfoTab';
import { WorkTab } from './WorkTab/WorkTab';

function Index() {
  const [form] = Form.useForm();
  const apiEmployee = React.useRef(new EmployeesClient());
  const apiWorkType = React.useRef(new WorkTypeClient());
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const [workType, setWorkType] = React.useState<WorkTypeDTO[]>();
  const [jobCategory, setJobCategory] = React.useState<JobCategoryDTO[]>();
  const [jobTitle, setJobTitle] = React.useState<JobTitleDTO[]>();
  const [organization, setOrganization] = React.useState<OrganizationUnitDTO[]>();
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const [selectedWorkType, setSelectedWorkType] = React.useState<WorkTypeDTO>();
  const [selectedJobCategory, setSelectedJobCategory] = React.useState<JobCategoryDTO>();
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<JobTitleDTO>();
  const [selectedOrganization, setSelectedOrganization] = React.useState<OrganizationUnitDTO>();
  const [salary, setSalary] = React.useState<number>(0);
  const history = useHistory();

  // const [merchantData, setMerchantData] = React.useState(apiAllMerchants[0]);

  // const [fileList, setFileList] = React.useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]);

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  //
  // const handleSearch = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     form.validateFields((err, values) => {
  //       console.log('Received values of form: ', values);
  //     });
  //   },
  //   [form],
  // );
  //
  // const handleReset = useCallback(() => {
  //   form.resetFields();
  // }, [form]);
  //
  // const toggle = useCallback(() => {
  //   setExpand(!expand);
  // }, [expand]);
  //
  // // To generate mock Form.Item
  // const getFields = () => {
  //   const formItemLayout = {
  //     labelCol: { span: 5 },
  //     wrapperCol: { span: 19 },
  //   };
  //
  //   return [...data, ...data, ...data].map((merchant, i) => {
  //     return (
  //       <Col span={10} key={i}>
  //         <Form.Item {...formItemLayout} label={`Field ${i}`}>
  //           <Input placeholder="placeholder" />
  //         </Form.Item>
  //       </Col>
  //     );
  //   });
  // };
  const { pathname } = useLocation();
  const { employeeId } = useParams();

  type DetailPageType = 'add' | 'edit';
  const mapPageTypeToTitle: Record<DetailPageType, string> = {
    add: 'Thêm mới nhân viên',
    edit: 'Chỉnh sửa nhân viên',
  };

  const detailPageType: DetailPageType = pathname.includes('add')
    ? 'add'
    : pathname.includes('edit')
    ? 'edit'
    : undefined;

  React.useEffect(() => {
    // Fetch collections for Select.Option s
    apiWorkType.current
      .workType_GetAll()
      .then((data) => console.log('WorkType', data) || setWorkType(data))
      .catch((err) => console.log(err));
    apiJobCategory.current
      .jobCategory_GetAll()
      .then((data) => console.log('JobCategory', data) || setJobCategory(data))
      .catch((err) => console.log(err));
    apiJobTitle.current
      .jobTitle_GetAll()
      .then((data) => console.log('JobTitle', data) || setJobTitle(data))
      .catch((err) => console.log(err));
    apiOrganization.current
      .organizationUnits_GetAll()
      .then((data) => console.log('Organization', data) || setOrganization(data))
      .catch((err) => console.log(err));

    // Edit nhan vien
    if (detailPageType === 'edit') {
      // === Chi tiet nhan vien / Chinh sua nhan vien
      // -> Fetch nhanVienById
      // -> Fetch Position of Nhan Vien, -> Update selected of JobTitle, WorkType, JobCategory, OrganizationUnit
      // -> Fetch danh sach JobTitle
      // -> Fetch danh sach WorkType
      // -> Fetch danh sach JobCategory
      // -> Fetch danh sach OrganizationUnit

      apiEmployee.current
        .getEmployeeById(employeeId)
        .then((data) =>
          form.setFieldsValue({
            ...form.getFieldsValue(),
            ...data,
            dateOfBirth: moment(data.dateOfBirth),
          }),
        )
        .catch((err) => console.log(err));

      apiEmployee.current
        .employees_GetPosition(employeeId)
        .then((data) => console.log('positions', data) || setPositions(data))
        .catch((err) => console.log(err));

      apiEmployee.current
        .employees_GetCurrentPosition(employeeId)
        .then((data) => {
          console.log('current position', data);
          form.setFieldsValue({
            ...form.getFieldsValue(),
            startDate: moment(data.startDate),
            endDate: moment(data.endDate),
          });
          setSalary(data.salery);
          setSelectedJobCategory(data.jobCategory);
          setSelectedJobTitle(data.jobTitle);
          setSelectedWorkType(data.workType);
          setSelectedOrganization(data.unit);
        })
        .catch((err) => console.log(err));
    }
  }, [form, detailPageType, employeeId]);

  const onSubmitClick = () => {
    if (detailPageType === 'edit') {
      history.push('/employees');
    }
  };

  return (
    <AppBody title={mapPageTypeToTitle[detailPageType]}>
      <Tabs>
        <Tabs.TabPane tab="Thông tin" key={1}>
          <InfoTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Công việc" key={2}>
          <WorkTab />
        </Tabs.TabPane>
      </Tabs>
      <Col span={12}>
        <Row justify="end">
          <Button type="primary" htmlType="submit" onClick={onSubmitClick}>
            <LeftOutlined />
            Trở về
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={onSubmitClick}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <CheckOutlined /> Hoàn thành
          </Button>
        </Row>
      </Col>
    </AppBody>
  );
}

export default React.memo(Index);

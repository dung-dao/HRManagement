import React, { PropsWithChildren } from 'react';
import { UserDTO, UsersClient, EmployeeDTO } from 'services/ApiClient';
import { message } from 'antd';
import moment from 'moment';

export type ModifyProp<T extends {}, TFrom, TTo> = {
  [K in keyof T]: Exclude<T[K], undefined> extends TFrom
    ? TTo
    : Exclude<T[K], undefined> extends {}
    ? ModifyProp<T[K], TFrom, TTo>
    : T[K];
};

// Exclude<T[K], undefined> convert 'dateOfBirth?: Date | undefined' to 'dateOfBirth: Date'
// export type DateToMoment<T extends {}> = {
//   [K in keyof T]: Exclude<T[K], undefined> extends Date
//     ? moment.Moment
//     : Exclude<T[K], undefined> extends {}
//     ? DateToMoment<T[K]>
//     : T[K];
// };

// type HasDate = {
//   date: Date;
//   abc?: Date;
//   xxx: null;
// };

// type XXX = DateToMoment<EmployeeDTO>;

// // TODO: Refactor this by a Ultility type
// type UserDTOForForm = Omit<UserDTO, 'employee'> & {
//   employee?: Omit<EmployeeDTO, 'dateOfBirth'> & {
//     dateOfBirth?: moment.Moment;
//   };
// };

type UserDTOForForm = ModifyProp<UserDTO, Date, moment.Moment>;

type PageContextData = {
  apiUsers: UsersClient;
  user: UserDTOForForm | undefined;
  userReady: boolean;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = PropsWithChildren<{}>;

export function PageProvider(props: Props) {
  const { children } = props;

  const apiUsers = React.useRef(new UsersClient());
  const [user, setUser] = React.useState<UserDTOForForm>();
  const [userReady, setUserReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    apiUsers.current
      .profile()
      .then((data) => {
        const user = (data as unknown) as UserDTOForForm;
        if (user.employee?.dateOfBirth)
          user.employee.dateOfBirth = moment(user.employee?.dateOfBirth);
        setUser(user);
      })
      .catch((err) => {
        console.log('Cannot get user data', err);
        message.error('Không thể lấy thông tin tài khoản');
      })
      .finally(() => {
        setUserReady(true);
      });
  }, []);

  return (
    <PageContext.Provider
      value={{
        apiUsers: apiUsers.current,
        user,
        userReady,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return React.useContext(PageContext) || {};
}

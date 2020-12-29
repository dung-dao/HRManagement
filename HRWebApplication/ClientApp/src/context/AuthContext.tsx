import React, { PropsWithChildren } from 'react';
import authService, { User } from 'services/AuthService';

type AuthContextData = {
  accessToken: User['accessToken'] | undefined;
  userRole: User['role'];
  userProfile: User['profile'];
};

const AuthContext = React.createContext<AuthContextData>(undefined as any);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<User | null>(authService.userInstance);

  React.useEffect(() => {
    const subscriptionId = authService.subscribe(() => {
      setUser(authService.userInstance);
    });

    return () => authService.unsubscribe(subscriptionId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: user?.accessToken,
        userRole: user?.role,
        userProfile: user?.profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

import { UsersClient, LoginDTO } from 'services/ApiClient';
import jwt_decode from 'jwt-decode';

interface User {
  accessToken: string;
  tokenExpiresAt?: Date;
  role: 'Admin' | 'Manager' | 'User';
  profile?: {
    username: string;
    email?: string;
  };
}

type SubscriptionId = number;
type Subscription = {
  [subscriptionId: number]: Function;
};

const apiUsers = new UsersClient();

const TOKEN_KEY_IN_LOCAL_STORAGE = 'bb5dc8842ca31d4603d6aa11448d1654';

export class AuthService {
  _user: User | null = null;
  _subscription: Subscription = {};
  _nextSubscriptionId: SubscriptionId = 0;

  constructor() {
    const accessToken = this._tokenStorage.get();
    if (!accessToken) return;

    const { role, exp } = jwt_decode<any>(accessToken);
    const tokenExpiresAt = new Date(exp * 1000);
    const tokenExpiredAlready = tokenExpiresAt <= new Date();
    if (tokenExpiredAlready) return;

    this._updateUser({
      accessToken,
      role,
      tokenExpiresAt,
    });
  }

  isAuthenticated() {
    return !!this.getUserProfile();
  }

  getUserProfile() {
    return this._user?.profile;
  }

  getAccessToken() {
    return this._user?.accessToken;
  }

  _notifySubscribers() {
    Object.values(this._subscription).forEach((callback) => callback());
  }

  get _tokenStorage() {
    return {
      get: () => localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE),
      set: (token: string) => localStorage.setItem(TOKEN_KEY_IN_LOCAL_STORAGE, token),
      drop: () => localStorage.removeItem(TOKEN_KEY_IN_LOCAL_STORAGE),
    };
  }

  /**
   * update token storage (currently localStorage) accordingly to this._user
   */
  _updateTokenStorage() {
    if (!this._user) {
      this._tokenStorage.drop();
    } else {
      this._tokenStorage.set(this._user.accessToken);
    }
  }

  _updateUser(user: User | null) {
    console.log('user has updated', user);

    if (user && user.tokenExpiresAt) {
      if (user.tokenExpiresAt < new Date())
        throw Error('Token expiration should be handled outside of this');
      // or you could just ignore this, because setTimeout(code, delay) will fire constantly if delay is negative

      const howManyMilisecondsLeft = user?.tokenExpiresAt.valueOf() - new Date().valueOf();

      setTimeout(() => {
        this._updateUser(null);
        //  TODO: user refresh token or any better solution for handling token expiration
      }, howManyMilisecondsLeft);
    }

    this._user = user;
    this._notifySubscribers();
    this._updateTokenStorage();
  }

  subscribe(callback: Function): SubscriptionId {
    this._subscription[this._nextSubscriptionId++] = callback;
    return this._nextSubscriptionId - 1;
  }

  unsubscribe(subscriptionId: SubscriptionId): boolean {
    if (this._subscription[subscriptionId] !== undefined) {
      delete this._subscription[subscriptionId];
      return true;
    }
    return false;
  }

  async signIn(loginInfo: LoginDTO) {
    try {
      const { accessToken } = await apiUsers.login(loginInfo);
      if (!accessToken) throw Error("Can't get access token");

      const { role, exp } = jwt_decode<any>(accessToken);
      this._updateUser({
        accessToken,
        role,
        tokenExpiresAt: new Date(exp * 1000),
        profile: {
          username: loginInfo.userName!,
        },
      });
    } catch (error) {
      console.log('signIn error', error);
      throw error;
    }
  }

  async signOut() {
    try {
      this._updateUser(null);
    } catch (error) {
      console.log('signOut error', error);
      throw error;
    }
  }

  static get instance() {
    return authService;
  }
}

const authService = new AuthService();

export default authService;

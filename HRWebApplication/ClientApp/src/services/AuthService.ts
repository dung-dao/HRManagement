import { UsersClient, LoginDTO } from 'services/ApiClient';

interface User {
  accessToken: string;
  profile: {
    username: string;
    email?: string;
  };
}

type SubscriptionId = number;
type Subscription = {
  [subscriptionId: number]: Function;
};

const apiUsers = new UsersClient();

export class AuthService {
  _user: User | null = null;
  _subscription: Subscription = {};
  _nextSubscriptionId: SubscriptionId = 0;

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

  _updateUser(user: User | null) {
    console.log('user has updated', user);
    this._user = user;
    this._notifySubscribers();
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
      this._updateUser({
        accessToken: accessToken!,
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

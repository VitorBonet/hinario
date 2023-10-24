'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/apiClient';
import { IUser } from './dtos/IUserDTOS';

type SinInCredentials = {
  email: string;
  password: string;
}

type SinInUserSocial = {
  id: string;
  email: string;
  name: string;
  acessToken: string;
}

type SaveSingIn = {
  user: User;
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
}

type SingInResponse = {
  error: boolean;
  code: string;
}

type AuthContextData = {
  signIn: (credentials: SinInCredentials) => Promise<SingInResponse>;
  updateUser: () => void;
  signInFacebook: (credentials: SinInUserSocial) => Promise<SingInResponse>;
  signInGoogle: (credentials: SinInUserSocial) => Promise<SingInResponse>;
  signOut: (router: any) => void;
  user: IUser;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export async function signOut(router) {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('singOut');

  router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'singIn':
          Router.push('/home');
          break;
        case 'singOut':
          signOut();
          break;
        default: 
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if(token) {
      updateUser();
    }
  }, [])

  async function updateUser() {
    api.get('/me').then(response => {
      const { user, permissions, roles } = response.data;

      setUser({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone, 
        dioceseId: user.dioceseId, 
        parishId: user.parishId, 
        permissions, 
        roles 
      });
    }).catch(() => {
      console.log('meeee');
      signOut();
    })
  }

  async function signInFacebook({ email, acessToken }: SinInUserSocial) {
    try {
      
      const response = await api.post('facebook/sessions', {
        email,
        token: acessToken,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      if(error?.response?.data) {
        return { error: true, code: error?.response?.data?.code };
      }

      return { error: true, code: '' };
    }
  }

  async function signInGoogle({ email, acessToken }: SinInUserSocial) {
    try {
      
      const response = await api.post('google/sessions', {
        email,
        token: acessToken,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      if(error.response?.data) {
        return { error: true, code: error.response.data.code };
      }

      return { error: true, code: '' };
    }
  }

  async function signIn({ email, password }: SinInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      return { error: true, code: error?.response?.data?.code };
    }
  }

  async function saveSingIn({ user, token, refreshToken, permissions, roles }: SaveSingIn) {
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    setUser({
      id: user.id, 
      name: user.name, 
      profileName: user.profileName, 
      profileLink: user.profileLink, 
      email: user.email, 
      avatarUrl: user.avatarUrl,
      permissions,
      roles
    });

    api.defaults.headers['Authorization'] = `Baerer ${token}`;
    return true;
  }
  
  return (
    <AuthContext.Provider
      value={{
        signIn,
        updateUser,
        signInFacebook,
        signInGoogle,
        isAuthenticated,
        user,
        signOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
import { createContext, useContext, useState } from 'react';
import { User, UserCreateForm } from '../models/User';

interface UserContextType {
  selectedUser: User;
  listUser: () => Promise<User[]>;
  getUser: (userID: string) => Promise<User>;
  createUser: (userInfo: UserCreateForm) => Promise<string>;
  updateUser: (userInfo: User) => Promise<string>;
  deleteUser: (userInfo: User) => Promise<string>;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const listUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('List User Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        length: res.headers.get('Content-Length'),
        data: data.filter((n: User) => n.id != localStorage.getItem('userID') && n.status != 0)
      };
      return result.data;
    } catch (err: any) {
      console.log('List User error:', err.message);
      return [];
    }
  };

  const getUser = async (userID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userID}/`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Get User Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        length: res.headers.get('Content-Length'),
        data: data
      };

      return result.data;
    } catch (err: any) {
      console.log('Get User error:', err.message);
      return null;
    }
  };

  const createUser = async (userInfo: UserCreateForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/`, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      if (!res.ok) {
        throw new Error('Create User Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Create User:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create User error:', err.message);
      return 'Fail';
    }
  };

  const updateUser = async (userInfo: User) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userInfo.id}/`, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      if (!res.ok) {
        throw new Error('Create User Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Create User:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create User error:', err.message);
      return 'Fail';
    }
  };

  const deleteUser = async (userInfo: User) => {
    userInfo.status = 0;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userInfo.id}/`, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      if (!res.ok) {
        throw new Error('Delete User Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Delete User:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete User error:', err.message);
      return 'Fail';
    }
  };

  return (
    <UserContext.Provider value={{ selectedUser, listUser, getUser, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

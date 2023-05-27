import { createContext, useContext, useState } from 'react';
import { User, UserRegisterForm } from '../models/User';

interface UserContextType {
  selectedUser: User;
  listUser: () => Promise<User[]>;
  getUser: (catID: string) => Promise<User>;
  createUser: (recordInfo: UserRegisterForm) => Promise<string>;
  updateUser: (recordInfo: User) => Promise<string>;
  deleteUser: (recordInfo: User) => Promise<string>;
  verifyUser: (recordInfo: User) => Promise<string>;
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
        data: data.filter((n: User) => n.status != 0)
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
        throw new Error('Get Record Error');
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
      console.log('Get Record error:', err.message);
      return null;
    }
  };

  const createRecord = async (recordInfo: RecordCreateForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordInfo)
      });

      if (!res.ok) {
        throw new Error('Create Record Error');
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

      console.log('Create Record:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Record error:', err.message);
      return 'Fail';
    }
  };

  const updateRecord = async (recordInfo: Record) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/${recordInfo.id}/`, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordInfo)
      });

      if (!res.ok) {
        throw new Error('Create Record Error');
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

      console.log('Create Record:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Record error:', err.message);
      return 'Fail';
    }
  };

  const deleteRecord = async (recordInfo: Record) => {
    recordInfo.status = '0';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/${recordInfo.id}/`, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordInfo)
      });

      if (!res.ok) {
        throw new Error('Delete Record Error');
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

      console.log('Delete Record:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete Record error:', err.message);
      return 'Fail';
    }
  };

  const verifyRecord = async (recordInfo: Record) => {
    if (recordInfo.verify_identity == true) {
      recordInfo.verify_identity = false;
    } else {
      recordInfo.verify_identity = true;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/${recordInfo.id}/`, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordInfo)
      });

      if (!res.ok) {
        throw new Error('Verify Record Error');
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

      console.log('Verify Record:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Verify Record error:', err.message);
      return 'Fail';
    }
  };

  return (
    <UserContext.Provider
      value={{ selectedUser, listUser, getUser, createRecord, updateRecord, deleteRecord, verifyRecord }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useReocrd = () => {
  return useContext(UserContext);
};

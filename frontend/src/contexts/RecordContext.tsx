import { createContext, useContext, useState } from 'react';
import { Record, RecordCreateForm } from '../models/Record';

interface RecordContextType {
  selectedRecord: Record;
  listRecord: () => Promise<Record[]>;
  getRecord: (catID: string) => Promise<Record>;
  createRecord: (recordInfo: RecordCreateForm) => Promise<string>;
  updateRecord: (recordInfo: Record) => Promise<string>;
  deleteRecord: (recordInfo: Record) => Promise<string>;
  verifyRecord: (recordInfo: Record) => Promise<string>;
}

export const RecordContext = createContext<RecordContextType>(null!);

export const RecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const listRecord = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('List Record Error');
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
      console.log('List Record error:', err.message);
      return [];
    }
  };

  const getRecord = async (catID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/record/${catID}/`, {
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
    recordInfo.verify_identity = true;
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
    <RecordContext.Provider
      value={{ selectedRecord, listRecord, getRecord, createRecord, updateRecord, deleteRecord, verifyRecord }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export const useReocrd = () => {
  return useContext(RecordContext);
};

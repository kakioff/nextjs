import { useState } from "react";

interface Options {
    priority?: 'local' | 'initialValue';
    type?: 'localStorage' | 'sessionStorage';
}

//保持状态一致
const valueToStorageFun = <T>({ type, key, value }: { type: Options['type']; key: string; value: T }) => {
    if (typeof window !== 'undefined') {
        switch (type) {
            case 'localStorage':
                window.localStorage.setItem(key, JSON.stringify(value));
                break;
            case 'sessionStorage':
                window.sessionStorage.setItem(key, JSON.stringify(value));
                break;
            default:
                window.localStorage.setItem(key, JSON.stringify(value));
        }
    }
};
export function useStorageState<T>(key: string, initialValue: T, options?: Options) {
    const { priority = 'local', type = 'localStorage' } = { priority: 'local', type: 'localStorage', ...options };
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
        // 根据类型判断从何处读取数据
        let item;
        switch (type) {
          case 'localStorage':
            item = window.localStorage.getItem(key);
            break;
          case 'sessionStorage':
            item = window.sessionStorage.getItem(key);
            break;
          default:
            item = window.localStorage.getItem(key);
        }
  
        // 解析state并按优先级进行处理
        if (item) {
          switch (priority) {
            case 'local':
              return JSON.parse(item);
            case 'initialValue':
              valueToStorageFun({ key, type, value: initialValue });
              return initialValue;
            default:
              return JSON.parse(item);
          }
        } else {
          return initialValue;
        }
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    const setValue = (value: T | ((val: T) => T)) => {
      try {
        //和useState保持相同用法 支持函数和默认值
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        //保存state
        setStoredValue(valueToStore);
        //同步到storage中
        valueToStorageFun({ key, type, value: valueToStore });
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue] as const;
  }
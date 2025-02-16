import { message } from 'antd';
import { createContext, useContext } from 'react';

const ToastContext = createContext<(type: 'success' | 'error' | 'info' | 'warning', content: string) => void>(() => {});
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type: 'success' | 'error' | 'info' | 'warning', content: string) => {
        messageApi[type](content);
    };
    return (
        <ToastContext.Provider value={showMessage}>
            {contextHolder}
            {children}
        </ToastContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    return useContext(ToastContext);
};

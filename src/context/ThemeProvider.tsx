import { ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import viVN from 'antd/es/locale/vi_VN';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ConfigProvider locale={viVN} theme={{ algorithm: theme.darkAlgorithm }}>
            {children}
        </ConfigProvider>
    );
};

export { ThemeProvider };

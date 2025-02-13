import { ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>{children}</ConfigProvider>;
};

export { ThemeProvider };

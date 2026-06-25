'use client';

import { ConfigProvider } from 'antd';
import antdTheme from '@/config/antd-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}

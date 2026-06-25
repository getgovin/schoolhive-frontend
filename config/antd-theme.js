// Global Ant Design Theme Configuration
const antdTheme = {
  token: {
    // Primary Colors
    colorPrimary: '#7c3aed', // Violet
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    colorTextBase: '#1f2937',

    // Neutral Colors
    colorBgBase: '#ffffff',
    colorBorder: '#e5e7eb',
    colorBgContainer: '#f9fafb',

    // Typography
    fontSize: 14,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol'`,

    // Spacing & Border Radius
    borderRadius: 8,
    controlHeight: 40,

    // Shadows
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',

    // Transitions
    motionUnit: 0.1,
  },
  components: {
    // Dropdown styling
    Dropdown: {
      controlPaddingHorizontal: 16,
      borderRadiusLG: 8,
    },
    // Avatar styling
    Avatar: {
      colorBgBase: '#7c3aed',
      colorTextLightSolid: '#ffffff',
      borderRadius: 50,
    },
    // Badge styling
    Badge: {
      colorError: '#ef4444',
    },
    // Button styling
    Button: {
      colorPrimaryBorder: 'transparent',
      controlHeight: 40,
      borderRadius: 8,
    },
    // Menu styling
    Menu: {
    //   controlItemBgHover: '#f3f0ff',
      controlItemBgSelectedHorizontal: 'transparent',
    //   colorPrimaryText: '#7c3aed',
    // itemColor: '#ffffff', // normal menu item color
    //         itemHoverColor: '#ffffff',
    //         itemSelectedColor: '#7c3aed',
    //         itemBg: 'transparent',
    //         itemSelectedBg: '#f3e8ff',
    },
  },
};

export default antdTheme;

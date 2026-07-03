'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  BankOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  EllipsisOutlined,
  CloseOutlined
} from '@ant-design/icons';

const navSections = [
  {
    section: null,
    routes: [
      {
        key: '/super-admin/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        href: '/super-admin/dashboard',
      },
    ],
  },
  {
    section: 'Management',
    routes: [
      {
        key: '/super-admin/schools',
        icon: <BankOutlined />,
        label: 'Schools',
        href: '/super-admin/schools',
      },
      {
        key: '/super-admin/users',
        icon: <TeamOutlined />,
        label: 'Users',
        href: '/super-admin/users',
      },
      {
        key: '/super-admin/roles',
        icon: <SafetyCertificateOutlined />,
        label: 'Roles',
        href: '/super-admin/roles',
      },
    ],
  }
];

const SchoolnavSections = [
  {
    section: null,
    routes: [
      {
        key: '/admin/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        href: '/admin/dashboard',
      },
    ],
  },
  {
    section: 'Management',
    routes: [
      {
        key: '/school-admin/students',
        icon: <BankOutlined />,
        label: 'Students',
        href: '/school-admin/students',
      },
      // {
      //   key: '/school-admin/teachers',
      //   icon: <TeamOutlined />,
      //   label: 'Teachers',
      //   href: '/school-admin/teachers',
      // },
      // {
      //   key: '/school-admin/otherStaffs',
      //   icon: <SafetyCertificateOutlined />,
      //   label: 'Other Staff',
      //   href: '/school-admin/otherStaffs',
      // },
            {
        key: '/school-admin/fee-submission',
        icon: <SafetyCertificateOutlined />,
        label: 'Fee Submission',
        href: '/school-admin/fee-submission',
      },
    ],
  },
  {
    section: 'Academic',
    routes: [
       {
        key: '/school-admin/class',
        icon: <CalendarOutlined />,
        label: 'Class',
        href: '/school-admin/class',
      },
       {
        key: '/school-admin/section',
        icon: <CalendarOutlined />,
        label: 'Section',
        href: '/school-admin/section',
      },
      {
        key: '/school-admin/fees',
        icon: <CalendarOutlined />,
        label: 'Fees',
        href: '/school-admin/fees',
      },
   
      // {
      //   key: '/admin/reports',
      //   icon: <BarChartOutlined />,
      //   label: 'Reports',
      //   href: '/admin/reports',
      // },
    ],
  },
  // {
  //   section: 'System',
  //   routes: [
  //     {
  //       key: '/admin/settings',
  //       icon: <SettingOutlined />,
  //       label: 'Settings',
  //       href: '/admin/settings',
  //     },
  //   ],
  // },
];

export default function Sidebar({ setOpensidebar , opensidebar }) {
  const pathname = usePathname();

  return (
    <>


      <aside className={`schoolhive-sidebar ${opensidebar ? "show" : ""}`} >

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 pb-5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-base">
            <BankOutlined />
          </div>
          <span className="text-white font-bold text-[15px]">SchoolHive</span>
        </div>
      <CloseOutlined className='sidebar-bar' onClick={()=> setOpensidebar(!opensidebar)} />
        {/* Nav */}
        <nav className="flex-1 px-2.5 overflow-y-auto">
          {SchoolnavSections.map(({ section, routes }, idx) => (
            <div key={idx} className="mb-1">
              {section && (
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/90 px-3 pt-3 pb-1">
                  {section}
                </p>
              )}
              <Menu
                mode="inline"
                selectedKeys={[pathname || '/super-admin/dashboard']}
                style={{ backgroundColor: 'transparent' }}
                items={routes.map((route) => ({
                  key: route.key,
                  icon: route.icon,
                  label: (
                    <Link href={route.href} className="text-inherit no-underline">
                      {route.label}
                    </Link>
                  ),
                }))}
              />
            </div>
          ))}
        </nav>

        {/* User profile */}
        {/* <div className="px-2.5 py-3 border-t border-white/15">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#3a0f99] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-medium truncate leading-tight">Admin User</p>
              <p className="text-white/50 text-[11px] leading-tight">Super Admin</p>
            </div>
            <EllipsisOutlined className="text-white/50 text-base rotate-90" />
          </div>
        </div> */}

      </aside>
    </>
  );
}
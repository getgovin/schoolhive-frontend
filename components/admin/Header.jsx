"use client";

import { useState } from "react";
import { Dropdown, Avatar, Badge, Button, Space } from "antd";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../store/auth.store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Header({ setOpensidebar, opensidebar }) {
  const profileName = "Admin User"; // Replace with actual user name from auth/context
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    router.push("/school-admin/login");
  };

  const handleSettings = () => {
    // Add settings navigation here
    console.log("Settings clicked");
  };

  // Dropdown menu items
  const dropdownItems = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: handleSettings,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <header className="py-3 flex items-center justify-between lg:justify-end px-8">
      <BarsOutlined
        className="header-bar"
        onClick={() => setOpensidebar(!opensidebar)}
      />
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        {/* Profile Name */}
        <div className="flex flex-col text-right">
          <span className="text-sm font-bold text-slate-900">
            {profileName}
          </span>
        </div>

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items: dropdownItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Avatar size={40} className="avatar">
            {profileName.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    </header>
  );
}

"use client";

import { Row, Col } from "antd";
import {
  TeamOutlined,
  ManOutlined,
  WomanOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

import StatsCard from "@/components/dashboard/StatsCard";
import FeeStatusChart from "@/components/dashboard/FeeStatusChart";
import FeeProgressCard from "@/components/dashboard/FeeProgressCard";
import NotificationCard from "@/components/dashboard/NotificationCard";
import RecentPayments from "@/components/dashboard/RecentPayments";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
     

      {/* Top Cards */}
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatsCard
            title="Total Students"
            value="1,250"
            color="bg-blue-500"
            icon={<TeamOutlined />}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatsCard
            title="Total Boys"
            value="720"
            color="bg-cyan-500"
            icon={<ManOutlined />}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatsCard
            title="Total Girls"
            value="530"
            color="bg-pink-500"
            icon={<WomanOutlined />}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatsCard
            title="Classes / Sections"
            value="25 / 8"
            color="bg-violet-500"
            icon={<ApartmentOutlined />}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[20, 20]} className="mt-1">
        <Col xs={24} lg={12}>
          <FeeStatusChart />
        </Col>

        <Col xs={24} lg={12}>
          <FeeProgressCard />
        </Col>
      </Row>

      {/* Bottom */}
      <Row gutter={[20, 20]} className="mt-1">
        <Col xs={24} lg={12}>
          <NotificationCard />
        </Col>

        <Col xs={24} lg={12}>
          <RecentPayments />
        </Col>
      </Row>
    </div>
  );
}
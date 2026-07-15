"use client";

import { BellOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Card, Tag } from "antd";

export default function NotificationCard() {
  return (
    <Card
      variant="borderless"
      className="rounded-2xl shadow-sm h-full"
      title="Fee Reminder Notifications"
    >
      <div className="space-y-6">
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            className="!h-12"
          >
           Send 1st Reminder
          </Button>

          <Button
            size="large"
            className="!h-12 !bg-orange-500 !text-white hover:!bg-orange-600"
            icon={<SendOutlined />}
          >
           Send 2nd Reminder
          </Button>

          <Button
            danger
            size="large"
            icon={<SendOutlined />}
            className="!h-12"
          >
           Send Final Reminder
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-gray-500 text-sm">
              1st Sent
            </p>

            <h3 className="font-bold text-2xl mt-2">
              185
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-gray-500 text-sm">
              2nd Sent
            </p>

            <h3 className="font-bold text-2xl mt-2">
              104
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-gray-500 text-sm">
              Final Sent
            </p>

            <h3 className="font-bold text-2xl mt-2">
              67
            </h3>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-4">

          <div>
            <p className="text-gray-500 text-sm">
              Last Notification
            </p>

            <p className="font-medium">
              Today, 10:45 AM
            </p>
          </div>

          <Tag color="green">
            WhatsApp Ready
          </Tag>

        </div>
      </div>
    </Card>
  );
}
"use client";

import { Avatar, Card, Tag } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const payments = [
  {
    id: 1,
    name: "Rahul Sharma",
    class: "10-A",
    receipt: "RCPT-1001",
    amount: 15000,
    mode: "Cash",
    time: "10 mins ago",
  },
  {
    id: 2,
    name: "Priya Patel",
    class: "9-B",
    receipt: "RCPT-1002",
    amount: 12500,
    mode: "UPI",
    time: "20 mins ago",
  },
  {
    id: 3,
    name: "Aarav Singh",
    class: "8-C",
    receipt: "RCPT-1003",
    amount: 18000,
    mode: "Card",
    time: "35 mins ago",
  },
  {
    id: 4,
    name: "Ananya Gupta",
    class: "7-A",
    receipt: "RCPT-1004",
    amount: 9800,
    mode: "Cash",
    time: "1 hour ago",
  },
  {
    id: 5,
    name: "Mohit Verma",
    class: "6-B",
    receipt: "RCPT-1005",
    amount: 11000,
    mode: "UPI",
    time: "2 hours ago",
  },
];

export default function RecentPayments() {
  return (
    <Card
      variant="borderless"
      className="rounded-2xl shadow-sm h-full internal-card"
      title={
        <div className="flex justify-between items-center">
          <span className="">Recent Fee Collections</span>

        </div>
      }

    >
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {payments.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-300 "
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <Avatar
                size={30}
                icon={<UserOutlined />}
                className="bg-blue-500"
              />

              <div>
                <p className=" text-[15px] font-bold !mb-0">{item.name}</p>

                <p className="text-[12px] text-gray-500 !mb-0">
                  Class {item.class}
                </p>

                <p className="text-[10px] text-gray-400 !mb-0">{item.receipt}</p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className=" text-[15px] font-bold !mb-0">
                ₹{item.amount.toLocaleString("en-IN")}
              </p>

              <div className="flex justify-end  ">
                <Tag
                  color={
                    item.mode === "Cash"
                      ? "green"
                      : item.mode === "UPI"
                        ? "blue"
                        : "purple"
                  }
                  icon={
                    item.mode === "Cash" ? (
                      <WalletOutlined />
                    ) : (
                      <CreditCardOutlined />
                    )
                  }
                >
                  {item.mode}
                </Tag>
              </div>

              <p className="text-xs text-gray-400 mt-2">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

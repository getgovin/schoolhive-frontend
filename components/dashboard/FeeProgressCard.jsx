"use client";

import { Card, Progress, Divider } from "antd";

export default function FeeProgressCard() {
  const totalFee = 2500000;
  const paidFee = 1500000;

  const pendingFee = totalFee - paidFee;

  const paidPercent = Math.round((paidFee / totalFee) * 100);
  const pendingPercent = 100 - paidPercent;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <Card
      variant="borderless"
      className="rounded-2xl shadow-sm h-full"
      title="Fee Collection Progress"
     
    >
      <div className="flex flex-col items-center">

        {/* Circular Progress */}
        <Progress
          type="circle"
          percent={paidPercent}
          size={170}
          strokeColor="#22c55e"
          railColor="#fef3c7"
          format={() => (
            <div>
              <h2 className="text-3xl font-bold  !mb-0">
                {paidPercent}%
              </h2>

              <p className=" text-sm !mb-0">
                Fee Paid
              </p>
            </div>
          )}
        />

    

        {/* Paid Progress */}
        <div className="w-full mt-15 ">

          <div className="flex justify-between ">
            <span className="font-medium">
              Paid
            </span>

            <span className="font-semibold text-green-600">
              {paidPercent}%
            </span>
          </div>

          <Progress
            percent={paidPercent}
            strokeColor="#22c55e"
            showInfo={false}
          />

        </div>

        {/* Pending Progress */}
        <div className="w-full mt-4">

          <div className="flex justify-between ">
            <span className="font-medium">
              Remaining
            </span>

            <span className="font-semibold text-yellow-500">
              {pendingPercent}%
            </span>
          </div>

          <Progress
            percent={pendingPercent}
            strokeColor="#facc15"
            showInfo={false}
          />

        </div>

      </div>
    </Card>
  );
}
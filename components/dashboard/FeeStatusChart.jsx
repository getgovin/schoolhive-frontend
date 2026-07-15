"use client";

import { Card } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Paid",
    value: 900,
    color: "#22c55e",
  },
  {
    name: "Pending",
    value: 350,
    color: "#facc15",
  },
];

const totalStudents = data.reduce((sum, item) => sum + item.value, 0);

export default function FeeStatusChart() {
  return (
    <Card
      title="Student Fee Status"
      variant="borderless"
    >
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="75%">
          {" "}
          <PieChart>
            {" "}
            <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100}>
              {" "}
              {data.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}{" "}
            </Pie>{" "}
            <Tooltip />{" "}
          </PieChart>{" "}
        </ResponsiveContainer>

        {/* Center Info */}
        <div className="-mt-40 text-center">
          <h2 className="text-4xl font-bold text-slate-800 !mb-0">
            {totalStudents}
          </h2>
          <p className="text-gray-500 !mb-0">
            Students
          </p>
        </div>

        {/* Legend */}
        <div className="mt-30 flex justify-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            <p className="font-semibold !mb-0">Paid</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-yellow-400" />
            <p className="font-semibold !mb-0">Pending</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

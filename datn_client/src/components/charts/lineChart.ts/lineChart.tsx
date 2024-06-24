import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { dataLineChart } from "../data";
export const LineChartComponent = () => (
     <LineChart width={600} height={400} data={dataLineChart}>
          <Line type="monotone" dataKey="uv" stroke="#f43" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
     </LineChart>
);

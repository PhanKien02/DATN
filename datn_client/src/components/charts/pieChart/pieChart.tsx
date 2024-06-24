import { PureComponent } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { dataPieChart } from "../data";

export default class PieChartComponent extends PureComponent {
     render() {
          return (
               <PieChart width={400} height={400}>
                    <Pie
                         data={dataPieChart}
                         dataKey="percent"
                         nameKey="Khu vực"
                         cx="50%"
                         cy="50%"
                         outerRadius={150}
                         fill="#8884d8"
                         label
                    >
                         {dataPieChart.map((entry, index) => (
                              <Cell key={entry["Khu vực"]} fill={entry.color} />
                         ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
               </PieChart>
          );
     }
}

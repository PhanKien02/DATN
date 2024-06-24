import { Card, Col, Row } from "antd";
import SvgEyeIcon from "../utils/icons/eyeIcon";
import { FaArrowUp } from "react-icons/fa6";
import SvgMoney from "../utils/icons/moneyIcon";
import SvgOrderIcon from "../utils/icons/orderIcon";
import { LineChartComponent } from "../components/charts/lineChart.ts/lineChart";
import PieChartComponent from "../components/charts/pieChart/pieChart";

const DashboadPage = () => {
     return (
          <>
               <div className="bg-slate-100  pt-4 pb-20">
                    <Row gutter={15} className="!ml-2 !mr-2">
                         <Col span={8}>
                              <Card title="Doanh Thu" bordered={false}>
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2">
                                        <SvgMoney color="#379777" />
                                   </div>
                                   <div className="flex   ">
                                        <h1 className="text-black">
                                             300.456.000{" "}
                                        </h1>
                                        <p className="flex items-center text-xl mr-10 mt-10 text-green-400">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                         <Col span={8}>
                              <Card title="Lượt Đặt" bordered={false}>
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2">
                                        <SvgOrderIcon />
                                   </div>
                                   <div className="flex ml-10    ">
                                        <h1 className="text-black">16.142 </h1>
                                        <p className="flex items-center text-xl mt-10 text-green-400">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                         <Col span={8}>
                              <Card title="Người Dùng Mới" bordered={false}>
                                   {" "}
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2">
                                        <SvgEyeIcon />
                                   </div>
                                   <div className="flex ml-10    ">
                                        <h1 className="text-black">
                                             3.456.000{" "}
                                        </h1>
                                        <p className="flex items-center text-xl mt-10 text-green-400">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                    </Row>
                    <div className="flex gap-5">
                         <div className="mt-4 ">
                              <PieChartComponent />
                              <p className="text-center w-full mt-5 text-cyan-700 ">
                                   Tỉ Lệ khách hàng giữa các khu vực
                              </p>
                         </div>
                         <div className="mt-4 ">
                              <LineChartComponent />
                              <p className="text-center w-full mt-5 text-green-500">
                                   Biểu đồ doanh thu hàng tháng
                              </p>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default DashboadPage;

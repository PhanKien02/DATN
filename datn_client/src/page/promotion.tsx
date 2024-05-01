import { Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useGetPromotion } from "../hook/useGetPromotion";
import { IPromotion } from "../models/promotion";
import { formatDate } from "../utils/formatDate";
const PromotionManagerPage = () => {
     const { promotion, isLoading, refetch } = useGetPromotion();
     const columns: ColumnsType<IPromotion> = [
          {
               title: "Chương Trình",
               dataIndex: "name",
               key: "name",
               fixed: "left",
          },
          { title: "Số Lượng", dataIndex: "amount", key: "amount" },

          { title: "Giảm giá(%)", dataIndex: "percent", key: "percent" },

          {
               title: "Ngày hết hạn",
               dataIndex: "expDate",
               key: "expDate",
               render: (_, record) => {
                    return formatDate(record.expDate);
               },
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
          },
     ];
     if (!promotion || isLoading) return <Spin />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">
                              Chương Trình Khuyến Mãi
                         </h1>
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Table
                              className="h-full w-full mt-6"
                              columns={columns}
                              dataSource={promotion}
                              pagination={false}
                         />
                    </div>
               </div>
          </>
     );
};
export default PromotionManagerPage;

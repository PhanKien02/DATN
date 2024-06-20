import { Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { useEffect } from "react";
import { useGetUnitPrice } from "../hook/useGetUnitPrice";
import { IUnitPrice } from "../models/unitPrice";
import UnitPriceModal from "../modals/unitPriceModal";
const UnitPriceManagerPage = () => {
     const { prices, isLoading, refetch } = useGetUnitPrice();
     useEffect(() => {
          refetch();
     }, [prices, refetch]);

     const columns: ColumnsType<IUnitPrice> = [
          {
               title: "Giờ Bắt Đầu",
               dataIndex: "timeStart",
               key: "timeStart",
               render: (_, record) => {
                    return record.timeStart ? record.timeStart : "N/A";
               },
          },
          {
               title: "Giờ Kết Thúc",
               dataIndex: "timeEnd",
               key: "timeEnd",
          },

          { title: "Giá Trước Đó", dataIndex: "pastPrice", key: "pastPrice" },
          {
               title: "Giá Hiện Tại",
               dataIndex: "presentPrice",
               key: "presentPrice",
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => {
                    return (
                         <div className=" flex gap-3">
                              <UnitPriceModal
                                   refetch={refetch}
                                   icon={<RxUpdate />}
                                   data={record}
                              />
                         </div>
                    );
               },
          },
     ];
     if (!prices || isLoading) return <Spin />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-4xl ml-4">Đơn Giá</h1>
                         <UnitPriceModal
                              refetch={refetch}
                              icon={<IoMdAdd />}
                              title="Thêm Đơn Giá Mới"
                         />
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Table
                              className="h-full w-full mt-6 "
                              columns={columns}
                              dataSource={prices}
                              pagination={false}
                         />
                    </div>
               </div>
          </>
     );
};
export default UnitPriceManagerPage;

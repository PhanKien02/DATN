import { Button, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useGetPromotion } from "../hook/useGetPromotion";
import { IPromotion } from "../models/promotion";
import { formatDate } from "../utils/formatDate";
import PromotionModal from "../modals/promotionModal";
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { TbLockCancel } from "react-icons/tb";
import { TbLockCheck } from "react-icons/tb";
import promotionService from "../services/promotionService";
import { toast } from "react-toastify";
import { useEffect } from "react";
const PromotionManagerPage = () => {
     const { promotion, isLoading, refetch } = useGetPromotion();
     useEffect(() => {
          refetch();
     }, [promotion, refetch]);
     const handleBlockOrActivePromotion = (id: number, status: boolean) => {
          promotionService
               .blockOrActivePromotion(id, status)
               .then(() => {
                    toast.success(
                         status
                              ? "Dừng Chương Trình Khuyễn Mãi Thành Công"
                              : "Khởi Động Chương Trình Khuyễn Mãi Thành Công"
                    );
                    refetch();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else
                         toast.error(
                              status
                                   ? "Dừng Chương Trình Khuyễn Mãi Thất Bại"
                                   : "Khởi Động Chương Trình Khuyễn Mãi Thất Bại"
                         );
               });
     };
     const columns: ColumnsType<IPromotion> = [
          {
               title: "Chương Trình",
               dataIndex: "programName",
               key: "name",
               fixed: "left",
          },
          { title: "Số Lượng", dataIndex: "amount", key: "amount" },

          { title: "Giảm Giá(%)", dataIndex: "percent", key: "percent" },
          {
               title: "Km Tối Thiểu",
               dataIndex: "conditionPrice",
               key: "conditionPrice",
          },
          {
               title: "Ngày Bắt Đầu",
               dataIndex: "startDate",
               key: "startDate",
               render: (_, record) => {
                    return record.startDate
                         ? formatDate(record.startDate)
                         : "N/A";
               },
          },
          {
               title: "Ngày Hết Hạn",
               dataIndex: "expDate",
               key: "expDate",
               render: (_, record) => {
                    return record.expDate ? formatDate(record.expDate) : "N/A";
               },
          },
          {
               title: "Trạng Thái",
               dataIndex: "status",
               key: "status",
               render(_, record) {
                    return record.status === null ? (
                         "N/A"
                    ) : record.status ? (
                         <span className="text-green-600">Đang Hoạt động</span>
                    ) : (
                         <span className="text-red-600">Đã Dừng</span>
                    );
               },
               filters: [
                    {
                         text: "Đang Trong Chương Trình",
                         value: true,
                    },
                    {
                         text: "Đã Dừng",
                         value: false,
                    },
               ],
               onFilter(value, record) {
                    return record.status === value;
               },
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => {
                    return (
                         <div className=" flex gap-3">
                              <PromotionModal
                                   refetch={refetch}
                                   icon={<RxUpdate />}
                                   data={record}
                              />
                              <Button
                                   type="primary"
                                   block
                                   className={`${
                                        record.status
                                             ? "!bg-yellow-400"
                                             : "!bg-green-500"
                                   }`}
                                   onClick={() =>
                                        handleBlockOrActivePromotion(
                                             record.id,
                                             record.status
                                        )
                                   }
                              >
                                   {record.status ? (
                                        <TbLockCancel />
                                   ) : (
                                        <TbLockCheck />
                                   )}
                              </Button>
                         </div>
                    );
               },
          },
     ];
     if (!promotion || isLoading) return <Spin />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl ml-4">
                              Chương Trình Khuyến Mãi
                         </h1>
                         <PromotionModal
                              title="Thêm Chương Trình Khuyến Mãi"
                              icon={<IoMdAdd />}
                              refetch={refetch}
                         />
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Table
                              className="h-full w-full mt-6 "
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

import { Pagination, PaginationProps, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import useGetAllBooking from "../hook/useGetAllBooking";
import { IBooking } from "../models/booking";
import { formatDateTime } from "../utils/formatDate";

// import { toast } from "react-toastify";
const BookingManagerPage = () => {
     const [limit, setLimit] = useState(10);
     const [page, setPage] = useState(1);
     const { bookings, isLoading } = useGetAllBooking(page, limit);
     const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
          current,
          pageSize
     ) => {
          console.log(current, pageSize);
     };
     if (!bookings || isLoading) return <Spin />;
     const columns: ColumnsType<IBooking> = [
          {
               title: "Khách Hàng",
               width: 150,
               dataIndex: "customer",
               key: "customer",
               fixed: "left",
               render: (_, record) => {
                    return record.customer.fullName;
               },
          },
          {
               title: "Tài Xế",
               width: 150,
               dataIndex: "driver",
               key: "driver",
               render: (_, record) => {
                    return record.driver
                         ? record.driver.fullName
                         : "Chưa Có Tài Xế";
               },
          },
          {
               title: "Điểm Đón",
               dataIndex: "pick_up_point",
               key: "pick_up_point",
          },
          {
               title: "Điểm Đến",
               dataIndex: "dropOffPoint",
               key: "dropOffPoint",
          },
          {
               title: "Ngày Giờ",
               dataIndex: "date",
               key: "date",
               render: (_, record) => {
                    return formatDateTime(record.date);
               },
          },
          {
               title: "Tổng Tiền",
               dataIndex: "totalPayment",
               key: "totalPayment",
          },
          {
               title: "Giảm giá",
               dataIndex: "promotion",
               key: "promotion",
               render: (_, record) => {
                    return `${
                         record.promotion ? record.promotion.percent : 0
                    } %`;
               },
          },
          {
               title: "Thanh Toán",
               dataIndex: "paymentStatus",
               key: "paymentStatus",
               render: (_, record) => {
                    return record.paymentStatus
                         ? "Đã Thanh Toán"
                         : "Chưa Thanh Toán";
               },
          },
          {
               title: "Trạng Thái",
               dataIndex: "statused",
               key: "statused",
               fixed: "right",
          },
          {
               title: "Tính năng",
               key: "operation",
               fixed: "right",
               width: 100,
          },
     ];
     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl ml-4">Danh Sách Đơn Hàng</h1>
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Table
                              className="h-full w-full mt-6 "
                              columns={columns}
                              dataSource={bookings.bookings}
                              pagination={false}
                              scroll={{ x: 1500, y: 400 }}
                         />
                         <Pagination
                              className="!mr-5 !mb-5 !mt-5"
                              showSizeChanger
                              defaultCurrent={page}
                              onShowSizeChange={onShowSizeChange}
                              pageSize={limit}
                              total={bookings.totalPage}
                              onChange={(current, pageSize) => {
                                   setPage(current);
                                   setLimit(pageSize);
                              }}
                         />
                    </div>
               </div>
          </>
     );
};
export default BookingManagerPage;

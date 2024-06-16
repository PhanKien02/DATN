import { Button, Pagination, PaginationProps, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import useGetAllBooking from "../hook/useGetAllBooking";
import { IBooking } from "../models/booking";
import { formatDateTime } from "../utils/formatDate";
import { BookingStatus } from "../constants/booking";
import { MdAssignmentInd } from "react-icons/md";
import AssignDriverModal from "../modals/assignDriverModal";

const BookingManagerPage = () => {
     const [limit, setLimit] = useState(10);
     const [openAssignDriverModal, setOpenAssignDriverModal] = useState(false);
     const [data, setData] = useState<IBooking>();
     const [page, setPage] = useState(1);
     const { bookings, isLoading, refetch } = useGetAllBooking(page, limit);
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
               dataIndex: "originAddress",
               key: "originAddress",
          },
          {
               title: "Điểm Đến",
               dataIndex: "destinationAddress",
               key: "destinationAddress",
          },
          {
               title: "Quãng Đường (Km)",
               dataIndex: "longDistance",
               key: "longDistance",
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
               title: "Thanh Toán",
               dataIndex: "totalPayment",
               key: "totalPayment",
               render: (_, record) => {
                    return record.totalPayment.toLocaleString("vi-VN", {
                         style: "currency",
                         currency: "VND",
                    });
               },
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
               filters: Object.values(BookingStatus).map((status) => {
                    return {
                         text: status,
                         value: status,
                    };
               }),
               onFilter(value, record) {
                    return record.statused === value;
               },
               render: (_, record) => {
                    return record.statused ? <p>{record.statused}</p> : "N/A";
               },
          },
          {
               title: "Tính năng",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => {
                    return (
                         <>
                              <Button
                                   type="primary"
                                   onClick={() => {
                                        setOpenAssignDriverModal(true);
                                        setData(record);
                                   }}
                                   disabled={
                                        record.statused ===
                                             BookingStatus.FIND_DRIVER ||
                                        record.statused ===
                                             BookingStatus.DRIVER_REJECT
                                             ? false
                                             : true
                                   }
                                   className="!flex items-center justify-center gap-4!mr-5 !bg-green-500"
                              >
                                   <span className="mr-1 text-md">
                                        <MdAssignmentInd />
                                   </span>
                                   <span>Tài Xế</span>
                              </Button>
                         </>
                    );
               },
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
               {data && (
                    <AssignDriverModal
                         refetch={refetch}
                         data={data}
                         open={openAssignDriverModal}
                         setOpen={setOpenAssignDriverModal}
                    />
               )}
          </>
     );
};
export default BookingManagerPage;

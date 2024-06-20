import { Button, Pagination, PaginationProps, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import useGetAllBooking from "../hook/useGetAllBooking";
import { IBooking } from "../models/booking";
import { formatDateTime } from "../utils/formatDate";
import { BookingStatus } from "../constants/booking";
import { MdAssignmentInd } from "react-icons/md";
import AssignDriverModal from "../modals/assignDriverModal";
import { FaEye } from "react-icons/fa";
import DetailBooking from "../modals/detailBooking";
const BookingManagerPage = () => {
     const [limit, setLimit] = useState(10);
     const [openAssignDriverModal, setOpenAssignDriverModal] = useState(false);
     const [openDetail, setOpenDetail] = useState(false);
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
               title: "Tổng Tiền",
               dataIndex: "totalPayment",
               key: "totalPayment",
               render: (_, record) => {
                    return (
                         <p>
                              {record.totalPayment.toLocaleString("vi-VN", {
                                   style: "currency",
                                   currency: "VND",
                              })}
                         </p>
                    );
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
                    return (
                         <p
                              className={`${
                                   record.paymentStatus
                                        ? "text-green-500"
                                        : "text-red-500"
                              }`}
                         >
                              {record.paymentStatus
                                   ? "Đã Thanh Toán"
                                   : "Chưa Thanh Toán"}
                         </p>
                    );
               },
               filters: [
                    {
                         text: "Chưa Thanh Toán",
                         value: false,
                    },
                    {
                         text: "Đã Thanh Toán",
                         value: true,
                    },
               ],
               onFilter(value, record) {
                    return record.paymentStatus === value;
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
                         <div className="flex gap-2 !mr-2">
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
                              </Button>
                              <Button
                                   type="primary"
                                   onClick={() => {
                                        setOpenDetail(true);
                                        setData(record);
                                   }}
                              >
                                   <FaEye />
                              </Button>
                         </div>
                    );
               },
          },
     ];
     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-4xl ml-4">Đơn Hàng</h1>
                    </div>
                    <div className="flex flex-col items-end w-full h-full">
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
                              showQuickJumper
                              defaultCurrent={1}
                              onShowSizeChange={onShowSizeChange}
                              pageSize={limit}
                              total={bookings.total}
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

               {data && (
                    <DetailBooking
                         open={openDetail}
                         setOpen={setOpenDetail}
                         data={data}
                    />
               )}
          </>
     );
};
export default BookingManagerPage;

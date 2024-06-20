import { Button, Pagination, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { formatDateTime } from "../utils/formatDate";
import useGetAllInvoice from "../hook/useGetAllInvoice";
import { IInvoice } from "../models/invoice";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import ExportInvoice from "../components/invoicePdf";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const InvoiceManagerPage = () => {
     const [limit, setLimit] = useState(10);
     const [searchText, setSearchText] = useState("");
     const [invoice, setInvoice] = useState<IInvoice>();
     const [isOpenPDFPreview, setIsOpenPDFPreview] = useState(false);
     const [page, setPage] = useState(1);
     const { invoices, isLoading } = useGetAllInvoice(page, limit, searchText);

     const searchbutton = <SearchOutlined type="default" />;
     if (!invoices || isLoading) return <Spin />;
     const columns: ColumnsType<IInvoice> = [
          {
               title: "Khách Hàng",
               width: 150,
               dataIndex: "customer",
               key: "customer",
               fixed: "left",
               render: (_, record) => {
                    return record.booking?.customer.fullName;
               },
          },
          {
               title: "Tài Xế",
               width: 150,
               dataIndex: "driver",
               key: "driver",
               render: (_, record) => {
                    return record.booking?.driver.fullName;
               },
          },
          {
               title: "Quãng Đường (Km)",
               dataIndex: "longDistance",
               key: "longDistance",
               render: (_, record) => {
                    return record.booking?.longDistance;
               },
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
                              {record.totalCost.toLocaleString("vi-VN", {
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
                         record.booking?.promotion
                              ? record.booking.promotion.percent
                              : 0
                    } %`;
               },
          },
          {
               title: "Người Thanh Toán",
               dataIndex: "cashier",
               key: "cashier",
          },
          {
               title: "Thanh Toán",
               dataIndex: "paymentStatus",
               key: "paymentStatus",
               render: (_, record) => {
                    return (
                         <p
                              className={`${
                                   record.paymentMethod
                                        ? "text-green-500"
                                        : "text-red-500"
                              }`}
                         >
                              {record.paymentMethod
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
                    return record.booking.paymentStatus === value;
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
                                   className="!bg-red-500 "
                                   onClick={() => {
                                        setInvoice(record),
                                             setIsOpenPDFPreview(true);
                                   }}
                              >
                                   <BsFileEarmarkPdfFill color="#fff" />
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
                         <h1 className="text-4xl ml-4">Hóa Đơn</h1>
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Search
                              className="w-6/12 mr-5 mt-2"
                              placeholder="Search"
                              onSearch={setSearchText}
                              enterButton={searchbutton}
                              style={{ width: 400 }}
                              size="large"
                         />
                    </div>
                    <div className="flex flex-col items-end w-full h-full">
                         <Table
                              className="h-full w-full mt-6 "
                              columns={columns}
                              dataSource={invoices.invoices}
                              pagination={false}
                              scroll={{ x: 1500, y: 400 }}
                         />
                         <Pagination
                              className="!mr-5 !mb-5 !mt-5"
                              showSizeChanger
                              showQuickJumper
                              defaultCurrent={1}
                              pageSize={limit}
                              total={invoices.total}
                              onChange={(current, pageSize) => {
                                   setPage(current);
                                   setLimit(pageSize);
                              }}
                         />
                    </div>
               </div>
               {isOpenPDFPreview && invoice && (
                    <>
                         <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                         <div className="fixed inset-0 flex items-center justify-center z-50">
                              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px]">
                                   <button className="absolute top-4 right-4">
                                        Close
                                   </button>
                                   <ExportInvoice data={invoice} />
                              </div>
                         </div>
                    </>
               )}
          </>
     );
};
export default InvoiceManagerPage;

import { useEffect, useState } from "react";
import useGetAllUsers from "../hook/useGetUser";
import { Button, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { IUser } from "../models/user.model";
import { Pagination } from "antd";
import { formatDate } from "../utils/formatDate";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FaUserLock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import UserModal from "../modals/userModal";
import { userService } from "../services/userService";
import { toast } from "react-toastify";
const UserManagerPage = () => {
     const { Search } = Input;
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [search, setSearch] = useState("");
     const { users, isLoading, refetch } = useGetAllUsers(page, limit, search);
     useEffect(() => {
          refetch();
     }, [users, refetch, page, limit, search]);
     const onSearch = (value: string) => {
          setSearch(value);
     };
     const handleBlockOrActiveUser = (idUser: number, active: boolean) => {
          userService
               .blockOrActiveUser(idUser, active)
               .then(() => {
                    toast.success(
                         active
                              ? "Khóa Người Dùng Thành Công"
                              : "Mở Khóa Người Dùng Thành Công"
                    );
                    refetch();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    toast.error(
                         active
                              ? "Khóa Người Dùng Thất Bại"
                              : "Mở Khóa Người Dùng Thất Bại"
                    );
               });
     };
     const searchbutton = <SearchOutlined type="default" />;
     const columns: ColumnsType<IUser> = [
          {
               title: "Họ Và Tên",
               width: 100,
               dataIndex: "fullName",
               key: "fullName",
               fixed: "left",
          },
          { title: "Email", dataIndex: "email", key: "email", fixed: "left" },
          {
               title: "Số Điện Thoại",
               dataIndex: "phone",
               key: "2",
               render: (_, record) => {
                    return record.phone ? record.phone : "N/A";
               },
          },
          {
               title: "Giới Tính",
               dataIndex: "gender",
               key: "gender",
               render: (_, record) => {
                    return record.gender == null
                         ? "N/A"
                         : record.gender
                         ? "Nam"
                         : "Nữ";
               },
               filters: [
                    {
                         text: "Nam",
                         value: true,
                    },
                    {
                         text: "Nữ",
                         value: false,
                    },
               ],
               onFilter(value, record) {
                    return record.gender === value;
               },
          },
          {
               title: "Ngày Sinh",
               dataIndex: "dob",
               key: "dob",
               render: (_, record) => {
                    return record.dob
                         ? formatDate(record.dob).toString()
                         : "N/A";
               },
          },
          {
               title: "Chức Vụ",
               dataIndex: "role",
               key: "role",
               render: (_, data) => {
                    return data.role || "N/A";
               },
               filters: [
                    {
                         text: "Nam",
                         value: true,
                    },
                    {
                         text: "Nữ",
                         value: false,
                    },
               ],
               onFilter(value, record) {
                    return record.role === value;
               },
          },
          {
               title: "Trạng Thái",
               dataIndex: "activated",
               key: "activated",
               render(_, record) {
                    return record.activated ? (
                         <span className="text-green-600">Đang Hoạt động</span>
                    ) : (
                         <span className="text-red-600">Đã Khóa</span>
                    );
               },
               filters: [
                    {
                         text: "Đang Hoạt động",
                         value: true,
                    },
                    {
                         text: "Đã Khóa",
                         value: false,
                    },
               ],
               onFilter(value, record) {
                    return record.activated === value;
               },
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => (
                    <div className="flex gap-1">
                         <Button
                              ghost
                              className={`${
                                   record.activated
                                        ? "!bg-yellow-400"
                                        : "!bg-green-600"
                              } text-white flex items-center gap-2 text-xl justify-center`}
                              onClick={() => {
                                   record.activated != undefined &&
                                        handleBlockOrActiveUser(
                                             record.id,
                                             record.activated
                                        );
                              }}
                         >
                              <span>
                                   {record.activated ? (
                                        <FaUserLock />
                                   ) : (
                                        <FaUserCheck />
                                   )}
                              </span>
                         </Button>
                         <div>
                              <UserModal
                                   icon={<IoPersonAddSharp />}
                                   refetch={refetch}
                                   userData={record}
                              />
                         </div>
                         {/* <div>
                              <Button danger block type="primary">
                                   <MdDeleteForever />
                              </Button>
                         </div> */}
                    </div>
               ),
          },
     ];
     if (!users || isLoading) return <Spin />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">Nhân viên</h1>
                         <UserModal
                              title="Create User"
                              icon={<FaUserEdit />}
                              refetch={refetch}
                         />
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Search
                              className="w-6/12 mr-5 mt-2"
                              placeholder="Search"
                              onSearch={onSearch}
                              enterButton={searchbutton}
                              style={{ width: 400 }}
                              size="large"
                         />
                         <Table
                              className="h-full w-full mt-6"
                              columns={columns}
                              dataSource={users.users}
                              pagination={false}
                         />
                         <Pagination
                              className="!mr-5 !mt-10"
                              showSizeChanger
                              defaultCurrent={page}
                              pageSize={limit}
                              total={users.totalPage}
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
export default UserManagerPage;

import { Button, Modal } from "antd";
import { useState } from "react";
import UserForm from "../forms/userForm";
import { IUser } from "../models/user.model";

interface Props {
     title?: string;
     icon: JSX.Element;
     userData?: IUser;
     refetch: () => void;
}
const UserModal = ({ title, icon, refetch, userData }: Props) => {
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);

     const showModal = () => {
          setOpen(true);
     };

     const handleOk = () => {
          setConfirmLoading(true);
          setTimeout(() => {
               setOpen(false);
               setConfirmLoading(false);
          }, 2000);
     };

     const handleCancel = () => {
          setOpen(false);
     };

     return (
          <>
               <Button
                    type="primary"
                    onClick={showModal}
                    className={`flex items-center justify-center gap-4 ${
                         title ? "!mr-5" : ""
                    }`}
               >
                    {title && <span className="!mr-2">{title}</span>}
                    <span className="mt-1">{icon}</span>
               </Button>
               <Modal
                    title={title || "Cập Nhật Thông Tin Nhân Viên"}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                    width={700}
               >
                    <UserForm
                         setOpen={setOpen}
                         refetch={refetch}
                         userData={userData}
                    />
               </Modal>
          </>
     );
};

export default UserModal;

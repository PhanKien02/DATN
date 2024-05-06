import { Button, Modal } from "antd";
import { useState } from "react";
import UnitPriceForm from "../forms/unitPriceForm";
import { IUnitPrice } from "../models/unitPrice";

interface Props {
     title?: string;
     icon?: JSX.Element;
     data?: IUnitPrice;
     refetch: any;
}
const UnitPriceModal = ({ title, icon, refetch, data }: Props) => {
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
                    title={title || "Cập Nhật Thông Tin Đơn Giá"}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                    width={600}
               >
                    <UnitPriceForm
                         setOpen={setOpen}
                         refetch={refetch}
                         data={data}
                    />
               </Modal>
          </>
     );
};

export default UnitPriceModal;

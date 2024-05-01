import { Button, Modal } from "antd";
import { useState } from "react";
import { IPromotion } from "../models/promotion";
import PromotionForm from "../forms/promotionForm";

interface Props {
     title?: string;
     icon?: JSX.Element;
     data?: IPromotion;
     refetch: () => void;
}
const PromotionModal = ({ title, icon, refetch, data }: Props) => {
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
                    title={title || "Cập Nhật Thông Tin Chương Trình"}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
               >
                    <PromotionForm
                         setOpen={setOpen}
                         refetch={refetch}
                         data={data}
                    />
               </Modal>
          </>
     );
};

export default PromotionModal;

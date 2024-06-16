import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { IBooking } from "../models/booking";
import { useSearchDrivingAround } from "../hook/useSearchDrivingAround";
import bookingService from "../services/bookingService";
import { toast } from "react-toastify";
interface Props {
     data: IBooking;
     open: boolean;
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     refetch: any;
}
const AssignDriverModal = ({ refetch, data, open, setOpen }: Props) => {
     const { drivers, refetch: refetchSerch } = useSearchDrivingAround(
          data.originLatitude,
          data.originlongitude
     );
     const [driver, setDriver] = useState<number | null>(null);
     console.log(drivers);

     useEffect(() => {
          refetchSerch();
     }, [open]);
     const handleOk = () => {
          if (!driver) {
               bookingService
                    .cancelBooking(data.id, "Không Tìm Thấy Tài Xế Phù Hợp")
                    .then(() => {
                         toast.success("Đã Hủy Chuyến");
                         setOpen(false);
                         refetch();
                    });
          } else {
               bookingService
                    .assignDriver(data.id, driver)
                    .then(() => {
                         toast.success("Đã Giao Tài Xế");
                         setOpen(false);
                         refetch(       );
                    })
                    .catch(() => toast.error("Giao Tài Xế Thất Bại"));
          }
     };

     const handleCancel = () => {
          setOpen(false);
     };
     return (
          <>
               <Modal
                    title="Sắp Xếp Tài Xế"
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={500}
                    okButtonProps={{
                         danger: driver ? false : true,
                    }}
                    okText={driver ? "OK" : "Hủy Chuyến"}
               >
                    <div className="w-full">
                         <div className="flex justify-between">
                              <strong>Khách Hàng</strong>
                              <p>{data?.customer.fullName}</p>
                         </div>
                         <div className="flex justify-between">
                              <strong className="w-24">Điểm Đón</strong>
                              <p>{data?.originAddress}</p>
                         </div>
                         <div className="flex justify-between">
                              <strong className="w-24">Điểm Đến</strong>
                              <p>{data?.destinationAddress}</p>
                         </div>
                         <div className="flex justify-between">
                              <strong className="w-24">Quãng Đường</strong>
                              <p>{data?.longDistance} (Km)</p>
                         </div>
                         <div className="flex justify-between">
                              <strong className="w-32">Thanh Toán</strong>
                              <p>
                                   {data?.totalPayment.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                   })}
                              </p>
                         </div>
                         <div className="flex justify-between">
                              <strong className="w-24">Giảm Giá</strong>
                              <p>
                                   {data?.promotion
                                        ? data.promotion.percent
                                        : 0}
                                   (%)
                              </p>
                         </div>
                    </div>
                    <Select className="w-full" onChange={setDriver}>
                         {drivers?.map((drv) => (
                              <Select.Option value={drv.id}>
                                   {drv.fullName}
                              </Select.Option>
                         ))}
                    </Select>
               </Modal>
          </>
     );
};

export default AssignDriverModal;

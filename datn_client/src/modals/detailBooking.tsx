import { Modal, Image } from "antd";
import { IBooking } from "../models/booking";
interface Props {
     data: IBooking;
     open: boolean;
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DetailBooking = ({ data, open, setOpen }: Props) => {
     const handleCancel = () => {
          setOpen(false);
     };
     return (
          <>
               <Modal
                    title="Chi Tiết Đơn Hàng"
                    open={open}
                    onCancel={handleCancel}
                    width={500}
                    footer={null}
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
                              <strong className="w-24">Đơn Giá</strong>
                              <p>
                                   {data.unitPrice.presentPrice.toLocaleString(
                                        "vi-VN",
                                        {
                                             style: "currency",
                                             currency: "VND",
                                        }
                                   )}
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
                         <div className="flex justify-between">
                              <strong className="w-32">Khách Thanh Toán</strong>
                              <p>
                                   {data?.totalPayment.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                   })}
                              </p>
                         </div>
                         {data.vehicleReceiptImage &&
                              data.vehicleReceiptImage?.length > 0 && (
                                   <div className="flex flex-col items-center gap-2">
                                        <strong>Hình ảnh nhận xe</strong>
                                        <div className="w-full flex justify-start gap-1 flex-wrap items-center">
                                             {data.vehicleReceiptImage?.map(
                                                  (veh) => (
                                                       <Image
                                                            src={veh.link}
                                                            width={145}
                                                       />
                                                  )
                                             )}
                                        </div>
                                   </div>
                              )}
                    </div>
               </Modal>
          </>
     );
};

export default DetailBooking;

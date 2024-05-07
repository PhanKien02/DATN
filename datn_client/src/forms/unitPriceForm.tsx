import { Button, Form, Input, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IUnitPrice } from "../models/unitPrice";
import unitPriceService from "../services/unitPriceService";
import dayjs from "dayjs";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     data?: IUnitPrice;
     refetch: any;
}
const UnitPriceForm = ({ setOpen, refetch, data }: Props) => {
     const [timeStart, setTimeStart] = useState<string>("");
     const [timeEnd, setTimeEnd] = useState<string>("");
     const isEdit = data !== undefined;
     const [form] = Form.useForm<IUnitPrice>();
     const validateTime = () => {
          const timeStart = form.getFieldValue("timeStart");
          const timeEnd = form.getFieldValue("timeEnd");
          if (dayjs(timeStart) > dayjs(timeEnd))
               return Promise.reject("Giờ Bắt Đầu Không Được Sau Giờ Kết Thúc");
          else return Promise.resolve();
     };
     const onFinish = (value: IUnitPrice) => {
          if (isEdit)
               unitPriceService
                    .savePrice({
                         ...value,
                         timeStart: timeStart,
                         timeEnd: timeEnd,
                         id: data.id,
                    })
                    .then(() => {
                         refetch();
                         setOpen(false);
                         toast.success("Cập Nhật Thông Tin Đơn Giá Thành Công");
                    })
                    .catch((error) => {
                         console.log({ error });
                         if (error.response)
                              toast.error(error.response.data.message);
                         else
                              toast.error(
                                   "Cập Nhật Thông Tin Đơn Giá Thất Bại"
                              );
                    });
          else
               unitPriceService
                    .savePrice({
                         ...value,
                         timeStart: timeStart,
                         timeEnd: timeEnd,
                    })
                    .then(() => {
                         refetch();
                         setOpen(false);
                         toast.success("Thêm Mới Đơn Giá Thành Công");
                    })
                    .catch((error) => {
                         console.log({ error });
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Thêm Mới Đơn Giá Thất Bại");
                    });
     };
     const onReset = () => {
          form.resetFields();
     };
     useEffect(() => {
          form.resetFields();
     }, [data, setOpen]);

     const format = "HH:mm:ss";
     return (
          <div className="mt-2">
               <Form
                    initialValues={
                         data
                              ? {
                                     ...data,
                                     timeStart: dayjs(
                                          data?.timeStart,
                                          "HH:mm:ss"
                                     ),
                                     timeEnd: dayjs(data?.timeEnd, "HH:mm:ss"),
                                }
                              : undefined
                    }
                    scrollToFirstError
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    className=""
                    onFinish={onFinish}
                    autoComplete="off"
               >
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Giờ Bắt Đầu"
                              name="timeStart"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Giờ Bắt Đầu",
                                   },
                                   {
                                        validator: validateTime,
                                   },
                              ]}
                         >
                              <TimePicker
                                   format={format}
                                   onChange={(value, dateString) =>
                                        setTimeStart(dateString as string)
                                   }
                              />
                         </Form.Item>
                         <Form.Item
                              label="Giờ Kết Thúc"
                              name="timeEnd"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Giờ Kết Thúc",
                                   },
                                   {
                                        validator: validateTime,
                                   },
                              ]}
                         >
                              <TimePicker
                                   format={format}
                                   onChange={(value, dateString) => {
                                        console.log({ dateString });
                                        setTimeEnd(dateString as string);
                                   }}
                              />
                         </Form.Item>
                         <Form.Item
                              label="Giá Tiền"
                              name="presentPrice"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Giá Tiền",
                                   },
                              ]}
                         >
                              <Input type="number" />
                         </Form.Item>
                    </div>
                    <Form.Item className="flex justify-center">
                         <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                         >
                              OK
                         </Button>
                         <Button
                              htmlType="button"
                              onClick={onReset}
                              className="ml-3"
                         >
                              Reset
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
};
export default UnitPriceForm;

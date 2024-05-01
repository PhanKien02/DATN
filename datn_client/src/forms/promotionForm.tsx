import { Button, DatePicker, Form, Input } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { IPromotion } from "../models/promotion";
import promotionService from "../services/promotionService";
import { formatDate } from "../utils/formatDate";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     data?: IPromotion;
     refetch: () => void;
}
const PromotionForm = ({ setOpen, refetch, data }: Props) => {
     const isEdit = data !== undefined;
     const { RangePicker } = DatePicker;
     const validateDob = (date: string, endDate?: string) => {
          const today = moment();
          if (today.diff(moment(date), "day") > 0)
               return Promise.reject("Ngày Hết Hạn Không Hợp Lệ");
          else if (endDate)
               return moment(date).diff(moment(endDate), "day") > 0
                    ? Promise.reject("Ngày Bắt Đầu Phải Trước Ngày Kết Thúc")
                    : Promise.resolve();
          else return Promise.resolve();
     };
     const validateAmount = (value: number) => {
          if (value <= 0)
               return Promise.reject("Vui Lòng Nhập Giá Trị Lớn Hơn 0");
          else return Promise.resolve();
     };
     const validatePercen = (value: number) => {
          if (value <= 0 || value > 100)
               return Promise.reject(
                    "Vui Lòng Nhập Giá Trị Trong Khoảng 0-100 (%)"
               );
          else return Promise.resolve();
     };
     const [form] = Form.useForm<IPromotion>();
     const onFinish = (value: IPromotion) => {
          if (!isEdit)
               promotionService
                    .savePromotion(value)
                    .then(() => {
                         toast.success(
                              "Thêm Mới Chương Trình Khuyễn Mãi Thành Công"
                         );
                         refetch();
                         setOpen(false);
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Login Error");
                    });
          else {
               promotionService
                    .savePromotion({ ...value, id: data.id })
                    .then(() => {
                         toast.success(
                              "Cập Nhật Chương Trình Khuyễn Mãi Thành Công"
                         );
                         refetch();
                         setOpen(false);
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Login Error");
                    });
          }
     };
     const onReset = () => {
          form.resetFields();
     };
     useEffect(() => {
          form.resetFields();
     }, [data]);

     return (
          <div className="mt-2">
               <Form
                    initialValues={{
                         ...data,
                         expDate: formatDate(data?.expDate),
                         startDate: formatDate(data?.startDate),
                    }}
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
                              label="Tên Chương Trình"
                              name="programName"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Chương Trình Khuyễn Mãi!",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input />
                         </Form.Item>
                         <Form.Item
                              label="Ngày Bắt Đầu"
                              name="startDate"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Ngày Bắt Đầu",
                                   },
                                   {
                                        validator: (_, e) => {
                                             return validateDob(
                                                  e,
                                                  form.getFieldValue("expDate")
                                             );
                                        },
                                   },
                              ]}
                         >
                              <Input type="date" />
                         </Form.Item>
                         <Form.Item
                              label="Ngày Hết Hạn"
                              name="expDate"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Ngày Hết Hạn",
                                   },
                                   {
                                        validator: (_, e) => {
                                             return validateDob(e);
                                        },
                                   },
                              ]}
                         >
                              <Input type="date" />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Số Lượng"
                              name="amount"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Số Lượng!",
                                   },
                                   {
                                        validator: (_, e) => {
                                             return validateAmount(e);
                                        },
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input type="number" />
                         </Form.Item>
                         <Form.Item
                              label="Giá trị (%)"
                              name="percent"
                              className="flex-1"
                              required
                              rules={[
                                   {
                                        validator: (_, e) => {
                                             if (!e)
                                                  return Promise.reject(
                                                       "Vui Lòng Nhập Giá trị!"
                                                  );
                                             else return validatePercen(e);
                                        },
                                   },
                              ]}
                         >
                              <Input type="number" />
                         </Form.Item>
                         <Form.Item
                              label="Quảng Đường Tối Thiểu (Km)"
                              name="conditionPrice"
                              className="flex-1"
                              required
                              rules={[
                                   {
                                        validator: (_, e) => {
                                             if (!e)
                                                  return Promise.reject(
                                                       "Vui Lòng Nhập Giá trị!"
                                                  );
                                             else return validateAmount(e);
                                        },
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
export default PromotionForm;

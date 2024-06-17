import {
     Page,
     Text,
     View,
     Document,
     StyleSheet,
     Font,
     PDFViewer,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import robotoRegular from "/fonts/Roboto-Regular.ttf";
import robotoBold from "/fonts/Roboto-Bold.ttf";
import { IInvoice } from "../models/invoice";
import { formatDate } from "../utils/formatDate";
import { useAuthContext } from "../contexts/authContext";

Font.register({
     family: "Roboto",
     fonts: [
          { src: robotoRegular, fontWeight: "normal" },
          { src: robotoBold, fontWeight: "bold" },
     ],
});

const styles = StyleSheet.create({
     doc: {
          fontFamily: "Roboto",
     },
     page: {
          fontFamily: "Roboto",
          backgroundColor: "#FFFFFF",
          padding: 20,
     },
     title: {
          fontFamily: "Roboto",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
          color: "#4B70F5", // Light red color
     },
     section: {
          marginBottom: 10,
     },
     table: {
          // display: 'table',
          fontFamily: "Roboto",
          width: "auto",
          borderStyle: "solid",
          borderColor: "#4B70F5",
          borderWidth: 1,
          borderRightWidth: 0,
          borderBottomWidth: 0,
     },
     tableRow: {
          fontFamily: "Roboto",
          flexDirection: "row",
     },
     tableCol: {
          fontFamily: "Roboto",
          width: "25%",
          borderStyle: "solid",
          borderColor: "#4B70F5",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
     },
     tableCell: {
          fontFamily: "Roboto",
          margin: 5,
          fontSize: 10,
     },
     image: {
          width: 100,
          height: 100,
          marginBottom: 10,
     },
     header: {
          fontFamily: "Roboto",
          fontSize: 18,
          fontWeight: "bold",
          alignItems: "center",
          width: "100%",
          marginBottom: 10,
          color: "#4B70F5", // Light red color
     },
});

const ExportInvoice = ({ data }: { data: IInvoice }) => {
     const { userLogin } = useAuthContext();
     if (!data) {
          console.log(3333);
          return (
               <Document>
                    <Page size="A4" style={styles.page}>
                         <Text style={styles.title}>
                              Dữ liệu vaccin không đúng
                         </Text>
                    </Page>
               </Document>
          );
     }
     return (
          <div className="absolute top-0 right-0 left-0 bottom-0">
               <PDFViewer width="100%" height="100%">
                    <Document>
                         <Page size="A4" style={styles.page}>
                              <Text style={styles.title}>
                                   Hóa Đơn Bán Hàng{" "}
                              </Text>
                              <View style={styles.section}>
                                   <Text style={styles.header}>
                                        Thông Tin Đơn Hàng
                                   </Text>
                                   <View>
                                        <Text>
                                             Họ và tên khách hàng:
                                             {data.booking.customer.fullName}
                                        </Text>
                                        <Text>
                                             Ngày sinh:{" "}
                                             {data.booking.customer.dob
                                                  ? formatDate(
                                                         data.booking.customer
                                                              .dob
                                                    )
                                                  : ""}
                                        </Text>
                                        <Text>
                                             Giới tính:{" "}
                                             {data.booking.customer.gender
                                                  ? "Nam"
                                                  : "Nữ"}
                                        </Text>
                                   </View>
                                   <Text>
                                        Số điện thoại:{" "}
                                        {data.booking.customer.phone || ""}
                                   </Text>
                                   <View>
                                        <Text>
                                             Họ và tên tài xế:{" "}
                                             {data.booking.driver.fullName}
                                        </Text>
                                   </View>
                              </View>
                              <View style={styles.section}>
                                   <Text style={styles.header}>
                                        Chi Tiết Hóa Đơn
                                   </Text>
                                   <Table tdStyle={{ padding: "2px" }}>
                                        <TH style={{ fontSize: 14 }}>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  Điểm đón
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  Điểm Đến
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {" "}
                                                  Quãng đường (Km)
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  Đơn giá
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  Giảm giá (%)
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {" "}
                                                  Thành tiền
                                             </TD>
                                        </TH>
                                        <TR>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {data.booking.originAddress}
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {
                                                       data.booking
                                                            .destinationAddress
                                                  }
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {data.booking.longDistance}
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {
                                                       data.booking.unitPrice
                                                            .presentPrice
                                                  }
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {data.booking.promotion
                                                       ? data.booking.promotion
                                                              .percent
                                                       : 0}
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {" "}
                                                  {data.totalCost}
                                             </TD>
                                        </TR>
                                        <TR>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  Tổng Tiền
                                             </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "center",
                                                  }}
                                             >
                                                  {" "}
                                                  {data.totalCost}
                                             </TD>
                                        </TR>
                                   </Table>
                              </View>
                              <View
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        marginTop: 80,
                                   }}
                              >
                                   <View
                                        style={{
                                             flexDirection: "column",
                                             alignItems: "center",
                                        }}
                                   >
                                        <Text>
                                             Đà Nẵng, Ngày{" "}
                                             {new Date().getDate()}
                                             Tháng {new Date().getMonth() +
                                                  1}{" "}
                                             Năm {new Date().getFullYear()}
                                        </Text>
                                        <Text
                                             style={{
                                                  marginTop: 20,
                                                  fontWeight: "bold",
                                             }}
                                        >
                                             Người Xuất Hóa Đơn
                                        </Text>
                                        <Text>(Ký ghi rõ họ tên)</Text>
                                        <Text
                                             style={{
                                                  fontWeight: "bold",
                                                  marginTop: 70,
                                             }}
                                        >
                                             {userLogin?.fullName}
                                        </Text>
                                   </View>
                              </View>
                         </Page>
                    </Document>
               </PDFViewer>
          </div>
     );
};

export default ExportInvoice;

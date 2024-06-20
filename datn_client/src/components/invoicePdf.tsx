import {
     Page,
     Text,
     View,
     Document,
     StyleSheet,
     Font,
     PDFViewer,
     Image,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import robotoRegular from "/fonts/Roboto-Regular.ttf";
import robotoBold from "/fonts/Roboto-Bold.ttf";
import { IInvoice } from "../models/invoice";
import { formatDate } from "../utils/formatDate";
import { useAuthContext } from "../contexts/authContext";
import { convertNumberToWords } from "../utils/converNumberToText";
import logo from "../assets/logo.png";
import ck from "../assets/chu-ky.png";

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
          textAlign: "center",
          color: "#000", // Light red color
     },
     section: {
          marginBottom: 10,
     },
     table: {
          // display: 'table',
          fontFamily: "Roboto",
          width: "auto",
          borderStyle: "solid",
          borderColor: "#000",
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
          borderColor: "#000",
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
          color: "#000", // Light red color
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
                              <Image
                                   src={logo}
                                   style={{
                                        width: 500,
                                        position: "absolute",
                                        top: "20%",
                                        left: "7%",
                                        opacity: 0.5,
                                   }}
                              />
                              <Text style={styles.title}>Hóa Đơn Bán Hàng</Text>
                              <Text
                                   style={{
                                        textAlign: "center",
                                        fontSize: "12",
                                   }}
                              >
                                   (Ngày {formatDate(new Date()).split("-")[0]}{" "}
                                   Tháng {formatDate(new Date()).split("-")[1]}{" "}
                                   Năm {formatDate(new Date()).split("-")[2]})
                              </Text>
                              <View style={styles.section}>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Đơn vị bán hàng:
                                        </Text>
                                        <Text>TAXI DELIVER</Text>
                                   </View>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Mã số thuế:
                                        </Text>
                                        <Text>8794909789</Text>
                                   </View>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Điện thoại:
                                        </Text>
                                        <Text>0374824666</Text>
                                   </View>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Tài xế:
                                        </Text>
                                        <Text>
                                             {data.booking.driver.fullName}
                                        </Text>
                                   </View>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Họ và tên khách hàng:
                                        </Text>
                                        <Text>
                                             {data.booking.customer.fullName}
                                        </Text>
                                   </View>
                                   <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                             Điện thoại:
                                        </Text>
                                        <Text>
                                             {data.booking.customer.phone ||
                                                  "0367928372"}
                                        </Text>
                                   </View>
                              </View>
                              <View style={styles.section}>
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
                                                       justifyContent:
                                                            "flex-end",
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
                                                       justifyContent:
                                                            "flex-end",
                                                  }}
                                             >
                                                  {data.booking.longDistance}
                                             </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent:
                                                            "flex-end",
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
                                                       justifyContent:
                                                            "flex-end",
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
                                                       justifyContent:
                                                            "flex-end",
                                                  }}
                                             >
                                                  {" "}
                                                  {data.totalCost}
                                             </TD>
                                        </TR>
                                        <TR>
                                             <TD
                                                  style={{
                                                       height: 40,
                                                  }}
                                             ></TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                        </TR>
                                        <TR>
                                             <TD
                                                  style={{
                                                       height: 40,
                                                  }}
                                             ></TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD></TD>
                                        </TR>
                                        <TR>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent:
                                                            "flex-end",
                                                  }}
                                             >
                                                  Tiền thuế
                                             </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD> </TD>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent:
                                                            "flex-end",
                                                  }}
                                             >
                                                  0
                                             </TD>
                                        </TR>
                                        <TR>
                                             <TD
                                                  style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent:
                                                            "flex-end",
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
                                                       justifyContent:
                                                            "flex-end",
                                                  }}
                                             >
                                                  {" "}
                                                  {data.totalCost}
                                             </TD>
                                        </TR>
                                   </Table>
                                   <View
                                        style={{
                                             flexDirection: "row",
                                             marginTop: 10,
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  fontWeight: "bold",
                                             }}
                                        >
                                             Số tiền bằng chữ:{" "}
                                        </Text>
                                        <Text>
                                             {convertNumberToWords(
                                                  data.totalCost
                                             )}{" "}
                                        </Text>
                                   </View>
                              </View>
                              <View
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 10,
                                        marginLeft: 40,
                                   }}
                              >
                                   <View
                                        style={{
                                             flexDirection: "column",
                                             alignItems: "center",
                                             marginTop: 20,
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  marginTop: 20,
                                                  fontWeight: "bold",
                                             }}
                                        >
                                             Người Mua Hàng
                                        </Text>
                                        <Text>(Ký ghi rõ họ tên)</Text>
                                        <Text
                                             style={{
                                                  fontWeight: "bold",
                                                  marginTop: 94,
                                             }}
                                        >
                                             {data.booking.customer.fullName}
                                        </Text>
                                   </View>
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
                                        <>
                                             <Image
                                                  src={ck}
                                                  style={{
                                                       width: 160,
                                                  }}
                                             />
                                             <Text
                                                  style={{
                                                       fontWeight: "bold",
                                                  }}
                                             >
                                                  {userLogin &&
                                                       userLogin.fullName}
                                             </Text>
                                        </>
                                   </View>
                              </View>
                         </Page>
                    </Document>
               </PDFViewer>
          </div>
     );
};

export default ExportInvoice;

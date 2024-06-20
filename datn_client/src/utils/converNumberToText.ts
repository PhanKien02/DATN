// Hàm chuyển đổi số thành chữ
export function convertNumberToWords(num: number) {
     const ones = [
          "",
          "một",
          "hai",
          "ba",
          "bốn",
          "năm",
          "sáu",
          "bảy",
          "tám",
          "chín",
     ];

     const teens = [
          "mười",
          "mười một",
          "mười hai",
          "mười ba",
          "mười bốn",
          "mười lăm",
          "mười sáu",
          "mười bảy",
          "mười tám",
          "mười chín",
     ];

     const tens = [
          "",
          "",
          "hai mươi",
          "ba mươi",
          "bốn mươi",
          "năm mươi",
          "sáu mươi",
          "bảy mươi",
          "tám mươi",
          "chín mươi",
     ];

     const thousands = ["", "nghìn", "triệu", "tỷ"];

     if (num === 0) return "không";

     let words = "";

     // Chia số thành từng nhóm ba chữ số
     let numStr = num.toString();
     let numArray = [];
     while (numStr.length > 0) {
          numArray.push(numStr.slice(-3));
          numStr = numStr.slice(0, -3);
     }

     for (let i = 0; i < numArray.length; i++) {
          let n = parseInt(numArray[i]);
          if (n === 0) continue;

          let groupWords = "";

          let hundreds = Math.floor(n / 100);
          n %= 100;
          let ten = Math.floor(n / 10);
          let one = n % 10;

          if (hundreds > 0) {
               groupWords += ones[hundreds] + " trăm ";
               if (ten === 0 && one > 0) {
                    groupWords += "lẻ ";
               }
          }

          if (ten > 1) {
               groupWords += tens[ten] + " ";
               if (one > 0) {
                    groupWords += ones[one] + " ";
               }
          } else if (ten === 1) {
               groupWords += teens[one] + " ";
          } else {
               if (one > 0) {
                    groupWords += ones[one] + " ";
               }
          }

          if (groupWords !== "") {
               words = groupWords + thousands[i] + " " + words;
          }
     }

     return words + "đồng".trim();
}

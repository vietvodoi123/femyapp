export function transformMoney(number: number) {
  // Chuyển số nguyên thành chuỗi
  let str = String(number);
  let formattedNumber = "";

  // Lặp qua từng ký tự từ cuối chuỗi về đầu
  for (let i = str.length - 1, j = 1; i >= 0; i--, j++) {
    // Thêm ký tự vào đầu chuỗi kết quả
    formattedNumber = str[i] + formattedNumber;
    // Thêm dấu chấm sau mỗi ba ký tự, trừ ký tự đầu tiên
    if (j % 3 === 0 && i !== 0) {
      formattedNumber = "." + formattedNumber;
    }
  }

  return formattedNumber;
}

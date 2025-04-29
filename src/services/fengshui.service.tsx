type GioiTinh = "Nam" | "Nữ";

export function checkTamTai(namSinh: number, namXayNha: number): string {
  if (namSinh < 4 || namXayNha < 0) return "Năm nhập vào quá nhỏ";
  const conGiap = (namSinh - 4) % 12;
  const tamTai: Record<number, number[]> = {
    0: [6, 7, 8],
    1: [9, 10, 11],
    2: [0, 1, 2],
    3: [3, 4, 5],
    4: [6, 7, 8],
    5: [9, 10, 11],
    6: [0, 1, 2],
    7: [3, 4, 5],
    8: [6, 7, 8],
    9: [9, 10, 11],
    10: [0, 1, 2],
    11: [3, 4, 5],
  };

  const namTamTai = tamTai[conGiap];
  const namXayNhaConGiap = (namXayNha - 4) % 12;

  return namTamTai.includes(namXayNhaConGiap)
    ? "Phạm Tam Tai"
    : "Không phạm Tam Tai";
}

export function checkKimLau(namSinh: number, namXayNha: number): string {
  if (namSinh < 4 || namXayNha < 0) return "Năm nhập vào quá nhỏ";
  if (namXayNha - namSinh <= 0) return "";
  const tuoiAmLich = namXayNha - namSinh + 1;
  const du = tuoiAmLich % 9;

  if (du === 1) return "Phạm Kim Lâu Thân - Gây hại cho bản thân gia chủ";
  if (du === 3) return "Phạm Kim Lâu Thê - Gây hại cho vợ/chồng";
  if (du === 6) return "Phạm Kim Lâu Tử - Gây hại cho con cái";
  if (du === 8)
    return "Phạm Kim Lâu Lục Súc - Gây hại cho gia súc, ảnh hưởng việc chăn nuôi và kinh tế";

  return "Không phạm Kim Lâu";
}

export function checkHoangOc(namSinh: number, namXayNha: number): string {
  if (namSinh < 4 || namXayNha < 0) return "Năm nhập vào quá nhỏ";
  if (namXayNha - namSinh <= 0) return "";
  const tuoiAmLich = namXayNha - namSinh + 1;
  const cung = (tuoiAmLich - 1) % 6;

  switch (cung) {
    case 0:
      return "Nhất Cát / Tốt - Làm nhà đại cát, mọi việc thuận lợi";
    case 1:
      return "Nhị Nghi / Tốt - Làm nhà tốt, có lợi cho gia chủ";
    case 2:
      return "Tam Địa Sát / Xấu - Làm nhà gặp nhiều tai họa, bất an";
    case 3:
      return "Tứ Tấn Tài / Tốt - Làm nhà phát tài, công danh sự nghiệp hanh thông";
    case 4:
      return "Ngũ Thọ Tử / Xấu - Làm nhà dễ gặp cảnh ly biệt, sinh ly tử biệt";
    case 5:
      return "Lục Hoang Ốc / Xấu - Làm nhà lụi bại, khó khăn về tài chính";
    default:
      return "Không xác định";
  }
}

export function chuyenDoiNamAmLich(namDuongLich: number): string {
  const thienCan = [
    "Giáp",
    "Ất",
    "Bính",
    "Đinh",
    "Mậu",
    "Kỷ",
    "Canh",
    "Tân",
    "Nhâm",
    "Quý",
  ];
  const diaChi = [
    "Tý",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
    "Tuất",
    "Hợi",
  ];

  const can = thienCan[(namDuongLich - 4) % 10];
  const chi = diaChi[(namDuongLich - 4) % 12];

  return `${can} ${chi}`;
}

export function getCungMenh(namSinh: number): string {
  // Định nghĩa type
  type NguHanh = {
    name: string;
    meaning: string;
  };

  const nguHanh: NguHanh[] = [
    { name: "Hải Trung Kim", meaning: "Vàng trong biển" },
    { name: "Hải Trung Kim", meaning: "Vàng trong biển" },
    { name: "Lư Trung Hỏa", meaning: "Lửa trong lò" },
    { name: "Lư Trung Hỏa", meaning: "Lửa trong lò" },
    { name: "Đại Lâm Mộc", meaning: "Cây rừng lớn" },
    { name: "Đại Lâm Mộc", meaning: "Cây rừng lớn" },
    { name: "Lộ Bàng Thổ", meaning: "Đất ven đường" },
    { name: "Lộ Bàng Thổ", meaning: "Đất ven đường" },
    { name: "Kiếm Phong Kim", meaning: "Vàng mũi kiếm" },
    { name: "Kiếm Phong Kim", meaning: "Vàng mũi kiếm" },
    { name: "Sơn Đầu Hỏa", meaning: "Lửa trên núi" },
    { name: "Sơn Đầu Hỏa", meaning: "Lửa trên núi" },
    { name: "Giản Hạ Thủy", meaning: "Nước dưới khe" },
    { name: "Giản Hạ Thủy", meaning: "Nước dưới khe" },
    { name: "Thành Đầu Thổ", meaning: "Đất đầu thành" },
    { name: "Thành Đầu Thổ", meaning: "Đất đầu thành" },
    { name: "Bạch Lạp Kim", meaning: "Vàng trong nến (vàng nóng chảy)" },
    { name: "Bạch Lạp Kim", meaning: "Vàng trong nến (vàng nóng chảy)" },
    { name: "Dương Liễu Mộc", meaning: "Cây dương liễu" },
    { name: "Dương Liễu Mộc", meaning: "Cây dương liễu" },
    { name: "Tuyền Trung Thủy", meaning: "Nước trong suối" },
    { name: "Tuyền Trung Thủy", meaning: "Nước trong suối" },
    { name: "Ốc Thượng Thổ", meaning: "Đất trên nóc nhà" },
    { name: "Ốc Thượng Thổ", meaning: "Đất trên nóc nhà" },
    { name: "Tích Lịch Hỏa", meaning: "Lửa sấm sét" },
    { name: "Tích Lịch Hỏa", meaning: "Lửa sấm sét" },
    { name: "Tùng Bách Mộc", meaning: "Cây tùng bách" },
    { name: "Tùng Bách Mộc", meaning: "Cây tùng bách" },
    { name: "Trường Lưu Thủy", meaning: "Nước chảy dài" },
    { name: "Trường Lưu Thủy", meaning: "Nước chảy dài" },
    { name: "Sa Trung Kim", meaning: "Vàng trong cát" },
    { name: "Sa Trung Kim", meaning: "Vàng trong cát" },
    { name: "Sơn Hạ Hỏa", meaning: "Lửa dưới núi" },
    { name: "Sơn Hạ Hỏa", meaning: "Lửa dưới núi" },
    { name: "Bình Địa Mộc", meaning: "Cây đồng bằng" },
    { name: "Bình Địa Mộc", meaning: "Cây đồng bằng" },
    { name: "Bích Thượng Thổ", meaning: "Đất trên vách tường" },
    { name: "Bích Thượng Thổ", meaning: "Đất trên vách tường" },
    { name: "Kim Bạch Kim", meaning: "Vàng thành thỏi" },
    { name: "Kim Bạch Kim", meaning: "Vàng thành thỏi" },
    { name: "Phú Đăng Hỏa", meaning: "Lửa đèn to" },
    { name: "Phú Đăng Hỏa", meaning: "Lửa đèn to" },
    { name: "Thiên Hà Thủy", meaning: "Nước mưa trên trời" },
    { name: "Thiên Hà Thủy", meaning: "Nước mưa trên trời" },
    { name: "Đại Trạch Thổ", meaning: "Đất bãi rộng" },
    { name: "Đại Trạch Thổ", meaning: "Đất bãi rộng" },
    { name: "Thoa Xuyến Kim", meaning: "Vàng trang sức (vòng, xuyến)" },
    { name: "Thoa Xuyến Kim", meaning: "Vàng trang sức (vòng, xuyến)" },
    { name: "Tang Đố Mộc", meaning: "Cây dâu" },
    { name: "Tang Đố Mộc", meaning: "Cây dâu" },
    { name: "Đại Khê Thủy", meaning: "Nước suối lớn" },
    { name: "Đại Khê Thủy", meaning: "Nước suối lớn" },
    { name: "Sa Trung Thổ", meaning: "Đất trong cát" },
    { name: "Sa Trung Thổ", meaning: "Đất trong cát" },
    { name: "Thiên Thượng Hỏa", meaning: "Lửa trên trời" },
    { name: "Thiên Thượng Hỏa", meaning: "Lửa trên trời" },
    { name: "Thạch Lựu Mộc", meaning: "Cây thạch lựu" },
    { name: "Thạch Lựu Mộc", meaning: "Cây thạch lựu" },
    { name: "Đại Hải Thủy", meaning: "Nước biển lớn" },
    { name: "Đại Hải Thủy", meaning: "Nước biển lớn" },
  ];

  const index = (namSinh - 1924) % 60;
  return nguHanh[index].name + " - " + nguHanh[index].meaning;
}

function isSuitableAge(namSinh: number, namXayNha: number): boolean {
  if (namXayNha - namSinh <= 0) return false;
  const tamTai = checkTamTai(namSinh, namXayNha);
  const kimLau = checkKimLau(namSinh, namXayNha);
  const hoangOc = checkHoangOc(namSinh, namXayNha);

  return (
    tamTai === "Không phạm Tam Tai" &&
    kimLau === "Không phạm Kim Lâu" &&
    hoangOc.includes("Tốt")
  );
}

export function findSuitableAges(namSinh: number, namXay: number): number[] {
  const suitableAges: number[] = [];
  for (let year = namSinh - 50; year <= namSinh + 5; year++) {
    if (isSuitableAge(year, namXay)) {
      suitableAges.push(year);
    }
  }
  return suitableAges;
}

function getQuaiSo(namSinh: number, gioiTinh: GioiTinh): number {
  const lastTwoDigits = namSinh % 100;
  const sumLastTwoDigits =
    Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);
  const reducedSum = sumLastTwoDigits % 9 || 9;

  let quaiSo: number;
  if (namSinh < 2000) {
    quaiSo = gioiTinh === "Nam" ? 10 - reducedSum : 5 + reducedSum;
  } else {
    quaiSo = gioiTinh === "Nam" ? 9 - reducedSum : 6 + reducedSum;
  }

  return quaiSo % 9 || 9;
}

export function getHuongNha(namSinh: number, gioiTinh: GioiTinh): string {
  const quaiSo = getQuaiSo(namSinh, gioiTinh);
  const huongNhaMap: Record<number, string> = {
    1: "Bắc",
    2: "Tây Nam",
    3: "Đông",
    4: "Đông Nam",
    5: gioiTinh === "Nam" ? "Đông Bắc" : "Tây Nam",
    6: "Tây Bắc",
    7: "Tây",
    8: "Đông Bắc",
    9: "Nam",
  };

  return huongNhaMap[quaiSo] || "Không xác định";
}

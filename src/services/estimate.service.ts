// constructionService.ts
import {
  fetchCityHousePackages,
  fetchOneStoryHousePackages,
  fetchVillaPackages,
} from "@/actions/fetch-etimate-package";

export async function fetchConstructionPackagesBySelection(
  city: string,
  loaiCongTrinh: string
) {
  if (!city || !loaiCongTrinh) return;

  switch (loaiCongTrinh) {
    case "Nhà phố":
      return await fetchCityHousePackages(city);
    case "Nhà cấp 4":
      return await fetchOneStoryHousePackages(city);
    case "Biệt thự":
      return await fetchVillaPackages(city);
    default:
      console.warn("Loại công trình không hợp lệ");
  }
}

import { MainLayout } from "../components/layout";
import { RecentBooks } from "../components/main";
import Banner from "../components/main/Banner";

export default function main() {
  return (
    <MainLayout pageName="메인">
      <Banner />
      <RecentBooks />
    </MainLayout>
  );
}

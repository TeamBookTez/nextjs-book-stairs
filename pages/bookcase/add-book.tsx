import { MainLayout } from "../../components/layout";
import { MainHeader } from "../../components/main";

export default function addBook() {
  const mainHeader = <MainHeader pageName="책추가" />;

  return (
    <MainLayout header={mainHeader}>
      <div>add book</div>
    </MainLayout>
  );
}

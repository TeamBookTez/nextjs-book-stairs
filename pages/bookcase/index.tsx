import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { MainLayout } from "../../components/layout";
import { MainHeader } from "../../components/main";
import { BookcaseNavigationProvider } from "../../util/bookcaseContext";
import useUser from "../../util/hooks/useUser";

export default function Bookcase() {
  const { isLogin } = useUser();

  const mainHeader = <MainHeader isLogin={isLogin} pageName="서재" />;

  return (
    <BookcaseNavigationProvider>
      <MainLayout header={mainHeader}>
        <Navigation />
        <Cards />
      </MainLayout>
    </BookcaseNavigationProvider>
  );
}

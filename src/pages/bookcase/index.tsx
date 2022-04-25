import Cards from "../../components/bookcase/Cards";
import Navigation from "../../components/bookcase/Navigation";
import { MainLayout } from "../../components/layout";

export default function bookcase() {
  const handleChangeNavIndex = () => {
    console.log("콘솔테스트");
  };

  return (
    <MainLayout pageName="서재">
      <Navigation navIndex={0} onChangeNavIndex={handleChangeNavIndex} />
      {/* <Cards navIndex={0}></Cards> */}
      <div>bookcase</div>
    </MainLayout>
  );
}

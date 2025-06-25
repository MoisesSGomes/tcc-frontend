import Slider from "../../components/SliderPrincipal";
import AddRecent from "../../components/AddRecent";
import AllEvents from "../../components/AllEvents";
import CategoryMenu from "../../components/CategoryMenu";
import { DivUnit3, DivUnit2, DivColumn, DivUnitSlider, TitleSection } from "./styles";


function Home() {
  return (
    <DivColumn>
      <CategoryMenu />

      <DivUnitSlider>
        <TitleSection>Eventos Mais Próximos</TitleSection>
        <Slider />
      </DivUnitSlider>

      <DivUnit2>
        <TitleSection>Adicionados Recentemente</TitleSection>
        <AddRecent />
      </DivUnit2>

      <DivUnit3>
        <TitleSection>Todos Eventos</TitleSection>
        <AllEvents />
      </DivUnit3>
    </DivColumn>
  );
}

export default Home;
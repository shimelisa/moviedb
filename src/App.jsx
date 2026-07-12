import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import DisplayRow from "./Components/DisplayRow/DisplayRow";
import Footer from "./Components/Footer/Footer";
import SearchResults from "./Components/SearchResults/SearchResults";
import MyListPage from "./Components/MyList/MyListPage";
import MovieModal from "./Components/MovieModal/MovieModal";
import { MyListProvider } from "./Context/MyListContext";
import { MovieModalProvider } from "./Context/MovieModalContext";

function Home() {
  return (
    <>
      <Banner />
      <DisplayRow />
    </>
  );
}

function App() {
  return (
    <MyListProvider>
      <MovieModalProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>

        <Footer />
        <MovieModal />
      </MovieModalProvider>
    </MyListProvider>
  );
}

export default App;

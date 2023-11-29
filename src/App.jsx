import { useEffect, useState } from "react";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions";
import SideDetail from "./components/SideDetail";

function App() {
  const [showMapView, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  // uçuşları getirir
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  const openDetail = (id) => {
    // detaylarını göstereceğimiz uçağın id'sini alır
    setDetailId(id);
    // haritayı açar
    setShowDetail(true);
  };

  return (
    <>
      <Header />
      {/* side detail area */}
      {showDetail && (
        <SideDetail detailId={detailId} setShowDetail={setShowDetail} />
      )}

      <div className="view-buttons">
        <button
          className={showMapView ? "active" : ""}
          onClick={() => setShowMapView(true)}
        >
          Map View
        </button>
        <button
          className={!showMapView ? "active" : ""}
          onClick={() => setShowMapView(false)}
        >
          List View
        </button>
      </div>
      {/* hangi bileşenin ekrana basılacağına karar verme */}
      {showMapView ? (
        <MapView setShowDetail={setShowDetail} openDetail={openDetail} />
      ) : (
        <ListView setShowDetail={setShowDetail} openDetail={openDetail} />
      )}
    </>
  );
}

export default App;

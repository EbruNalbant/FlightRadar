import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import L from "leaflet";
import icon from "./../assets/plane-i.png";

const MapView = ({ setShowDetail, openDetail }) => {
  const store = useSelector((store) => store);

  const planeIcon = L.icon({
    iconUrl: icon,
    iconSize: [20, 20],
  });

  return (
    <div>
      {/* map */}
      <MapContainer
        center={[39.146078, 34.159499]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* her bir uçuş için ekranda uçağın konumuna denk gelen marker basma*/}
        {store?.flights.map((fly, id) => (
          <Marker key={id} position={[fly.lat, fly.lan]} icon={planeIcon}>
            <Popup>
              <div className="popup">
                <span>Code: {fly.code}</span>
                <button onClick={() => openDetail(fly.id)}>Detail</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

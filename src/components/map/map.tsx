import { useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { CardType } from '../../types/offer';
import { CityType } from '../../types/city';

type MapProps = {
  cards: CardType[];
  city: CityType;
};

function Map({ cards, city }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
      const markerLayer = layerGroup().addTo(map);

      cards.forEach((card) => {
        leaflet
          .marker({
            lat: card.city.location.latitude,
            lng: card.city.location.longitude,
          })
          .addTo(markerLayer);
      });
    }
  }, [map, city, cards]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default Map;

// const defaultCustomIcon = leaflet.icon({
//   iconUrl: URL_MARKER_DEFAULT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// const currentCustomIcon = leaflet.icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

/* eslint-disable @typescript-eslint/no-explicit-any */
import { YMaps, Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUserItemSendInfo } from "../../../store/user/userSlice";
import { setRowItemSendInfo } from "../../../store/row/rowSlice";

const CusomMap = () => {
  const dispatch = useAppDispatch();
  const rowItemSendInfo = useAppSelector((state) => state.row.rowItemSendInfo);

  const [locations, setLocations] = useState<[number, number][]>([]);
  const [rectangleCorners, setRectangleCorners] = useState<[number, number][]>(
    []
  );
  console.log("locations", rowItemSendInfo);
  const handleMapClick = (e: any) => {
    const coords = e.get("coords");

    // Add locations (only two points are needed for the rectangle)
    if (locations.length < 2) {
      setLocations((prevLocations) => [...prevLocations, coords]);
      console.log(coords);
    }
  };

  // Function to handle the removal of a selected location
  const handleLocationRemove = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1); // Remove location by index
    setLocations(newLocations); // Update locations state
  };

  useEffect(() => {
    if (locations.length === 2 && rectangleCorners?.length !== 4) {
      const [loc1, loc2] = locations;

      // Calculate the other two corners of the rectangle
      const corner3: [number, number] = [loc1[0], loc2[1]]; // Same latitude as loc1, longitude as loc2
      const corner4: [number, number] = [loc2[0], loc1[1]]; // Same latitude as loc2, longitude as loc1

      // Set rectangle corners
      setRectangleCorners([loc1, corner3, loc2, corner4, loc1]); // Include loc1 to close the rectangle
    } else {
      setRectangleCorners([]); // Clear rectangle if there are fewer than 2 locations
    }
  }, [locations]);

  return (
    <YMaps>
      <Map
        style={{ width: "100%", height: "500px" }}
        defaultState={{
          center: [55.674, 37.601],
          zoom: 11,
        }}
        onClick={handleMapClick}
      >
        {locations.map((loc, index) => (
          <Placemark
            key={`selected-${index}`}
            geometry={loc}
            properties={{
              hintContent: `Selected Location ${index + 1}`,
              balloonContent: `Selected Location ${
                index + 1
              }: [${loc[0].toFixed(5)}, ${loc[1].toFixed(5)}]`,
            }}
            options={{
              iconColor: "blue",
            }}
            onClick={(e: any) => {
              e.preventDefault(); // Prevent map click behavior
              handleLocationRemove(index);
            }}
          />
        ))}

        {/* Render Rectangle Corners */}
        {rectangleCorners.map((corner, index) => (
          <Placemark
            key={`corner-${index}`}
            geometry={corner}
            properties={{
              hintContent: `Rectangle Corner ${index + 1}`,
              balloonContent: `Rectangle Corner ${
                index + 1
              }: [${corner[0].toFixed(5)}, ${corner[1].toFixed(5)}]`,
            }}
            options={{
              iconColor: "green",
            }}
            // Prevent removal when clicking on rectangle corners
            onClick={(e: any) => {
              e.preventDefault();
              handleLocationRemove(e);
            }}
          />
        ))}

        {/* Render Rectangle Outline */}
        {rectangleCorners.length === 5 && (
          <Polyline
            geometry={rectangleCorners} // Path that connects the rectangle corners
            options={{
              strokeColor: "#0000FF",
              strokeWidth: 2,
              strokeOpacity: 0.5,
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};
export default CusomMap;

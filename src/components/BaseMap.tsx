import { useEffect } from "react";
import { initMap, destroyMap } from "@/utils/map";

const BaseMap = () => {
    useEffect(() => {
        initMap();

        return () => {
            destroyMap();
        };
    });
    return <div id="mapContainer" style={{ height: "99%", flex: 1 }}></div>;
};

export default BaseMap;

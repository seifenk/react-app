import { useEffect } from "react";
import { PdMap } from "@/utils/map";

const BaseMap = () => {
    useEffect(() => {
        let map: any = new PdMap("mapContainer");

        return () => {
            map = null;
        };
    });
    return <div id="mapContainer" style={{ height: "99%", flex: 1 }}></div>;
};

export default BaseMap;

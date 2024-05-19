import * as Cesium from "cesium";
import { useEffect } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
(window as any).CESIUM_BASE_URL = "/Cesium";
const Map = () => {
    let viewer;
    const loadMap = async () => {
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzVhZTQ3Mi0xYTk3LTRjNzQtODFiYS04ZTgyYWVmYWFkM2YiLCJpZCI6MjEwODIyLCJpYXQiOjE3MTM5Mjc3ODF9.ynUVIFFHbo2jtfYSd7VTobuBXGzU27g6G914YaAr7_I";
        viewer = new Cesium.Viewer("mapContainer", {
            timeline: false,
            animation: false,
            terrain: Cesium.Terrain.fromWorldTerrain({
                requestWaterMask: true,
            }),
        });
        viewer.scene.primitives.add(await Cesium.createOsmBuildingsAsync());
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(106.58897191286087, 29.560364659397038, 400),
        });
    };
    useEffect(() => {
        loadMap();
    });
    return <div id="mapContainer" style={{ height: "99%" }}></div>;
};

export default Map;

import path from "path";

export default {
    mode: "development",
    entry: {
        map: "./src/js/map.js",
        dropimg: "./src/js/dropimg.js",
        showMap: "./src/js/showMap.js",
        mapHome: "./src/js/mapHome.js",
        filterBy: "./src/js/filterBy.js",
        togglePublish: "./src/js/togglePublish.js",
        arrowSearch: "./src/js/arrowSearch.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
};

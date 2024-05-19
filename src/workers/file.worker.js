import CryptoJS from "crypto-js";
const createChunk = async (file, index, chunkSize) => {
    return new Promise(async (resolve, reject) => {
        const start = index * chunkSize;
        let end = start + chunkSize;
        if (end > file.size) end = file.size;
        const chunk = file.slice(start, end);
        const chunkData = {
            chunk,
            index,
            hash: CryptoJS.MD5(CryptoJS.lib.WordArray.create(await chunk.arrayBuffer())).toString(),
            start,
            end,
        };
        resolve(chunkData);
    });
};

onmessage = e => {
    const { file, chunkSize, startIndex, endIndex } = e.data;
    const proArr = [];
    for (let i = startIndex; i < endIndex; i++) {
        const pro = createChunk(file, i, chunkSize);
        proArr.push(pro);
    }
    Promise.all(proArr).then(res => {
        postMessage(res);
    });
};

import { Progress, Button } from "antd";
import { UploadOutlined, FileFilled, CloseCircleOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { postUploadChunk, postMergeChunk } from "@/api/index";
import { cutFile } from "@/utils/index";

const UploadChunk = ({ chunkSize = 1024 * 1024, threadCount = 4 }) => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState("normal");
    const [tips, setTips] = useState("等待文件...");
    const [fileInfo, setFileInfo] = useState({ name: "", size: "" });

    const inputRef = useRef<HTMLInputElement>(null);
    let file: File;
    const concurRequest = (urls: any[], maxNum: number) => {
        return new Promise((resolve, reject) => {
            if (urls.length === 0) {
                resolve([]);
                return;
            }
            let index = 0;
            const times = Math.min(urls.length, maxNum);
            const request = async () => {
                if (index === urls.length) {
                    resolve("上传成功");
                    return;
                }
                const formData = new FormData();
                formData.append("file", urls[index].chunk);
                formData.append("index", urls[index].index);
                formData.append("hash", urls[index].hash);
                formData.append("name", file.name);
                index++;
                try {
                    await postUploadChunk(formData);
                    setPercent(Math.floor(((index + 1) / urls.length) * 100));
                    setTips("第" + index + 1 + "分片上传中..." + `总共(${urls.length})`);
                    request();
                } catch (e) {
                    throw new Error("上传失败");
                }
            };
            for (let i = 0; i < times; i++) {
                request();
            }
        });
    };
    const handleChange = e => {
        file = e.target.files[0];
        setFileInfo({ name: file.name, size: Math.floor(file.size / 1024 / 1024) + "M" });
    };
    const handleUpload = async () => {
        setPercent(0);
        setTips("文件切片中...");
        const arr: any = await cutFile(file, chunkSize, threadCount);
        setTips("切片完成！");
        await concurRequest(arr, 3);
        setStatus("success");
        merge();
    };
    const merge = async () => {
        await postMergeChunk({ name: file.name });
    };
    return (
        <div className="w-fit text-[12px]">
            <input ref={inputRef} type="file" name="" id="" onChange={handleChange} style={{ display: "none" }} />
            <Button
                type="primary"
                ghost
                icon={<UploadOutlined />}
                onClick={() => {
                    inputRef.current?.click();
                }}>
                选择文件
            </Button>
            <div className="my-1 text-[#666]">{tips}</div>
            <div className="border-[#d0d0d0] border-2 border-solid flex items-center p-1">
                <div className="left mr-[12px] ">
                    <FileFilled className="text-[16px] text-[#ccc]" />
                </div>
                <div className="center">
                    <div></div>
                    <span>{fileInfo.name}</span>
                    <span>{fileInfo.size}</span>
                    <Progress percent={percent} status={status as any} />
                </div>
                <div className="right">
                    <CloseCircleOutlined className="text-[16px] text-[#ccc]" />
                </div>
            </div>

            <Button type="primary" onClick={handleUpload}>
                上传
            </Button>
        </div>
    );
};

export default UploadChunk;

"use client";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Upload as AntUpload } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";

type Props = {
  setUploadedUrls: (value: string[]) => void;
  uploadedUrls: string[];
};

function Upload({ setUploadedUrls, uploadedUrls }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <AiOutlineLoading3Quarters /> : <FiPlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const customRequest = async ({ file, onSuccess }: any) => {
    setLoading(true);
    // Create a root reference
    const imageRef = ref(storage, `product/${file.name}`);
    uploadBytes(imageRef, file).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      setUploadedUrls([...uploadedUrls, url]);
      setFileList([...fileList, file]);
      setLoading(false);
      onSuccess("ok");
    });
  };

  return (
    <AntUpload
      name="imageUrl"
      listType="picture-card"
      onChange={handleChange}
      customRequest={customRequest}
    >
      {uploadButton}
    </AntUpload>
  );
}

export default Upload;

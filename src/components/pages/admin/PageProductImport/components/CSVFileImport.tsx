import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { UseModalCredential } from "~/hooks/UseModalCredential";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const { toggle } = UseModalCredential();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (file && file.name) {
      console.log("uploadFile to", url);
      const authorizationToken = localStorage.getItem("authorization_token");

      // Get the presigned URL
      try {
        const response = await axios({
          method: "GET",
          url,
          headers: authorizationToken
            ? { Authorization: `Basic ${authorizationToken}` }
            : {},
          params: {
            name: encodeURIComponent(file.name),
          },
        });
        console.log("File to upload: ", file.name);
        console.log("Uploading to: ", response.data);
        const result = await fetch(response.data.fileUrl, {
          method: "PUT",
          body: file,
        });
        console.log("Result: ", result);
        removeFile();
      } catch (error) {
        console.log(error.request.status, "error");
        toggle(true);
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}

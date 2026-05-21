import { useState } from 'react';

import API from '../services/api';

function UploadBox() {
  const [file, setFile] =
    useState(null);

  const uploadFile =
    async () => {
      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      try {
        await API.post(
          '/upload',
          formData
        );

        alert(
          'Uploaded successfully'
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="card">
      <h3>
        Upload Documents
      </h3>

      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadBox;
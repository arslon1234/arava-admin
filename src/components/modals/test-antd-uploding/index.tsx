import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button,  Upload } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookies } from '@cookie';
import { useBannerStore } from '@store';

// Define the RcFile type
interface RcFile extends File {
  uid: string;
  readonly lastModified: number;
  readonly lastModifiedDate: Date;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  webkitRelativePath: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const App: React.FC = () => {
  const { imageUrlUpdated , imageUrl} = useBannerStore();

  const bannerUpload = async (file: File) => {
    try {
      const token = getCookies("access_token");
      const url = `${baseUrl}/services/admin/api/banner-image-upload`;

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response);
        imageUrlUpdated(response?.data?.url);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Media upload failed");
      imageUrlUpdated("")
    }
  };

  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    beforeUpload(file: RcFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob((result) => {
              if (result) {
                resolve(result as File);
              } else {
                reject(new Error('Failed to process image.'));
              }
            });
          };
        };
      });
    },
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      try {
        const processedFile = await props.beforeUpload!(file as RcFile, []);
        await bannerUpload(processedFile as File);
        onSuccess && onSuccess("Ok");
      } catch (err: any) {
        console.error(err);
        onError && onError(err);
      }
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        console.log(info.file, info.fileList);
      } else if (info.file.status === 'done') {
       imageUrl ?  toast.success(`file uploaded successfully`) : toast.error(`file upload failed.`);
      } else if (info.file.status === 'error') {
        toast.error(`file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} className='w-full px-[96px] text-[18px] py-6 border border-[#C4C4C4] rounded-[5px]'>Image upload</Button>
    </Upload>
  );
};

export default App;

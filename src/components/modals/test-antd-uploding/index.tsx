import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
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

interface PropsData {
  text?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = ({ text }: PropsData) => {
  const { imageUrlUpdated, imageUrl } = useBannerStore();

  const bannerUpload = async (file: File) => {
    try {
      const token = getCookies("access_token");
      const url = text === "brand" ? `${baseUrl}/services/admin/api/brand-image-upload` : `${baseUrl}/services/admin/api/banner-image-upload`;

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
      imageUrlUpdated("");
    }
  };

  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    beforeUpload(file: RcFile) {
      return new Promise((resolve,) => {
        resolve(file);
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
        imageUrl ? toast.success(`file uploaded successfully`) : toast.error(`file upload failed.`);
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
      <Button
        icon={<UploadOutlined />}
        className={text === "brand" ? "w-full px-[64px] text-[18px] py-[20.5px] border border-[#C4C4C4] rounded-[10px]" : "w-full px-[107px]  text-[18px] py-[20px] border border-[#C4C4C4] rounded-[10px] mb-2"}
      >
        Image upload
      </Button>
    </Upload>
  );
};

export default Index;

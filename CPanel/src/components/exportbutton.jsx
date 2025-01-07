import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const SaveAsCsvButton = ({ onClick }) => (
  <Tooltip title="บันทึกเป็น CSV">
    <Button 
      type="primary" 
      icon={<DownloadOutlined />} 
      onClick={onClick}
    >
      บันทึกเป็น CSV
    </Button>
  </Tooltip>
);

export default SaveAsCsvButton;
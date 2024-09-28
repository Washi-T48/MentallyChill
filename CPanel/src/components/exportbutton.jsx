import { ExportOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

const ExportButton = ({ onClick }) => (
  <Flex gap="small" vertical>
      <Tooltip title="export">
        <Button type="primary" shape="circle" icon={<ExportOutlined />} onClick={onClick} />
      </Tooltip>
  </Flex>
);

export default ExportButton;
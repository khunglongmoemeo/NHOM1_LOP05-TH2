import { PlusOutlined } from '@ant-design/icons';
import { ProTable, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { StorageService, KEYS } from '@/services/local-storage';
import { useState } from 'react';

const KhoiKienThucPage = () => {
  const [reload, setReload] = useState(0);

  return (
    <ProTable
      headerTitle="Khối kiến thức"
      rowKey="id"
      params={{ reload }}
      columns={[
        { title: 'ID', dataIndex: 'id', valueType: 'index' },
        { title: 'Tên khối', dataIndex: 'tenKhoi' },
      ]}
      request={async () => ({
        data: StorageService.getData(KEYS.KHOI_KIEN_THUC),
        success: true,
      })}
      toolBarRender={() => [
        <ModalForm
          title="Thêm khối kiến thức"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm</Button>}
          onFinish={async (values) => {
            const newData = { ...values, id: Date.now() }; // Tạo ID giả bằng timestamp
            StorageService.saveData(KEYS.KHOI_KIEN_THUC, newData);
            setReload(Date.now());
            return true;
          }}
        >
          <ProFormText name="tenKhoi" label="Tên khối kiến thức" />
        </ModalForm>
      ]}
    />
  );
};

export default KhoiKienThucPage;
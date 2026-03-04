import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProTable, ProColumns, ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { StorageService, KEYS } from '@/services/local-storage';
import { useState } from 'react';

const MonHocPage = () => {
  const [reload, setReload] = useState(0);

  const columns: ProColumns[] = [
    { title: 'Mã môn', dataIndex: 'maMon' },
    { title: 'Tên môn', dataIndex: 'tenMon' },
    { title: 'Số tín chỉ', dataIndex: 'soTinChi' },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm 
          title="Xóa môn này?" 
          onConfirm={() => {
            StorageService.deleteData(KEYS.MON_HOC, 'maMon', record.maMon);
            message.success('Đã xóa');
            setReload(Date.now());
          }}
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ],
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="Danh sách môn học"
        columns={columns}
        rowKey="maMon"
        params={{ reload }} // Để table load lại khi xóa/thêm
        request={async () => ({
          data: StorageService.getData(KEYS.MON_HOC),
          success: true,
        })}
        toolBarRender={() => [
          <ModalForm
            title="Thêm môn học mới"
            trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>}
            onFinish={async (values) => {
              StorageService.saveData(KEYS.MON_HOC, values);
              message.success('Lưu thành công');
              setReload(Date.now());
              return true;
            }}
          >
            <ProFormText name="maMon" label="Mã môn học" rules={[{ required: true }]} />
            <ProFormText name="tenMon" label="Tên môn học" rules={[{ required: true }]} />
            <ProFormDigit name="soTinChi" label="Số tín chỉ" rules={[{ required: true }]} />
          </ModalForm>,
        ]}
      />
    </>
  );
};

export default MonHocPage;
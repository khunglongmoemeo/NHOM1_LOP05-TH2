import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import axios from '@/utils/axios';

const { Option } = Select;

const DeThiPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const res = await axios.get('/api/de-thi');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (values: any) => {
    await axios.post('/api/de-thi', values);
    message.success('Tạo đề thi thành công');
    setVisible(false);
    fetchData();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Tạo đề thi
      </Button>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'Tên đề thi', dataIndex: 'ten' },
          { title: 'Môn học', dataIndex: 'monHoc' },
          { title: 'Cấu trúc', dataIndex: 'cauTruc' },
        ]}
      />

      <Modal
        title="Tạo đề thi"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item name="ten" label="Tên đề thi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="monHoc" label="Môn học" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="cauTruc" label="Cấu trúc">
            <Input placeholder="VD: 2 Dễ, 2 Trung bình, 1 Khó" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeThiPage;
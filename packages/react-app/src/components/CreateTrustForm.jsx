import React, { useCallback } from 'react';

import { Button, Form, Input } from 'antd';

const CreateTrustForm = () => {
  const onSubmit = useCallback(() => {}, []);

  const onSubmitFailed = useCallback(() => {}, []);

  return (
    <Form
      name="createTrust"
      onFinish={onSubmit}
      onFinishFailed={onSubmitFailed}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: 48 }}
    >
      <Form.Item label="Trust Beneficiary's Address" name="beneficiaryAddress">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="submit" htmlType="submit" />
      </Form.Item>
    </Form>
  );
};

export default CreateTrustForm;

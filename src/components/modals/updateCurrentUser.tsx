import { Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { FaPenToSquare } from "react-icons/fa6";

const UpdateCurrentUser = ({ currenrtUser }: { currenrtUser: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const router = useRouter();

  console.log(currenrtUser);
  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      name: currenrtUser.displayName,
      email: currenrtUser.email,
    });
  };

  const handleOk = (value: any) => {
    form.validateFields().then(async (valuesss) => {
      try {
        await updateProfile(currenrtUser, {
          displayName: valuesss.name,
        });
        router.refresh();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <>
      <FaPenToSquare className="cursor-pointer" onClick={showModal} />
      <Modal
        title="Hi , let's update your profile"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCurrentUser;

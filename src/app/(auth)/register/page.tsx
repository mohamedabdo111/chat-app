"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase"; // Import auth instance
import { Button, Checkbox, Form, Input, message } from "antd";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

interface FieldType {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: FieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      messageApi.open({
        type: "success",
        content: `Welcome, ${email}!`,
      });
      // router.push("/");
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: "Wrong please try again",
      });
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex  !max-w-[400px] mx-auto mt-20 p-4">
      {contextHolder}
      <section className="border-2 w-full  border-gray-300 rounded-lg p-4">
        <h2 className="text-2xl font-semibold my-2 text-center capitalize ">
          sign up{" "}
        </h2>
        <p className="text-center text-gray-600 capitalize mb-4">
          sign up to communicate with your friends
        </p>
        <Form
          name="basic"
          style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="mt-3"
        >
          <Form.Item<FieldType>
            // label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item<FieldType>
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              Submit
            </Button>
          </Form.Item>
          <p>
            {" "}
            Do you have an account <Link href="/login">Login</Link>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default RegisterForm;

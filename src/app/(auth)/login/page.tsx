"use client";

import { useState } from "react";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, database } from "@/config/firebase"; // Import auth instance
import { Button, Checkbox, Form, Input, message } from "antd";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ref, set } from "firebase/database";

interface FieldType {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      const useRef = ref(database, `users/${user?.user?.uid}`);

      const newUserProfile = {
        uuid: user?.user?.uid,
        email: user?.user?.email,
        displayName: user?.user?.displayName,
      };

      messageApi.open({
        type: "success",
        content: `Welcome, ${email}!`,
      });

      await set(useRef, newUserProfile);

      router.push("/");
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: "Invalid email or password",
      });
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const user = await signInWithPopup(auth, provider);

      const useRef = ref(database, `users/${user?.user?.uid}`);

      const newUserProfile = {
        uuid: user?.user?.uid,
        email: user?.user?.email,
        displayName: user?.user?.displayName,
      };

      await set(useRef, newUserProfile);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const FaceBookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  !max-w-[400px] mx-auto mt-20 p-4">
      {contextHolder}
      <section className="border-2 w-full  border-gray-300 rounded-lg p-4">
        <h2 className="text-2xl font-semibold my-2 text-center capitalize ">
          Sign in
        </h2>
        <p className="text-center text-gray-600 capitalize mb-4">
          sign in to communicate with your friends
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

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
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

          <div
            onClick={GoogleSignIn}
            className="border-2 border-gray-300 p-1 capitalize rounded-lg cursor-pointer flex items-center justify-center gap-2 mb-2"
          >
            <Image
              src={"/google-icon.png"}
              alt="google icon"
              width={25}
              height={25}
            />
            sign in using google
          </div>
          {/* <div
            onClick={FaceBookSignIn}
            className="border-2 border-gray-300 p-1 capitalize rounded-lg cursor-pointer flex items-center justify-center gap-2 mb-2"
          >
            <Image
              src={"/google-icon.png"}
              alt="facebook icon"
              width={25}
              height={25}
            />
            sign in using facebook
          </div> */}
          <p>
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default LoginForm;

import { database } from "@/config/firebase";
import { OneUser } from "@/interface/Interface";
import { IUserState } from "@/redux/slices/userSlice";
import { Button, Modal } from "antd";
import { onValue, ref } from "firebase/database";
import Image from "next/image";
import React, { useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const GetAllUsersModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { currentUser }: IUserState = useSelector((state: any) => state.user);
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const useRef = ref(database, "users");

    onValue(useRef, async (user) => {
      try {
        setLoading(true);
        const users = await user.val();
        if (!users) {
          return;
        }

        const allUsers = Object.keys(users).map((key) => ({
          ...users[key],
        }));

        setUsers(allUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      title={<h1 className="text-center text-2xl font-bold">Create Chat</h1>}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      {users.length &&
        users.map((oneUser: OneUser, index) => {
          if (oneUser.uuid === currentUser?.uid!) return null;
          return (
            <div key={index} className="flex justify-between items-center p-2">
              <div className="flex items-center gap-2">
                {/* <Image
                src={oneUser.photoURL || ""}
                alt="user"
                width={100}
                height={100}
                className="w-10 h-10 rounded-full"
              /> */}
                <IoPersonCircleOutline
                  color="gray"
                  className="w-10 h-10 rounded-full"
                />
                <p>{oneUser.email}</p>
              </div>
              <Button
                size="middle"
                onClick={() => {
                  console.log("Create chat with", oneUser);
                }}
              >
                Create Chat
              </Button>
            </div>
          );
        })}
    </Modal>
  );
};

export default GetAllUsersModal;

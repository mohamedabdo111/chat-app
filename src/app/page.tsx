"use client";
import { useAuth } from "@/providers/AuthProviderr";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { onValue, ref } from "firebase/database";
import { database } from "@/config/firebase";
import { User } from "firebase/auth";
import ListUser from "@/components/listUsers/listUser";
import ChatArea from "@/components/chat/chatArea";

const HomePage = () => {
  const { user } = useAuth();
  const [AllUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    if (user) {
      const useRef = ref(database, `users`);

      onValue(useRef, (snapshot) => {
        const currentUsers = snapshot.val();

        if (!currentUsers) {
          return;
        }
        const AllUsers = Object.keys(currentUsers).map((key) => ({
          id: key,
          ...currentUsers[key],
        }));

        setAllUsers(AllUsers);
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  return (
    <section className="flex  h-full">
      <div className="w-1/4 border-r-2 border-gray-300 p-3">
        <ListUser />
      </div>
      <div>
        <ChatArea />
      </div>
      {/* <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      {AllUsers.length &&
        AllUsers.map((oneUser: any) => {
          if (oneUser.id === user?.uid) return null;
          return (
            <div key={oneUser.id}>
              <p>{oneUser.email}</p>
            </div>
          );
        })} */}
    </section>
  );
};

export default HomePage;

// tomorrow i will integrate the cdn to upload images
// i will impelement the redux toolkit and continue to working on update user profile like image , emai , password

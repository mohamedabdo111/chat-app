"use client";
import { useAuth } from "@/providers/AuthProviderr";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { onValue, ref } from "firebase/database";
import { database } from "@/config/firebase";

const HomePage = () => {
  const { user, loading } = useAuth();
  const [AllUsers, setAllUsers] = useState<any>([]);
  console.log(AllUsers);

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
  }, [user]);

  useEffect(() => {
    if (!user?.accessToken) {
      redirect("/login");
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      {AllUsers.length &&
        AllUsers.map((oneUser: any) => {
          if (oneUser.id === user?.uid) return null;
          return (
            <div key={oneUser.id}>
              <p>{oneUser.email}</p>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;

// tomorrow i will integrate the cdn to upload images
// i will impelement the redux toolkit and continue to working on update user profile like image , emai , password

"use client";
import { Avatar, Button, Divider, Drawer, message } from "antd";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import UpdateCurrentUser from "./modals/updateCurrentUser";

const Navbar = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {path !== "/login" && path !== "/register" && (
        <header className="flex justify-between items-center p-4 bg-gray-200 border-b-4 border-gray-300">
          <div className="text-2xl font-bold">
            <Link href="/">MyApp</Link>
          </div>
          <Avatar
            size="large"
            className="cursor-pointer"
            src={currentUser && currentUser?.photoURL}
            onClick={showDrawer}
          ></Avatar>
          <Drawer
            title="User Profile"
            placement="right"
            closable={true}
            onClose={onClose}
            open={open}
          >
            <div className="flex flex-col items-center">
              {currentUser && (
                <div className="flex flex-col items-center gap-5">
                  <Avatar
                    size={64}
                    src={currentUser && currentUser?.photoURL}
                    className="mb-4"
                  />
                  <div className="flex gap-2 items-center">
                    <h2 className="text-xl font-semibold">
                      {currentUser.displayName}
                    </h2>
                    <UpdateCurrentUser
                      currenrtUser={currentUser}
                    ></UpdateCurrentUser>
                  </div>

                  <p className="text-gray-500">{currentUser.email}</p>

                  <Divider className="w-full my-4" />
                  <Button
                    // type="primary"
                    // danger
                    onClick={async () => {
                      try {
                        await auth.signOut();
                        onClose();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </Drawer>
        </header>
      )}
    </>
  );
};

export default Navbar;

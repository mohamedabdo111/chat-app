import GetAllUsersModal from "@/components/modals/GetAllUsersModal";
import { Dropdown } from "antd";
import React from "react";

const HeaderList = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const items = [
    {
      label: "Add User",
      key: "addUser",
      onClick: () => {
        setIsModalOpen(true);
      },
    },
    {
      label: "Edit User",
      key: "editUser",
      onClick: () => {
        console.log("Edit User clicked");
      },
    },
  ];

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">List of Users</h1>

      <div>
        <Dropdown.Button size="middle" menu={{ items }}>
          Create Chat
        </Dropdown.Button>
      </div>
      {isModalOpen && (
        <GetAllUsersModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default HeaderList;

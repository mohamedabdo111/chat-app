import React from "react";
import HeaderList from "./componentList/headerList";
import SearchOfUser from "./componentList/searchOfUser";

const ListUser = () => {
  console.log("test");
  return (
    <div className="flex flex-col gap-5 ">
      <HeaderList />
      <SearchOfUser />
    </div>
  );
};

export default ListUser;

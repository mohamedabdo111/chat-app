import { Input } from "antd";
import React from "react";

const SearchOfUser = () => {
  return (
    <Input
      type="text"
      placeholder="Search for a user"
      className="w-full"
      size="large"
      allowClear
    />
  );
};

export default SearchOfUser;

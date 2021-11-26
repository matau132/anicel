import React, { memo } from "react";
import { Select } from "antd";
import "./DropDownSearch.css";

const { Option } = Select;

function DropDownSearch({ placeholder, dropDownData, onChange }) {
  return (
    <Select
      showSearch
      className="search-dropdown"
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => {
        const child = option.children + "";
        return child.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      size="large"
      onChange={onChange}
    >
      {dropDownData &&
        dropDownData.map((data) => (
          <Option value={data} key={data}>
            {data}
          </Option>
        ))}
    </Select>
  );
}

export default memo(DropDownSearch);

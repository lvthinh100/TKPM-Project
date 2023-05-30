import React from "react";
import { useState } from "react";

// React - Hook
// Bản chất là hàm
// Render động tên của Button
export default function MyButton(props) {
  const [count, setCount] = useState(1);
  //   setCount là hàm thay đổi state và cập nhật UI
  return (
    <button
      onClick={() => {
        const newCount = count + 1;
        setCount(newCount);
      }}
    >
      {props.children}
      {`Count: ${count}`}
    </button>
  );
}

import React from "react";

import MyButton from "../components/MyButton";
import Square from "../components/Square";
// UI Component
// Children
export default function UserInfoPage() {
  return (
    <div>
      <h1>This is User Info Page</h1>
      <p>This is a paragraph</p>
      <MyButton id={12} myName={"USER123"}>
        adasdfasdf
      </MyButton>
      <MyButton>
        <Square size={50} color={"red"} />
        Button 2
        <Square size={50} color={"red"} />
      </MyButton>
      <Square size={500} color="blue" />
    </div>
  );
}

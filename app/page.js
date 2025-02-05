'use client';

import VerifyEmail from "./components/VerifyEmail";
import RegisterUser from "./components/RegisterUser";

export default function Home() {
  return (
    <>
      <div>
        <h1>Ojala funcione</h1>
        <VerifyEmail />
      </div>
      <div>
        <RegisterUser />
      </div>
    </>
  );
}

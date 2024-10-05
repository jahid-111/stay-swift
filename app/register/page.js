import RegistrationForm from "@/components/auth/RegistrationForm";
import SocialLogins from "@/components/auth/SocialLogins";
import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <section className="h-screen grid place-items-center">
        <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
          <h4 className="font-bold text-2xl">Sign in</h4>

          <RegistrationForm />
          <SocialLogins />
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;

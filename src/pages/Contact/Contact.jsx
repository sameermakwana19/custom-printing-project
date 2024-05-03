import React, { useEffect, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import DividerLine from "../../components/ui/DividerLine/DividerLine";
import IconList from "../../components/IconList/IconList";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { useForm } from "react-hook-form";
import { registerQuery } from "../../queries/contact";
import { set } from "firebase/database";

const Contact = () => {
  const { register, handleSubmit, formState } = useForm();
  const [toast, setToast] = useState(null);

  const { errors, isSubmitting, isValid } = formState;

  const onSubmitHandler = async (data) => {
    const res = await registerQuery(data);
    const { error, data: resData } = res;

    if (error) {
      console.log("error", error);
      setToast(error);
    } else {
      setToast("Query submitted successfully");
      console.log("data", resData);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [toast]);

  return (
    <>
      {toast && <p className="toast">{toast}</p>}
      <Backdrop />
      <div className="contact">
        <div className="contact__left">
          <Heading>say hello.</Heading>
          <p className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            necessitatibus iure laboriosam beatae porro tempore exercitationem?
            Saepe soluta nam ab?
          </p>
          <DividerLine />
          <div className="contact-info">
            <IconList
              icon={<i className="fa-solid fa-map"></i>}
              label="212 7th St SE, Washington, DC 20003, USA"
            />
            <IconList
              icon={<i className="fa-solid fa-envelope"></i>}
              label="info@example.com"
            />
            <IconList
              icon={<i className="fa-solid fa-phone"></i>}
              label="123-456-7890/91"
            />
          </div>
        </div>
        <div className="contact__right">
          <Heading>Ask your queires</Heading>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Input
              type="text"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="error">{errors.email?.message}</p>
            <Input
              type="text"
              placeholder="Subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject should be atleast 5 characters",
                },
              })}
            />
            <p className="error">{errors.subject?.message}</p>
            <Input
              type="textarea"
              placeholder="Message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message should be atleast 10 characters",
                },
              })}
            />
            <p className="error">{errors.message?.message}</p>
            <Button disabled={!isValid || isSubmitting} isIconPresent={false}>
              send message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

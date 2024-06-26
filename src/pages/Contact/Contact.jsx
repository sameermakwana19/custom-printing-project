import { useEffect, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import DividerLine from "../../components/ui/DividerLine/DividerLine";
import IconList from "../../components/IconList/IconList";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { useForm } from "react-hook-form";
import { getQueries, registerQuery } from "../../queries/contact";
import { useUserContext } from "../../context/User/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WAIT_DURATION = 20;

const Contact = () => {
  const { user } = useUserContext();
  const [waitTime, setWaitTime] = useState(null);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: user?.email,
    },
    mode: "onChange",
  });
  const [toast, setToast] = useState(null);

  const { errors, isSubmitting, isValid } = formState;
  const queryClient = useQueryClient();

  const {
    data: lastQueryTime,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["queries", user?.uid],
    queryFn: () => getQueries(user?.uid),
  });

  const onSubmitHandler = async (data) => {
    const res = await registerQuery({ ...data, uid: user?.uid });
    queryClient.invalidateQueries(["queries", user.uid]);
    const { error } = res;

    if (error) {
      setToast(error);
    } else {
      setToast("Query submitted successfully");
      reset();
    }
  };

  useEffect(() => {
    if (lastQueryTime) {
      const diff = Math.floor((Date.now() / 1000 - lastQueryTime) / 60);
      if (diff <= 20) {
        setWaitTime(WAIT_DURATION - diff);
      }
    }
  }, [lastQueryTime]);

  useEffect(() => {
    if (waitTime) {
      const id = setTimeout(() => {
        setWaitTime((prev) => prev - 1);
      }, 1000 * 60);

      return () => {
        clearTimeout(id);
      };
    }
  }, [waitTime]);

  useEffect(() => {
    const id = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [toast]);

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {toast && <p className="toast">{toast}</p>}
      {waitTime && (
        <p className="wait-time-text">
          You can send another query after {waitTime} minutes .
        </p>
      )}
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
              disabled={user}
              placeholder="Your Email"
              {...register("email")}
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
            <Button
              disabled={
                !isValid || isSubmitting || !user || isLoading || waitTime
              }
              toolTip={!user ? "Login to send message" : ""}
              isIconPresent={false}
            >
              send message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

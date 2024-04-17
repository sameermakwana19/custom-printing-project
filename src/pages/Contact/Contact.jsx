import React from "react";
import Heading from "../../components/ui/Heading/Heading";
import DividerLine from "../../components/ui/DividerLine/DividerLine";
import IconList from "../../components/IconList/IconList";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

const Contact = () => {
  return (
    <>
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

          <Input type="text" placeholder="Your Email" />
          <Input type="text" placeholder="Subject" />
          <Input type="textarea" placeholder="Message" />
          <Button isIconPresent={false}>send message</Button>
        </div>
      </div>
    </>
  );
};

export default Contact;

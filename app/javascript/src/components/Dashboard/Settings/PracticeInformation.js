import React, { useRef } from "react";
import { isMobileOnly } from "react-device-detect";
import { Input, ActionBlock } from "@bigbinary/neetoui/formik";
import { Label, Avatar, Button } from "@bigbinary/neetoui";
import { Form, Formik } from "formik";

const PracticeInformation = () => {
  const profileImageRef = useRef(null);

  const initialValues = {
    office_name: "Acme Health Clinic",
    shareable_url: "acme-health-clinic",
    email: "admin@acmehealth.com",
    profile_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=5DjPIwWBjo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const { office_name, profile_image } = initialValues;

  return (
    <div className="w-full">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <Form>
          <div className="max-w-xl space-y-6">
            <div className="w-full">
              <div className="max-w-md">
                <Input
                  name="office_name"
                  label="Office Name"
                  placeholder="Acme Health Clinic"
                />
              </div>
              <p className="nui-input__help-text">
                The office name will be shown in the booking page and in all
                emails sent from the platform.
              </p>
            </div>
            <div className="w-full">
              <div className="flex flex-row items-center justify-start">
                <div className="flex-grow max-w-md">
                  <div className="flex flex-row items-center justify-between mb-2">
                    <Label>Shareable Room Link</Label>
                    {isMobileOnly && <Button style="link" label="Share Link" />}
                  </div>
                  <Input
                    type="url"
                    prefix="podme.io/"
                    name="shareable_url"
                    placeholder="acme-health-clinic"
                    inputWrapperClassName="nui-input--block-add-on"
                    suffix={<Button style="icon" icon="ri-file-copy-line" />}
                  />
                </div>
                {!isMobileOnly && (
                  <Button
                    style="link"
                    label="Share Link"
                    className="mt-6 ml-6"
                  />
                )}
              </div>
              <p className="nui-input__help-text">
                You have complete control over who may enter and stay present in
                your room at all times. However, anyone that has your room link
                can request to enter your room, which may be an unwanted
                nuisance or distraction. Keep your room link private between
                yourself and your clients - we recommend that you don’t post it
                in public places such as your practice website or social media
                profiles.
              </p>
            </div>
            <div className="max-w-md">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="admin@acmehealth.com"
              />
            </div>
            <div className="w-full">
              <Label className="mb-2">Profile Image</Label>
              <div className="flex flex-row items-center justify-start">
                <Avatar
                  size={64}
                  contact={{
                    name: office_name,
                    profile_image_path: profile_image,
                  }}
                />
                <div className="ml-6 nui-file-upload">
                  <label
                    htmlFor="logo"
                    className="m-0 mr-2 nui-btn nui-btn--secondary"
                  >
                    {profile_image ? "Change Image" : "Upload Image"}
                  </label>
                  <input
                    name="profile_image"
                    type="file"
                    accept="image/*"
                    id="logo"
                    ref={profileImageRef}
                  />
                </div>
              </div>
              <p className="nui-input__help-text">
                The profile icon will be shown to your clients in the booking
                page.
              </p>
            </div>
          </div>
          <div className="py-5 mt-8 border-t border-gray-200">
            <ActionBlock
              className="flex-row-reverse"
              submitButtonProps={{
                icon: "ri-checkbox-circle-fill",
              }}
              cancelButtonProps={{
                className: "ml-3",
              }}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PracticeInformation;

import React, { useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { Input, ActionBlock } from "@bigbinary/neetoui/formik";
import { Label, Button } from "@bigbinary/neetoui";
import { Form, Formik } from "formik";
import { useUserDispatch, useUserState } from "contexts/user";
import { CopyToClipboard } from "react-copy-to-clipboard";
import userApi from "apis/user";
import Logger from "js-logger";

const PracticeInformation = () => {
  const { user } = useUserState();
  // const [profileImageURL, setProfileImageURL] = useState("");
  // const [selectedImage, setSelectedImage] = useState("");
  const [officeName, setOfficeName] = useState(user.office_name);
  const [email, setEmail] = useState(user.email);
  const [roomName, setRoomName] = useState(user.room_name);
  const userDispatch = useUserDispatch();

  // const profileImageRef = useRef(null);
  const domain = "app.podme.io/";
  const body =
    "Please find below a link to your video call session with your practitioner:%0d%0a";
  const initialValues = {
    office_name: "Acme Health Clinic",
    shareable_url: "acme-health-clinic",
    email: "admin@acmehealth.com",
    profile_image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=5DjPIwWBjo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  // const { office_name, profile_image } = initialValues;

  const handleShareLink = () => {
    window.open(
      `mailto:"?subject=Session Link&body=${body + domain + user.room_name}`
    );
  };

  // const onImageChange = e => {
  //   setProfileImageURL(URL.createObjectURL(e.target.files[0]));
  //   setSelectedImage(e.target.files[0]);
  // };

  // const onFileUpload = () => {
  //   const formData = new FormData();
  //   formData.append("myFile", selectedImage, selectedImage.name);
  // };

  const handleSubmit = async () => {
    try {
      const response = await userApi.update(user.id, {
        office_name: officeName,
        email: email,
        room_name: roomName,
      });
      userDispatch({
        type: "UPDATE_USER",
        payload: { user: response.data.user },
      });
    } catch (err) {
      Logger.error(err);
    }
  };

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
                  value={officeName}
                  onChange={e => setOfficeName(e.target.value)}
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
                    {isMobileOnly && (
                      <Button
                        style="link"
                        label="Share Link"
                        onClick={handleShareLink}
                      />
                    )}
                  </div>
                  <Input
                    type="url"
                    prefix="app.podme.io/"
                    name="shareable_url"
                    placeholder="acme-health-clinic"
                    inputWrapperClassName="nui-input--block-add-on"
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                    suffix={
                      <CopyToClipboard text={`app.podme.io/${user.room_name}`}>
                        <Button style="icon" icon="ri-file-copy-line" />
                      </CopyToClipboard>
                    }
                  />
                </div>
                {!isMobileOnly && (
                  <Button
                    style="link"
                    label="Share Link"
                    className="mt-6 ml-6"
                    onClick={handleShareLink}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {/* <div className="w-full">
              <Label className="mb-2">Profile Image</Label>
              <div className="flex flex-row items-center justify-start">
                <Avatar
                  size={64}
                  contact={{
                    name: office_name,
                    profile_image_path: profileImageURL || profile_image,
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
                    multiple={false}
                    onChange={onImageChange}
                  />
                </div>
              </div>
              <p className="nui-input__help-text">
                The profile icon will be shown to your clients in the booking
                page.
              </p>
            </div> */}
          </div>
          <div className="py-5 mt-8 border-t border-gray-200">
            <ActionBlock
              className="flex-row-reverse"
              submitButtonProps={{
                icon: "ri-checkbox-circle-fill",
                onClick: handleSubmit,
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

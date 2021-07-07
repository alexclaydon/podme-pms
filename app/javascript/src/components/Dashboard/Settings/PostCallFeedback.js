import React from "react";
// import { Switch, Input, Collapse, Button } from "@bigbinary/neetoui";
import { NotFunctionalText } from "components/Common/NotFunctionalText";

const PostCallFeedback = () => {
  // const [feedbackEnabled, setFeedbackEnabled] = useState(false);
  return (
    <div className="w-full">
      <NotFunctionalText />
      {/* <div className="relative flex flex-row items-center justify-start">
        <div className="flex-grow">
          <h4 className="pr-12 mb-1 text-base font-medium text-gray-800 sm:pr-0">
            Enable post-call feedback with Typeform
          </h4>
          <p className="text-sm leading-relaxed text-gray-600">
            You can embed a Typeform that can be shown to your clients, once the
            call is done.
          </p>
        </div>
        <Switch
          name="enable_feedback"
          checked={feedbackEnabled}
          onChange={e => setFeedbackEnabled(e.target.checked)}
          className="absolute right-0 top-3 sm:static"
        />
      </div>
      <Collapse open={feedbackEnabled}>
        <div className="max-w-md mt-6">
          <Input
            label="Typeform embed URL"
            placeholder="https://typeform.com/embed/xyz123"
          />
        </div>
      </Collapse>
      <div className="flex flex-row items-center justify-start py-5 mt-8 space-x-3 border-t border-gray-200">
        <Button label="Save changes" icon="ri-checkbox-circle-fill" />
        <Button style="secondary" label="Cancel" />
      </div> */}
    </div>
  );
};

export default PostCallFeedback;

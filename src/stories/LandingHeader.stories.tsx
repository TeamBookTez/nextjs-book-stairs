import { Meta, Story } from "@storybook/react";

import LandingHeader from "./LandingHeader";

// 스토리북의 폴더
export default {
  title: "Landing/header",
  component: LandingHeader,
} as Meta;

//-----------------------

// Story Template 정의
const Template: Story = () => {
  return <LandingHeader />;
};

// Story1 정의
export const MyComponentStory1 = Template.bind({});
// MyComponentStory1.args = {
//   name: "",
//   phoneNumber: "",
//   distance: "",
//   address: "",
// };

// MyComponentStory1.decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>];

// MyComponentStory1.parameters = {
//   backgrounds: {
//     values: [
//       { name: "lightBlue", value: "lightBlue" },
//       { name: "gray", value: "#eeeeee" },
//     ],
//   },
// };

// MyComponentStory1.storyName = "Custom";

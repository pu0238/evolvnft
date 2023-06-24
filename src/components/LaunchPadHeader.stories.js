import LaunchPadHeader from './LaunchPadHeader.vue';

export default {
  component: LaunchPadHeader,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LaunchPadHeader',
};

const Template = (args) => ({
  components: { LaunchPadHeader },
  template: '<LaunchPadHeader />',
});
export const Default = Template.bind({});
import LaunchpadHeader from './LaunchpadHeader.vue';

export default {
  component: LaunchpadHeader,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LaunchpadHeader',
};

const Template = (args) => ({
  components: { LaunchpadHeader },
  template: '<LaunchpadHeader />',
});
export const Default = Template.bind({});
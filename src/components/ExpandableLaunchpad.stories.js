import ExpandableLaunchpad from './ExpandableLaunchpad.vue';

export default {
  component: ExpandableLaunchpad,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ExpandableLaunchpad',
};

const Template = (args) => ({
  components: { ExpandableLaunchpad },
  template: '<ExpandableLaunchpad />',
});
export const Default = Template.bind({});

import LaunchpadLiveMinting from './LaunchpadLiveMinting.vue';

export default {
  component: LaunchpadLiveMinting,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LaunchpadLiveMinting',
};

const Template = (args) => ({
  components: { LaunchpadLiveMinting },
  template: '<LaunchpadLiveMinting />',
});
export const Default = Template.bind({});
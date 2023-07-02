import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';

export default {
  component: LaunchpadCollectionLogo,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LaunchpadCollectionLogo',
};

const Template = (args) => ({
  components: { LaunchpadCollectionLogo },
  template: '<LaunchpadCollectionLogo />',
});
export const Default = Template.bind({});

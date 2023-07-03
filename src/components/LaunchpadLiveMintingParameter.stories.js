import UpcomingMintBoxParameter from './UpcomingMintBoxParameter.vue';

export default {
  component: UpcomingMintBoxParameter,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'UpcomingMintBoxParameter',
};

const Template = (args) => ({
  components: { UpcomingMintBoxParameter },
  template: '<UpcomingMintBoxParameter />',
});
export const Default = Template.bind({});

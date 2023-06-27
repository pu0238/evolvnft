import UpcomingMints from './UpcomingMints.vue';

export default {
  component: UpcomingMints,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'UpcomingMints',
};

const Template = (args) => ({
  components: { UpcomingMints },
  template: '<UpcomingMints />',
});
export const Default = Template.bind({});
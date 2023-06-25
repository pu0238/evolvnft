import UpcomingMints2 from './UpcomingMints2.vue';

export default {
  component: UpcomingMints2,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'UpcomingMints2',
};

const Template = (args) => ({
  components: { UpcomingMints2 },
  template: '<UpcomingMints2 />',
});
export const Default = Template.bind({});
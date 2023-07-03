import LaunchpadSingleCollection from './LaunchpadSingleCollection.vue';

export default {
  component: LaunchpadSingleCollection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LaunchpadSingleCollection',
};

const Template = (args) => ({
  components: { LaunchpadSingleCollection },
  template: '<LaunchpadSingleCollection />',
});
export const Default = Template.bind({});

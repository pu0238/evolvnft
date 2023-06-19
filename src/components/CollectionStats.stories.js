import CollectionStats from './CollectionStats.vue';

export default {
  component: CollectionStats,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionStats'
};

const Template = args => ({
  components: { CollectionStats },
  template: '<CollectionStats />',
});
export const Default = Template.bind({});
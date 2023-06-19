import CollectionsList from './CollectionsList.vue';

export default {
  component: CollectionsList,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionsList',
};

const Template = (args) => ({
  components: { CollectionsList },
  template: '<CollectionsList />',
});
export const Default = Template.bind({});

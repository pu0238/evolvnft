import CollectionTokens from './CollectionTokens.vue';

export default {
  component: CollectionTokens,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionTokens'
};

const Template = args => ({
  components: { CollectionTokens },
  template: '<CollectionTokens />',
});
export const Default = Template.bind({});
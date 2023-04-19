import CollectionBaner from './CollectionBaner.vue';

export default {
  component: CollectionBaner,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionBaner'
};

const Template = args => ({
  components: { CollectionBaner },
  template: '<CollectionBaner />',
});
export const Default = Template.bind({});
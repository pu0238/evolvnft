import CollectionBuilder from './CollectionBuilder.vue';

export default {
  component: CollectionBuilder,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionBuilder',
};

const Template = (args) => ({
  components: { CollectionBuilder },
  template: '<CollectionBuilder />',
});
export const Default = Template.bind({});

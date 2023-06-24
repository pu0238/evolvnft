import CollectionItem from './CollectionItem.vue';

export default {
  component: CollectionItem,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionItem',
};

const Template = (args) => ({
  components: { CollectionItem },
  template: '<CollectionItem />',
});
export const Default = Template.bind({});

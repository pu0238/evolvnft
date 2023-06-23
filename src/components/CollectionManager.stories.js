import CollectionManager from './CollectionManager.vue';

export default {
  component: CollectionManager,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionManager',
};

const Template = (args) => ({
  components: { CollectionManager },
  template: '<CollectionManager />',
});
export const Default = Template.bind({});

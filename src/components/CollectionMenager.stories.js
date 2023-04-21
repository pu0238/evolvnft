import CollectionMenager from './CollectionMenager.vue';

export default {
  component: CollectionMenager,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionMenager'
};

const Template = args => ({
  components: { CollectionMenager },
  template: '<CollectionMenager />',
});
export const Default = Template.bind({});
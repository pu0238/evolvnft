import CollectionSection from './CollectionSection.vue';

export default {
  component: CollectionSection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CollectionSection'
};

const Template = args => ({
  components: { CollectionSection },
  template: '<CollectionSection />',
});
export const Default = Template.bind({});
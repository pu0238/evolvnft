import CreationSection from './CreationSection.vue';

export default {
  component: CreationSection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'CreationSection',
};

const Template = (args) => ({
  components: { CreationSection },
  template: '<CreationSection />',
});
export const Default = Template.bind({});

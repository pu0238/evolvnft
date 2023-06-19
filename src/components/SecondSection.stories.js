import SecondSection from './SecondSection.vue';

export default {
  component: SecondSection,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SecondSection',
};

const Template = (args) => ({
  components: { SecondSection },
  template: '<SecondSection />',
});
export const Default = Template.bind({});

import SecondSectionLeft from './SecondSectionLeft.vue';

export default {
  component: SecondSectionLeft,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SecondSectionLeft',
};

const Template = (args) => ({
  components: { SecondSectionLeft },
  template: '<SecondSectionLeft />',
});
export const Default = Template.bind({});

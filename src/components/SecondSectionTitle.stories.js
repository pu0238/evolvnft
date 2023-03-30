import SecondSectionTitle from './SecondSectionTitle.vue';

export default {
  component: SecondSectionTitle,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SecondSectionTitle'
};

const Template = args => ({
  components: { SecondSectionTitle },
  template: '<SecondSectionTitle />',
});
export const Default = Template.bind({});
import ThirdSectionTitle from './ThirdSectionTitle.vue';

export default {
  component: ThirdSectionTitle,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ThirdSectionTitle',
};

const Template = (args) => ({
  components: { ThirdSectionTitle },
  template: '<ThirdSectionTitle />',
});
export const Default = Template.bind({});

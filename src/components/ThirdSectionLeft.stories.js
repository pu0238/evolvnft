import ThirdSectionLeft from './ThirdSectionLeft.vue';

export default {
  component: ThirdSectionLeft,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ThirdSectionLeft',
};

const Template = (args) => ({
  components: { ThirdSectionLeft },
  template: '<ThirdSectionLeft />',
});
export const Default = Template.bind({});

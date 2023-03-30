import HeaderLeft from './HeaderLeft.vue';

export default {
  component: HeaderLeft,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'HeaderLeft'
};

const Template = args => ({
  components: { HeaderLeft },
  template: '<HeaderLeft />',
});
export const Default = Template.bind({});
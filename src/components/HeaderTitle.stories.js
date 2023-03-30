import HeaderTitle from './HeaderTitle.vue';

export default {
  component: HeaderTitle,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'HeaderTitle'
};

const Template = args => ({
  components: { HeaderTitle },
  template: '<HeaderTitle />',
});
export const Default = Template.bind({});
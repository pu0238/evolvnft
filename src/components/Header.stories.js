import Header from './Header.vue';

export default {
  component: Header,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Header'
};

const Template = args => ({
  components: { Header },
  template: '<Header />',
});
export const Default = Template.bind({});
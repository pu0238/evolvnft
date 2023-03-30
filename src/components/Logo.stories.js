import Logo from './Logo.vue';

export default {
  component: Logo,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Logo'
};

const Template = args => ({
  components: { Logo },
  template: '<Logo />',
});
export const Default = Template.bind({});
import NavBar from './NavBar.vue';

export default {
  component: NavBar,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'NavBar',
};

const Template = (args) => ({
  components: { NavBar },
  template: '<NavBar />',
});
export const Default = Template.bind({});

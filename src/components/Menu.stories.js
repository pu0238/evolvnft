import Menu from './Menu.vue';

export default {
  component: Menu,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Menu',
};

const Template = (args) => ({
  components: { Menu },
  template: '<Menu />',
});
export const Default = Template.bind({});

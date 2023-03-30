import NavItem from './NavItem.vue';

export default {
  component: NavItem,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'NavItem'
};

const Template = args => ({
  components: { NavItem },
  template: '<NavItem />',
});
export const Default = Template.bind({});
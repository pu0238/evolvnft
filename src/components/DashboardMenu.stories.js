import DashboardManu from './DashboardMenu.vue';

export default {
  component: DashboardManu,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'DashboardManu',
};

const Template = (args) => ({
  components: { DashboardManu },
  template: '<DashboardManu />',
});
export const Default = Template.bind({});

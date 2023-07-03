import BlackExpandable from './BlackExpandable.vue';

export default {
  component: BlackExpandable,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'BlackExpandable',
};

const Template = (args) => ({
  components: { BlackExpandable },
  template: '<BlackExpandable />',
});
export const Default = Template.bind({});

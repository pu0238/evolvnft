import Actions from './Actions.vue';

export default {
  component: Actions,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Actions'
};

const Template = args => ({
  components: { Actions },
  template: '<Actions />',
});
export const Default = Template.bind({});
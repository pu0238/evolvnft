import ErrorMessage from './ErrorMessage.vue';

export default {
  component: ErrorMessage,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ErrorMessage',
};

const Template = (args) => ({
  components: { ErrorMessage },
  template: '<ErrorMessage />',
});
export const Default = Template.bind({});

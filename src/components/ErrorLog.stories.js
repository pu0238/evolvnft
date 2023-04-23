import ErrorLog from './ErrorLog.vue';

export default {
  component: ErrorLog,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'ErrorLog'
};

const Template = args => ({
  components: { ErrorLog },
  template: '<ErrorLog />',
});
export const Default = Template.bind({});
import InfoMessage from './InfoMessage.vue';

export default {
  component: InfoMessage,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'InfoMessage',
};

const Template = (args) => ({
  components: { InfoMessage },
  template: '<InfoMessage />',
});
export const Default = Template.bind({});

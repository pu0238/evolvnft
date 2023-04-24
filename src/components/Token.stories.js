import Token from './Token.vue';

export default {
  component: Token,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Token'
};

const Template = args => ({
  components: { Token },
  template: '<Token />',
});
export const Default = Template.bind({});
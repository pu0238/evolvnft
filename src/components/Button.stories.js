import Button from './Button.vue';

export default {
  component: Button,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Button',
};

const Template = (args) => ({
  components: { Button },
  template: '<Button />',
});
export const Default = Template.bind({});

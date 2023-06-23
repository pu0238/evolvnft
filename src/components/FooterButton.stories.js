import FooterButton from './FooterButton.vue';

export default {
  component: FooterButton,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'FooterButton',
};

const Template = (args) => ({
  components: { FooterButton },
  template: '<FooterButton />',
});
export const Default = Template.bind({});

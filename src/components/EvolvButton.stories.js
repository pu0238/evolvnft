import EvolvButton from './EvolvButton.vue';

export default {
  component: EvolvButton,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'EvolvButton',
};

const Template = (args) => ({
  components: { EvolvButton },
  template: '<EvolvButton />',
});
export const Default = Template.bind({});

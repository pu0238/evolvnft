import LockButton from './LockButton.vue';

export default {
  component: LockButton,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LockButton'
};

const Template = args => ({
  components: { LockButton },
  template: '<LockButton />',
});
export const Default = Template.bind({});
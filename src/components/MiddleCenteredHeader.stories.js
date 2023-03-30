import MiddleCenteredHeader from './MiddleCenteredHeader.vue';

export default {
  component: MiddleCenteredHeader,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'MiddleCenteredHeader'
};

const Template = args => ({
  components: { MiddleCenteredHeader },
  template: '<MiddleCenteredHeader />',
});
export const Default = Template.bind({});
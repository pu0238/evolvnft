import LoadingAnimation from './LoadingAnimation.vue';

export default {
  component: LoadingAnimation,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'LoadingAnimation',
};

const Template = (args) => ({
  components: { LoadingAnimation },
  template: '<LoadingAnimation />',
});
export const Default = Template.bind({});

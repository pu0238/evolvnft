import Footer from './Footer.vue';

export default {
  component: Footer,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Footer'
};

const Template = args => ({
  components: { Footer },
  template: '<Footer />',
});
export const Default = Template.bind({});
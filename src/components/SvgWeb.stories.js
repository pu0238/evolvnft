import SvgWeb from './SvgWeb.vue';

export default {
  component: SvgWeb,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SvgWeb',
};

const Template = (args) => ({
  components: { SvgWeb },
  template: '<SvgWeb />',
});
export const Default = Template.bind({});

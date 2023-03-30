import SvgTwitter from './SvgTwitter.vue';

export default {
  component: SvgTwitter,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SvgTwitter'
};

const Template = args => ({
  components: { SvgTwitter },
  template: '<SvgTwitter />',
});
export const Default = Template.bind({});
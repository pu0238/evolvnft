import SvgDiscord from './SvgDiscord.vue';

export default {
  component: SvgDiscord,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SvgDiscord'
};

const Template = args => ({
  components: { SvgDiscord },
  template: '<SvgDiscord />',
});
export const Default = Template.bind({});
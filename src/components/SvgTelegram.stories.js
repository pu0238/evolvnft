import SvgTelegram from './SvgTelegram.vue';

export default {
  component: SvgTelegram,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'SvgTelegram',
};

const Template = (args) => ({
  components: { SvgTelegram },
  template: '<SvgTelegram />',
});
export const Default = Template.bind({});

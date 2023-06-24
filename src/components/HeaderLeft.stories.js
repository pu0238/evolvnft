import HeaderSubtitle from './HeaderSubtitle.vue';

export default {
  component: HeaderSubtitle,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'HeaderSubtitle',
};

const Template = (args) => ({
  components: { HeaderSubtitle },
  template: '<HeaderSubtitle />',
});
export const Default = Template.bind({});

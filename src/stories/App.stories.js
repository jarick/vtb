import App from '../App';

const story = {
  title: 'Example/App',
  component: App,
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  items: [
    {title: 'Каталог товаров и услуг', url: '/catalog'},
    {title: 'Бытовая техника', url: '/catalog/onlineproduct1'},
    {title: 'Телевизоры', url: '/catalog/onlineproduct1/telly'},
    {title: 'Плоские', url: '/catalog/onlineproduct1/telly/flat'},
  ],
  location: '/catalog/onlineproduct1/telly/flat',
};

export default story;

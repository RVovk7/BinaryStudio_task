import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeotEnv from 'dotenv';

Enzyme.configure({
    adapter: new Adapter(),
});

DeotEnv.config({ path: '.env.test' });
import {XmlMethodCall} from 'xmlmc';

// todo configure using env variables
export default new XmlMethodCall(process.env.API_HOST || 'http://localhost');
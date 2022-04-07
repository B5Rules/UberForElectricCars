import { AxiosPromise } from 'axios';
import { httpService } from 'services';

const getExample = (): AxiosPromise<any> => httpService.get('/example');

export default getExample;

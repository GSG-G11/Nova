import { Request } from 'express';

interface RequestType extends Request {
    userInfo: { role : string};
}
export default RequestType;

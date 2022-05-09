import { Request } from 'express';

interface RequestType extends Request {
    userInfo?: {
        id: string;
        role: string;
        isVerified: boolean;
    };
}
export default RequestType;

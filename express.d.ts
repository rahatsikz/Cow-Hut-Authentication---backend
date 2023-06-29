import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

declare module "express" {
  export interface Request extends AuthenticatedRequest {}
}

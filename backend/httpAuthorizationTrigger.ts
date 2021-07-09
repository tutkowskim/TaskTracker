import { Context, HttpRequest } from "@azure/functions";
  
export interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}
  
/**
 * Get the user passed to the function from azure static web apps.
 * 
 * Documentation: https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript
 * @param context 
 * @param req 
 * @param onAuthorized 
 */
export const httpAuthorizationTrigger = async (context: Context, req: HttpRequest, onAuthorized: (context: Context, req: HttpRequest, user: User) => Promise<void>): Promise<void> => {
  const header = req.headers["x-ms-client-principal"];
  if (!header) {
    context.res = { body: { message: `Unauthorized: Missing client-principal` }, status: 401 };
  }

  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  const user = JSON.parse(decoded) as User;
  if (user) {
    await onAuthorized(context, req, user);
  } else {
    context.res = { body: { message: `Unauthorized` }, status: 401 };
  }
}
import { Context, HttpRequest } from "@azure/functions";

export interface ClientPrincipal {
  clientPrincipal: User | null;
}
  
export interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}
  
export const httpAuthorizationTrigger = async (context: Context, req: HttpRequest, onAuthorized: (context: Context, req: HttpRequest, clientPrincipal: ClientPrincipal) => Promise<void>): Promise<void> => {
  const header = req.headers["x-ms-client-principal"];
  if (!header) {
    context.res = { body: { message: `Unauthorized: Missing client-principal ${JSON.stringify(req)}` }, status: 401 };
  }

  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  const clientPrincipal = JSON.parse(decoded) as ClientPrincipal;
  if (clientPrincipal && clientPrincipal.clientPrincipal && clientPrincipal.clientPrincipal.userId) {
    await onAuthorized(context, req, clientPrincipal);
  } else {
    context.res = { body: { message: `Unauthorized ${JSON.stringify(clientPrincipal)}` }, status: 401 };
  }
}
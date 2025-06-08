export interface SearchRequest {
  accountId: string;
  from: Date;
  to?: Date | undefined;
}

export interface UserRequest {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
  aud: string[];
}

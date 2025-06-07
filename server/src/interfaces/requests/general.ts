export interface SearchRequest {
  accountId: string;
  from: Date;
  to?: Date | undefined;
}

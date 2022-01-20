export type KeyData = {
  partitionKey: string;
  sortKey: string;
};

export type IndexKeys = {
  ItemIndex: KeyData;
  GSI1?: KeyData;
};

import { client, buildPath } from './client';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import type { TokenAlertRecord } from '@/types/openapi';
import type { TokenAlertRecordPageItem, TokenAlertRecordPageListParams } from '@/types/token-alert-record-page';

export const tokenAlertRecordPageApi = {
  list: (params?: TokenAlertRecordPageListParams) =>
    client.get<PageResponse<TokenAlertRecord>>("/token/alert/record/page", { params }),
};

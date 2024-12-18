import { StatusList } from '@/models/enums';
import { MarketList } from '@/models/interfaces';

export const mockMarketList: MarketList[] = [
  {
    id: 'ml001',
    accountId: 'acc123',
    totalAmount: 15,
    totalValue: 75.5,
    version: 1,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    location: 'Supermarket A',
    status: StatusList.ACTIVE,
    effectiveMonth: 0,
    effectiveYear: 2024
  },
  {
    id: 'ml002',
    accountId: 'acc124',
    totalAmount: 8,
    totalValue: 42.75,
    version: 2,
    createdAt: '2024-01-16T14:45:00Z',
    updatedAt: '2024-01-16T15:00:00Z',
    location: 'Grocery Store B',
    status: StatusList.PROGRESS,
    effectiveMonth: 1,
    effectiveYear: 2024
  },
  {
    id: 'ml003',
    accountId: 'acc125',
    totalAmount: 22,
    totalValue: 110.25,
    version: 1,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
    location: 'Hypermarket C',
    status: StatusList.ACTIVE,
    effectiveMonth: 2,
    effectiveYear: 2024
  },
  {
    id: 'ml004',
    accountId: 'acc126',
    totalAmount: 5,
    totalValue: 25.0,
    version: 3,
    createdAt: '2024-01-18T16:30:00Z',
    updatedAt: '2024-01-18T17:00:00Z',
    location: 'Corner Shop D',
    status: StatusList.DONE,
    effectiveMonth: 3,
    effectiveYear: 2024
  },
  {
    id: 'ml005',
    accountId: 'acc127',
    totalAmount: 18,
    totalValue: 90.75,
    version: 2,
    createdAt: '2024-01-19T11:00:00Z',
    updatedAt: '2024-01-19T11:30:00Z',
    location: 'Supermarket E',
    status: StatusList.PROGRESS,
    effectiveMonth: 4,
    effectiveYear: 2024
  },
  {
    id: 'ml006',
    accountId: 'acc128',
    totalAmount: 12,
    totalValue: 60.25,
    version: 1,
    createdAt: '2024-01-20T13:45:00Z',
    updatedAt: '2024-01-20T13:45:00Z',
    location: 'Grocery Store F',
    status: StatusList.ACTIVE,
    effectiveMonth: 5,
    effectiveYear: 2024
  },
  {
    id: 'ml007',
    accountId: 'acc129',
    totalAmount: 30,
    totalValue: 150.0,
    version: 4,
    createdAt: '2024-01-21T08:00:00Z',
    updatedAt: '2024-01-21T09:30:00Z',
    location: 'Hypermarket G',
    status: StatusList.CLOSED,
    effectiveMonth: 6,
    effectiveYear: 2024
  },
  {
    id: 'ml008',
    accountId: 'acc130',
    totalAmount: 7,
    totalValue: 35.5,
    version: 1,
    createdAt: '2024-01-22T17:15:00Z',
    updatedAt: '2024-01-22T17:15:00Z',
    location: 'Corner Shop H',
    status: StatusList.ACTIVE,
    effectiveMonth: 7,
    effectiveYear: 2024
  },
  {
    id: 'ml009',
    accountId: 'acc131',
    totalAmount: 25,
    totalValue: 125.75,
    version: 2,
    createdAt: '2024-01-23T10:30:00Z',
    updatedAt: '2024-01-23T11:00:00Z',
    location: 'Supermarket I',
    status: StatusList.PROGRESS,
    effectiveMonth: 8,
    effectiveYear: 2024
  },
  {
    id: 'ml010',
    accountId: 'acc132',
    totalAmount: 10,
    totalValue: 50.0,
    version: 3,
    createdAt: '2024-01-24T14:00:00Z',
    updatedAt: '2024-01-24T14:45:00Z',
    location: 'Grocery Store J',
    status: StatusList.DONE,
    effectiveMonth: 9,
    effectiveYear: 2024
  },
  {
    id: 'ml011',
    accountId: 'acc133',
    totalAmount: 20,
    totalValue: 100.25,
    version: 1,
    createdAt: '2024-01-25T09:45:00Z',
    updatedAt: '2024-01-25T09:45:00Z',
    location: 'Hypermarket K',
    status: StatusList.ACTIVE,
    effectiveMonth: 10,
    effectiveYear: 2024
  },
  {
    id: 'ml012',
    accountId: 'acc134',
    totalAmount: 6,
    totalValue: 30.5,
    version: 2,
    createdAt: '2024-01-26T16:00:00Z',
    updatedAt: '2024-01-26T16:15:00Z',
    location: 'Corner Shop L',
    status: StatusList.PROGRESS,
    effectiveMonth: 11,
    effectiveYear: 2024
  },
  {
    id: 'ml013',
    accountId: 'acc135',
    totalAmount: 28,
    totalValue: 140.75,
    version: 5,
    createdAt: '2024-01-27T11:30:00Z',
    updatedAt: '2024-01-27T13:00:00Z',
    location: 'Supermarket M',
    status: StatusList.EXPIRED,
    effectiveMonth: 0,
    effectiveYear: 2025
  },
  {
    id: 'ml014',
    accountId: 'acc136',
    totalAmount: 14,
    totalValue: 70.0,
    version: 1,
    createdAt: '2024-01-28T15:15:00Z',
    updatedAt: '2024-01-28T15:15:00Z',
    location: 'Grocery Store N',
    status: StatusList.ACTIVE,
    effectiveMonth: 1,
    effectiveYear: 2025
  },
  {
    id: 'ml015',
    accountId: 'acc137',
    totalAmount: 35,
    totalValue: 175.5,
    version: 3,
    createdAt: '2024-01-29T08:30:00Z',
    updatedAt: '2024-01-29T09:15:00Z',
    location: 'Hypermarket O',
    status: StatusList.CLOSED,
    effectiveMonth: 2,
    effectiveYear: 2025
  },
  {
    id: 'ml016',
    accountId: 'acc138',
    totalAmount: 9,
    totalValue: 45.25,
    version: 1,
    createdAt: '2024-01-30T17:45:00Z',
    updatedAt: '2024-01-30T17:45:00Z',
    location: 'Corner Shop P',
    status: StatusList.ACTIVE,
    effectiveMonth: 3,
    effectiveYear: 2025
  },
  {
    id: 'ml017',
    accountId: 'acc139',
    totalAmount: 23,
    totalValue: 115.75,
    version: 2,
    createdAt: '2024-01-31T10:00:00Z',
    updatedAt: '2024-01-31T10:30:00Z',
    location: 'Supermarket Q',
    status: StatusList.PROGRESS,
    effectiveMonth: 4,
    effectiveYear: 2025
  },
  {
    id: 'ml018',
    accountId: 'acc140',
    totalAmount: 11,
    totalValue: 55.5,
    version: 4,
    createdAt: '2024-02-01T13:30:00Z',
    updatedAt: '2024-02-01T14:15:00Z',
    location: 'Grocery Store R',
    status: StatusList.DONE,
    effectiveMonth: 5,
    effectiveYear: 2025
  },
  {
    id: 'ml019',
    accountId: 'acc141',
    totalAmount: 27,
    totalValue: 135.25,
    version: 1,
    createdAt: '2024-02-02T09:00:00Z',
    updatedAt: '2024-02-02T09:00:00Z',
    location: 'Hypermarket S',
    status: StatusList.ACTIVE,
    effectiveMonth: 6,
    effectiveYear: 2025
  },
  {
    id: 'ml020',
    accountId: 'acc142',
    totalAmount: 16,
    totalValue: 80.0,
    version: 2,
    createdAt: '2024-02-03T15:45:00Z',
    updatedAt: '2024-02-03T16:00:00Z',
    location: 'Corner Shop T',
    status: StatusList.PROGRESS,
    effectiveMonth: 7,
    effectiveYear: 2025
  }
];

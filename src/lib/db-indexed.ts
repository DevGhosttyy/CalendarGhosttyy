import Dexie, { Table } from 'dexie';
export interface OfflineMutation { id?: string; method: string; path: string; body?: any; ts: number; }
class LocalDB extends Dexie {
  mutations!: Table<OfflineMutation, string>;
  constructor(){ super('calendar-db'); this.version(1).stores({ mutations: 'id, ts' }); }
}
export const localdb = new LocalDB();

import { localdb } from '@/lib/db-indexed';
export async function queueMutation(method: string, path: string, body?: any) {
  await localdb.mutations.add({ id: crypto.randomUUID(), method, path, body, ts: Date.now() });
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const reg = await navigator.serviceWorker.ready;
    await reg.sync.register('sync-mutations');
  }
}

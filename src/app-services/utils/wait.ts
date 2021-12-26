

export async function wait(ms: number): Promise<void> {
  setTimeout(() => { return Promise.resolve(); }, ms);
};
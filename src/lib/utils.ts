export async function sleep(seconds: number): Promise<any> {
  return await new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

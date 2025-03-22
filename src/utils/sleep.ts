export async function sleep(time: number = 3000) {
  await new Promise((resolve) => setTimeout(resolve, time));
}

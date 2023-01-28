export function CONSOLE_LOG(description: string, object: any) {
  console.log(`${description} => ${JSON.stringify(object)}`);
}

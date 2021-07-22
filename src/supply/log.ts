export const log = (type: string, str: string) => {
  let use;
  switch (type.toUpperCase()) {
    case "DONE":
      use = {
        head: "\x1b[42;30m",
        content: "\x1b[41;0m",
        end: "\x1b[0m",
      };
      break;
    case "ERR":
      use = {
        head: "\x1b[41;30m",
        content: "\x1b[40;0m",
        end: "\x1b[0m",
      };
      break;
    default:
      use = {
        head: "\x1b[47;30m",
        content: "\x1b[40;0m",
        end: "\x1b[0m",
      };
  }
  console.log(`${use.head} UPDATE:${type} ${use.content} %s${use.end}`, str);
};

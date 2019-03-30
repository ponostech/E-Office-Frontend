/**
 * @return {string}
 */
export function ErrorToString(messages) {
  let msg = "";
  for (const [key, value] of Object.entries(messages)) {
      console.log(key, value);
      value.forEach(item=>{
        msg+=item.toString()+"\n"
      })
  }

  return msg;
}

/**
 * @return {string}
 */
export function ArrayToString(messages) {
  let msg = "";
  messages.forEach(function(message, index) {
    msg+=message +" \n"
  });

  return msg;
}
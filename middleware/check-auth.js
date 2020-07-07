export default function (context) {
  console.log("[MiddleWare] Check Auth")
  if (process.client) {
    context.store.dispatch("initAuth", null)
  }
}

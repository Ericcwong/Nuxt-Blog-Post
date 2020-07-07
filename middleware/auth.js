export default function (context) {
  console.log("[MiddleWare] Just Auth")
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth")
  }
}

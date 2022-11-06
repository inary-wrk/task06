export class AuthService {
  isAuthorized: boolean = false;
  constructor() {
    const userUrl = "/bff/user";

    window.addEventListener("load", async () => {
      var req = new Request(userUrl, {
        headers: new Headers({
          'X-CSRF': '1'
        })
      })

      try {
        var resp = await fetch(req);
        if (resp.ok) {
          this.isAuthorized = true;
          let claims = await resp.json();
          console.log("user claims", claims);

          let logoutUrlClaim = claims.find((claim: any) => claim.type === 'bff:logout_url');
          console.log(logoutUrlClaim)

          let name = claims.find((claim: any) => claim.type === 'name') || claims.find((claim: any) => claim.type === 'sub');
          console.log(name);
          console.log("logged in as: " + (name && name.value));

        } else if (resp.status === 401) {
          this.isAuthorized = false;
          console.log("(not logged in)")
        }
      } catch (e) {
        console.log("error checking user status");
      }

    });
  }

  getIsAuthorized(): boolean {
    return this.isAuthorized;
  }
}

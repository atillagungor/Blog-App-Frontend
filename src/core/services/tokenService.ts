class TokenService {
	getToken(): string | null {
		return localStorage.getItem("token");
	}

	hasToken(): boolean {
		return localStorage.getItem("token") != null;
	}
	removeToken() {
		localStorage.removeItem("token");
	}
	setToken(token: string) {
		localStorage.setItem("token", token);
	}
}

export default new TokenService();
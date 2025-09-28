export {};

const CRT_PREFERENCE_KEY = "crt-enabled";

const getCookie = (key: string): string | null => {
	try {
		const match = document.cookie.match(new RegExp("(?:^|; )" + key + "=([^;]+)"));
		return match ? decodeURIComponent(match[1]) : null;
	} catch {
		return null;
	}
};

const setCookie = (key: string, value: string, days = 365) => {
	try {
		const maxAge = 60 * 60 * 24 * days;
		document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
	} catch {
		// ignore
	}
};

const getPreference = (): string | null => {
	try {
		const v = localStorage.getItem(CRT_PREFERENCE_KEY);
		if (v !== null) return v;
	} catch {
		// localStorage inaccessible
	}
	return getCookie(CRT_PREFERENCE_KEY);
};

const setPreference = (val: string) => {
	try {
		localStorage.setItem(CRT_PREFERENCE_KEY, val);
	} catch {
		// ignore
	}
	setCookie(CRT_PREFERENCE_KEY, val);
};

declare global {
	interface Window {
		__setCrtPreference?: (enabled: boolean) => void;
	}
}

// Expose small API on window so other scripts can update the pref.
try {
	window.__setCrtPreference = (enabled: boolean) => {
		setPreference(enabled ? "1" : "0");
		if (enabled) {
			document.body.classList.add("crt-text-ca");
			document.querySelector("#crt-overlay-container")?.classList.add("crt-enabled");
		} else {
			document.body.classList.remove("crt-text-ca");
			document.querySelector("#crt-overlay-container")?.classList.remove("crt-enabled");
		}
	};
} catch {
	// ignore
}

try {
	const v = getPreference();
	if (v === "1") {
		document.body.classList.add("crt-text-ca");
		const container = document.querySelector("#crt-overlay-container");
		if (container) container.classList.add("crt-enabled");
		else
			document.addEventListener("DOMContentLoaded", () => {
				document.querySelector("#crt-overlay-container")?.classList.add("crt-enabled");
			});
	} else if (v === "0") {
		document.body.classList.remove("crt-text-ca");
		document.querySelector("#crt-overlay-container")?.classList.remove("crt-enabled");
	}
} catch {
	// Ignore storage errors (e.g., blocked third-party cookies / privacy mode)
}

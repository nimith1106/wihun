/// <reference types="vite/client" />

const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const isPlaceholderValue = (value) => {
	if (typeof value !== 'string') {
		return false;
	}
	const normalized = value.trim().toLowerCase();
	return (
		normalized === '' ||
		normalized.startsWith('<') && normalized.endsWith('>') ||
		normalized === 'demo-app' ||
		normalized.includes('your_actual_app_id') ||
		normalized.includes('your-real-app-id') ||
		normalized.includes('your_app_id') ||
		normalized.includes('your-app-id') ||
		normalized.includes('your-app-url') ||
		normalized.includes('your-app-base-url')
	);
}

const normalizeUrlValue = (value) => {
	if (typeof value !== 'string') {
		return value;
	}
	const trimmed = value.trim();
	return trimmed.replace(/\/+$/, '');
};

/** @param {string} str */
const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/** @param {string} paramName */
/** @param {{defaultValue?: any, removeFromUrl?: boolean}} [options={}] */
const getAppParamValue = (paramName, options = {}) => {
	const { defaultValue, removeFromUrl = false } = options;
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		const normalizedSearchParam = normalizeUrlValue(searchParam);
		if (isPlaceholderValue(normalizedSearchParam)) {
			if (storage instanceof Map) {
				storage.delete(storageKey);
			} else {
				storage.removeItem(storageKey);
			}
			return defaultValue && !isPlaceholderValue(defaultValue) ? normalizeUrlValue(defaultValue) : null;
		}
		if (storage instanceof Map) {
			storage.set(storageKey, normalizedSearchParam);
		} else {
			storage.setItem(storageKey, normalizedSearchParam);
		}
		return normalizedSearchParam;
	}
	if (defaultValue && !isPlaceholderValue(defaultValue)) {
		const normalizedDefault = normalizeUrlValue(defaultValue);
		if (storage instanceof Map) {
			storage.set(storageKey, normalizedDefault);
		} else {
			storage.setItem(storageKey, normalizedDefault);
		}
		return normalizedDefault;
	}
	const storedValue = storage instanceof Map ? storage.get(storageKey) : storage.getItem(storageKey);
	if (storedValue && !isPlaceholderValue(storedValue)) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		if (storage instanceof Map) {
			storage.delete('base44_access_token');
			storage.delete('token');
		} else {
			storage.removeItem('base44_access_token');
			storage.removeItem('token');
		}
	}
	const appId = getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_BASE44_APP_ID });
	const appBaseUrl = getAppParamValue("app_base_url", { defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL });
	if (!isNode && !appId) {
		console.info('Base44 app id is not configured. Local demo mode will run without Base44 login/backend calls.');
	}
	if (!isNode && !appBaseUrl) {
		console.info('Base44 app base URL is not configured. Local demo mode will run without Base44 login/backend calls.');
	}
	return {
		appId,
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: isNode ? '' : window.location.href }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION }),
		appBaseUrl,
	}
}


export const appParams = {
	...getAppParams()
}

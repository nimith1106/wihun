import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

export const isBase44Configured = Boolean(appId && appBaseUrl);

const missingConfigMessage = 'Base44 is not configured. Set VITE_BASE44_APP_ID and VITE_BASE44_APP_BASE_URL in .env.local.';

const logMissingConfig = (operation) => {
  console.info(`${missingConfigMessage} Skipping ${operation}.`);
};

const createOfflineEntityHandler = (entityName) => ({
  async list() {
    logMissingConfig(`${entityName}.list`);
    return [];
  },
  async filter() {
    logMissingConfig(`${entityName}.filter`);
    return [];
  },
  async get() {
    logMissingConfig(`${entityName}.get`);
    return null;
  },
  async create(data) {
    logMissingConfig(`${entityName}.create`);
    return {
      id: `offline-${entityName}-${Date.now()}`,
      ...data
    };
  },
  async update(id, data) {
    logMissingConfig(`${entityName}.update`);
    return {
      id,
      ...data
    };
  },
  async delete() {
    logMissingConfig(`${entityName}.delete`);
    return { success: true };
  },
  async deleteMany() {
    logMissingConfig(`${entityName}.deleteMany`);
    return { success: true };
  },
  async bulkCreate(data) {
    logMissingConfig(`${entityName}.bulkCreate`);
    return data;
  },
  async updateMany() {
    logMissingConfig(`${entityName}.updateMany`);
    return { success: true };
  },
  async bulkUpdate(data) {
    logMissingConfig(`${entityName}.bulkUpdate`);
    return data;
  },
  async importEntities() {
    logMissingConfig(`${entityName}.importEntities`);
    return [];
  },
  subscribe() {
    logMissingConfig(`${entityName}.subscribe`);
    return () => {};
  }
});

const createOfflineClient = () => ({
  entities: new Proxy({}, {
    get(_target, entityName) {
      if (typeof entityName !== 'string' || entityName === 'then' || entityName.startsWith('_')) {
        return undefined;
      }
      return createOfflineEntityHandler(entityName);
    }
  }),
  auth: {
    async me() {
      throw new Error(missingConfigMessage);
    },
    async isAuthenticated() {
      return false;
    },
    redirectToLogin() {
      logMissingConfig('auth.redirectToLogin');
    },
    logout() {
      if (typeof window !== 'undefined') {
        window.localStorage?.removeItem('base44_access_token');
        window.localStorage?.removeItem('token');
      }
    },
    setToken() {}
  },
  analytics: {
    cleanup() {}
  },
  setToken() {},
  getConfig() {
    return {
      serverUrl: '',
      appId,
      requiresAuth: false
    };
  },
  cleanup() {}
});

// Create the SDK client only when a real Base44 app configuration is present.
export const base44 = isBase44Configured
  ? createClient({
    appId,
    token,
    functionsVersion,
    serverUrl: appBaseUrl,
    requiresAuth: false,
    appBaseUrl
  })
  : createOfflineClient();

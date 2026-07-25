/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_URL?: string;
  readonly VITE_HR_WORKSPACE_URL?: string;
  readonly VITE_CANDIDATE_APP_URL?: string;
  readonly VITE_UNIVERSITY_URL?: string;
  readonly VITE_ADMIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

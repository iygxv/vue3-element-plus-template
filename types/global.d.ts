/// <reference types="vite/client" />

declare global {

	declare interface ImportMetaEnv {
		VITE_ENV: string
		VITE_APP_BASE_API: string
		VITE_API_TIMEOUT: number
		VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
		VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
	}
}
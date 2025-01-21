import type { PageServerLoad } from './$types';
export const load = (async () => {
	// const entries1 = FastGlob.sync(['./src/**/*.ts', '!./src/**/new/**']);
	// console.log('entries1', entries1);

	return {};
}) satisfies PageServerLoad;

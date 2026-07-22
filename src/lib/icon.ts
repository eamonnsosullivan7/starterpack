import iconoirData from '@iconify-json/iconoir/icons.json';

const iconoirNames = new Set([
	...Object.keys(iconoirData.icons),
	...Object.keys(iconoirData.aliases ?? {}),
]);

// Validates a CMS-supplied icon name against the installed Iconoir set so a
// content typo renders no icon instead of failing the whole static build.
export function iconoirIconName(name?: string | null): string | undefined {
	return name && iconoirNames.has(name) ? `iconoir:${name}` : undefined;
}

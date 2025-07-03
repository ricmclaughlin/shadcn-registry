<!-- Based on shadcn-svelte Alert component: https://www.shadcn-svelte.com/docs/components/alert -->
<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';
	import { cn } from '$lib/utils';
	import type { ComponentType } from 'svelte';

	const alertVariants = tv({
		base: 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	type Variant = VariantProps<typeof alertVariants>['variant'];

	export let variant: Variant = 'default';
	export let icon: ComponentType | undefined = undefined;

	// Additional classes
	let className: string = '';
	export { className as class };
</script>

<div class={cn(alertVariants({ variant }), className)} role="alert" {...$$restProps}>
	{#if icon}
		<svelte:component this={icon} class="h-4 w-4" />
	{/if}
	<slot />
</div>

<!-- Based on shadcn-svelte Button component: https://www.shadcn-svelte.com/docs/components/button -->
<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';
	import { cn } from '$lib/utils';
	import type { ComponentType } from 'svelte';

	const buttonVariants = tv({
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	type Variant = VariantProps<typeof buttonVariants>['variant'];
	type Size = VariantProps<typeof buttonVariants>['size'];

	export let variant: Variant = 'default';
	export let size: Size = 'default';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	
	// Icon support with deep import pattern
	export let icon: ComponentType | undefined = undefined;
	export let iconPlacement: 'left' | 'right' = 'left';

	// Additional classes
	let className: string = '';
	export { className as class };

	$: isLink = href !== undefined;
	$: isDisabled = disabled || loading;
	$: hasIcon = icon !== undefined;
	$: isIconOnly = hasIcon && size === 'icon';
</script>

{#if isLink}
	<a
		{href}
		class={cn(buttonVariants({ variant, size }), className)}
		aria-disabled={isDisabled}
		tabindex={isDisabled ? -1 : undefined}
		{...$$restProps}
	>
		{#if loading}
			<svg
				class={cn("h-4 w-4 animate-spin", !isIconOnly && "mr-2")}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{:else if hasIcon && iconPlacement === 'left'}
			<svelte:component this={icon} class={cn("h-4 w-4", !isIconOnly && "mr-2")} />
		{/if}
		
		{#if !isIconOnly}
			<slot />
		{/if}
		
		{#if hasIcon && iconPlacement === 'right' && !loading}
			<svelte:component this={icon} class={cn("h-4 w-4", !isIconOnly && "ml-2")} />
		{/if}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={cn(buttonVariants({ variant, size }), className)}
		{...$$restProps}
		on:click
	>
		{#if loading}
			<svg
				class={cn("h-4 w-4 animate-spin", !isIconOnly && "mr-2")}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{:else if hasIcon && iconPlacement === 'left'}
			<svelte:component this={icon} class={cn("h-4 w-4", !isIconOnly && "mr-2")} />
		{/if}
		
		{#if !isIconOnly}
			<slot />
		{/if}
		
		{#if hasIcon && iconPlacement === 'right' && !loading}
			<svelte:component this={icon} class={cn("h-4 w-4", !isIconOnly && "ml-2")} />
		{/if}
	</button>
{/if}

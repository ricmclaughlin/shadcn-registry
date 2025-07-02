<!-- Based on shadcn-svelte Input component: https://www.shadcn-svelte.com/docs/components/input -->
<script lang="ts">
	import { cn } from '$lib/utils';

	export let type: string = 'text';
	export let value: string | number | undefined = undefined;
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let required: boolean = false;
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;

	let className: string = '';
	export { className as class };
</script>

<input
	{type}
	{id}
	{name}
	{placeholder}
	{disabled}
	{readonly}
	{required}
	bind:value
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$$restProps}
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
/>

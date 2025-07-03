<script lang="ts">
	import { cn } from "$lib/utils.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	type $$Props = {
		class?: string;
		children?: any;
	};

	let {
		class: className,
		children,
		...restProps
	}: $$Props = $props();
</script>

<li
	role="presentation"
	aria-hidden="true"
	class={cn("[&>svg]:size-3.5", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ChevronRightIcon />
	{/if}
</li>

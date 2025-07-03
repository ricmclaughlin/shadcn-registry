<script lang="ts">
	import { cn } from "$lib/utils.js";

	type $$Props = {
		class?: string;
		href: string;
		children?: any;
	};

	let {
		class: className,
		href,
		children,
		...restProps
	}: $$Props = $props();
</script>

<a
	{href}
	class={cn("transition-colors hover:text-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</a>

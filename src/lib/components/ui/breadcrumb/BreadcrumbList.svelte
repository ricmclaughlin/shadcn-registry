<script lang="ts">
	import { cn } from "$lib/utils.js";

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

<ol
	class={cn(
		"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ol>

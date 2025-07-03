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

<span
	role="link"
	aria-disabled="true"
	aria-current="page"
	class={cn("font-normal text-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</span>

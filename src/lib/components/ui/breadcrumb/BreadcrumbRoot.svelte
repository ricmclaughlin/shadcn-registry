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

<nav
	aria-label="breadcrumb"
	class={cn("", className)}
	{...restProps}
>
	{@render children?.()}
</nav>
